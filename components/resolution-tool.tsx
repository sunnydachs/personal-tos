"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { resolutionStates, resolutionIcons } from "@/lib/gacha-content";
import { ShareButtons } from "@/components/share-buttons";
import {
  getDefaultGachaState,
  saveGachaIdentity,
  encodeGachaState,
  parseGachaState,
  type GachaState,
} from "@/lib/gacha-state";
import { seededRandom, weightedChoice } from "@/lib/rng";
import type { ResolutionCard } from "@/lib/gacha-canvas";
import { formatTemplate } from "@/lib/i18n";
import type { Lang, ResolutionStrings } from "@/lib/i18n-strings";

function getDayString() {
  return new Date().toISOString().slice(0, 10);
}

function getInitialResult(state: GachaState, dayString: string) {
  const random = seededRandom(dayString, state.seed);
  const stateId = weightedChoice(
    resolutionStates.map((resolutionState) => ({
      value: resolutionState.id,
      weight: resolutionState.weight,
    })),
    random,
  );
  return resolutionStates.find((resolutionState) => resolutionState.id === stateId)
    ?? resolutionStates[1];
}

export default function ResolutionTool({
  lang,
  strings,
}: {
  lang: Lang;
  strings: ResolutionStrings;
}) {
  const [state, setState] = useState<GachaState>(() =>
    typeof window === "undefined"
      ? getDefaultGachaState()
      : parseGachaState(window.location.search) ?? getDefaultGachaState(),
  );
  const [nameDraft, setNameDraft] = useState(state.name === "Anonymous" ? "" : state.name);
  const [seedDraft, setSeedDraft] = useState(state.seed === "daily" ? "" : state.seed);
  const [result, setResult] = useState<(typeof resolutionStates)[number] | null>(() =>
    typeof window === "undefined"
      ? null
      : getInitialResult(
          parseGachaState(window.location.search) ?? getDefaultGachaState(),
          getDayString(),
        ),
  );
  const [notice, setNotice] = useState("");
  const dayString = getDayString();
  const shareUrl = `/${lang === "ja" ? "ja?" : "?"}${encodeGachaState(state.name, state.seed)}`;
  const card: ResolutionCard | null = result
    ? {
        name: state.name,
        date: formatTemplate(strings.cardDate, { date: dayString }),
        state: result,
        shareLine: formatTemplate(strings.share, { state: strings.states[result.id] }),
      }
    : null;

  useEffect(() => {
    const nextState = parseGachaState(window.location.search) ?? getDefaultGachaState();
    setState(nextState);
    setNameDraft(nextState.name === "Anonymous" ? "" : nextState.name);
    setSeedDraft(nextState.seed === "daily" ? "" : nextState.seed);
    setResult(getInitialResult(nextState, getDayString()));
  }, []);

  function updateUrl(nextState: GachaState) {
    window.history.replaceState(
      null,
      "",
      `/${lang === "ja" ? "ja?" : "?"}${encodeGachaState(nextState.name, nextState.seed)}`,
    );
  }

  function rollToday() {
    const nextState = {
      name: nameDraft.trim() || "Anonymous",
      seed: seedDraft.trim() || "daily",
    };
    setState(nextState);
    setResult(getInitialResult(nextState, dayString));
    updateUrl(nextState);
    saveGachaIdentity(nextState.name, nextState.seed);
    setNotice(lang === "ja" ? "今日の解像度が準備できました。" : "Today's resolution is ready.");
  }

  async function downloadPng() {
    if (!card) return;
    const canvas = await import("@/lib/gacha-canvas").then(
      (module) => module.renderResolutionCanvas(card),
    );
    const link = document.createElement("a");
    link.download = `resolution-${dayString}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setNotice(strings.pngDownloaded);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}${shareUrl}`);
    setNotice(strings.linkCopied);
  }

  return (
    <main className="app-page gacha-page">
      <section className="app-shell gacha-shell" aria-labelledby="resolution-title">
        <header className="gacha-header">
          <div>
            <p className="eyebrow">{strings.eyebrow}</p>
            <h1 id="resolution-title">{strings.title}</h1>
            <p>{strings.pitch}</p>
          </div>
          <span className="date-tag">{dayString}</span>
        </header>
        <div className="gacha-setup">
          <label className="field-label" htmlFor="resolution-name">{strings.nameLabel}</label>
          <input id="resolution-name" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} placeholder={strings.namePlaceholder} autoComplete="off" />
          <label className="field-label" htmlFor="resolution-seed">{strings.seedLabel}</label>
          <input id="resolution-seed" value={seedDraft} onChange={(event) => setSeedDraft(event.target.value)} placeholder={strings.seedPlaceholder} autoComplete="off" />
          <button className="primary-button gacha-button" type="button" onClick={rollToday}>{strings.action} <span aria-hidden="true">→</span></button>
        </div>
        <div className="gacha-result" aria-live="polite">
          {card ? (
            <>
              <div className="gacha-card">
                <p className="eyebrow accent-text">{strings.cardEyebrow} {dayString}</p>
                <h2>{result ? strings.states[result.id] : ""}</h2>
                {result?.id && (
                  <img className="card-verdict-icon" src={resolutionIcons[result.id]} alt="" width={96} height={96} aria-hidden="true" />
                )}
                <p>{result ? strings.stateDescription[result.id] : ""}</p>
                <div className="gacha-card-meta">
                  <span>{state.name}</span>
                  <span>{formatTemplate(strings.cardDate, { date: dayString })}</span>
                </div>
                <p className="gacha-share-line">{card.shareLine}</p>
              </div>
              <div className="result-actions gacha-actions">
                <button className="primary-button" type="button" onClick={downloadPng}>{strings.downloadPng}</button>
                <button className="secondary-button" type="button" onClick={copyLink}>{strings.copyLink}</button>
                <ShareButtons
                  url={shareUrl}
                  text={card.shareLine}
                  labels={{ shareX: strings.shareX, shareLine: strings.shareLine, shareNative: strings.shareNative }}
                />
                <p className={`action-notice ${notice ? "is-visible" : ""}`} role="status">{notice || " "}</p>
              </div>
              <p className="reset-note">{strings.resetNote}</p>
            </>
          ) : <div className="gacha-empty">{strings.empty}</div>}
        </div>
      </section>
    </main>
  );
}
