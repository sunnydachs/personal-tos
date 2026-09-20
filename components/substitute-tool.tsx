"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { substituteCharacters } from "@/lib/gacha-content";
import { ShareButtons } from "@/components/share-buttons";
import {
  getDefaultGachaState,
  saveGachaIdentity,
  encodeGachaState,
  parseGachaState,
  type GachaState,
} from "@/lib/gacha-state";
import { seededRandom } from "@/lib/rng";
import type { SubstituteCard } from "@/lib/gacha-canvas";
import { formatTemplate } from "@/lib/i18n";
import type { Lang, SubstituteCharacterId, SubstituteStrings } from "@/lib/i18n-strings";

function getDayString() {
  return new Date().toISOString().slice(0, 10);
}

function getInitialResult(state: GachaState, dayString: string) {
  const random = seededRandom(dayString, state.seed);
  const index = Math.floor(random() * substituteCharacters.length);
  return substituteCharacters[index] ?? substituteCharacters[0];
}

export default function SubstituteTool({
  lang,
  strings,
}: {
  lang: Lang;
  strings: SubstituteStrings;
}) {
  const [state, setState] = useState<GachaState>(() =>
    typeof window === "undefined"
      ? getDefaultGachaState()
      : parseGachaState(window.location.search) ?? getDefaultGachaState(),
  );
  const [nameDraft, setNameDraft] = useState(state.name === "Anonymous" ? "" : state.name);
  const [seedDraft, setSeedDraft] = useState(state.seed === "daily" ? "" : state.seed);
  const [result, setResult] = useState<{
    character: (typeof substituteCharacters)[number];
    defense: number;
  } | null>(() => {
    if (typeof window === "undefined") return null;
    const initialState = parseGachaState(window.location.search) ?? getDefaultGachaState();
    const day = getDayString();
    const random = seededRandom(day, initialState.seed);
    return {
      character: getInitialResult(initialState, day),
      defense: Math.floor(random() * 100) + 1,
    };
  });
  const [notice, setNotice] = useState("");
  const dayString = getDayString();
  const shareUrl = `/${lang === "ja" ? "ja" : ""}${encodeGachaState(state.name, state.seed)}`;
  const card: SubstituteCard | null = result
    ? {
        name: state.name,
        date: formatTemplate(strings.cardDate, { date: dayString }),
        character: result.character,
        defense: result.defense,
        shareLine: formatTemplate(
          strings.share,
          { character: strings.characters[result.character.id as SubstituteCharacterId] },
        ),
      }
    : null;

  useEffect(() => {
    const nextState = parseGachaState(window.location.search) ?? getDefaultGachaState();
    setState(nextState);
    setNameDraft(nextState.name === "Anonymous" ? "" : nextState.name);
    setSeedDraft(nextState.seed === "daily" ? "" : nextState.seed);
  }, []);

  function rollToday() {
    const nextState = {
      name: nameDraft.trim() || "Anonymous",
      seed: seedDraft.trim() || "daily",
    };
    const random = seededRandom(dayString, nextState.seed);
    const character = getInitialResult(nextState, dayString);
    const defense = Math.floor(random() * 100) + 1;
    setState(nextState);
    setResult({ character, defense });
    saveGachaIdentity(nextState.name, nextState.seed);
    window.history.replaceState(null, "", `/${lang === "ja" ? "ja/" : ""}${encodeGachaState(nextState.name, nextState.seed)}`);
    setNotice(lang === "ja" ? "身代わりが到着しました。" : "Your substitute has arrived.");
  }

  async function downloadPng() {
    if (!card) return;
    const canvas = await import("@/lib/gacha-canvas").then(
      (module) => module.renderSubstituteCanvas(card),
    );
    const link = document.createElement("a");
    link.download = `substitute-${dayString}.png`;
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
      <section className="app-shell gacha-shell" aria-labelledby="substitute-title">
        <header className="gacha-header">
          <div>
            <p className="eyebrow">{strings.eyebrow}</p>
            <h1 id="substitute-title">{strings.title}</h1>
            <p>{strings.pitch}</p>
          </div>
          <span className="date-tag">{dayString}</span>
        </header>
        <div className="gacha-setup">
          <label className="field-label" htmlFor="substitute-name">{strings.nameLabel}</label>
          <input id="substitute-name" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} placeholder={strings.namePlaceholder} autoComplete="off" />
          <label className="field-label" htmlFor="substitute-seed">{strings.seedLabel}</label>
          <input id="substitute-seed" value={seedDraft} onChange={(event) => setSeedDraft(event.target.value)} placeholder={strings.seedPlaceholder} autoComplete="off" />
          <button className="primary-button gacha-button" type="button" onClick={rollToday}>{strings.action} <span aria-hidden="true">→</span></button>
        </div>
        <div className="gacha-result" aria-live="polite">
          {card ? (
            <>
              <div className="gacha-card substitute-card">
                <p className="eyebrow accent-text">{strings.cardEyebrow} {dayString}</p>
                <div className="substitute-icon" aria-hidden="true">{result?.character.symbol}</div>
                <h2>{result ? strings.characters[result.character.id as SubstituteCharacterId] : ""}</h2>
                <p>{result ? strings.characterDescriptions[result.character.id as SubstituteCharacterId] : ""}</p>
                <div className="gacha-card-meta">
                  <span>{state.name}</span>
                  <span>{formatTemplate(strings.cardDate, { date: dayString })}</span>
                  <span>{strings.defenseLabel} · {result?.defense}%</span>
                </div>
                <p className="share-line">{card.shareLine}</p>
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
