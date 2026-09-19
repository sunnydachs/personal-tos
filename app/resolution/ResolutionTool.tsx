"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { gachaDesign } from "@/lib/gacha-design";
import {
  resolutionShareLine,
  resolutionStates,
} from "@/lib/gacha-content";
import {
  getDefaultGachaState,
  encodeGachaState,
  parseGachaState,
  type GachaState,
} from "@/lib/gacha-state";
import { seededRandom, weightedChoice } from "@/lib/rng";
import type { ResolutionCard } from "@/lib/gacha-canvas";

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

export default function ResolutionTool() {
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
  const shareUrl = `/?${encodeGachaState(state.name, state.seed)}`;
  const card: ResolutionCard | null = result
    ? {
        name: state.name,
        date: `Resolution of ${dayString}`,
        state: result,
        shareLine: resolutionShareLine(result.label),
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
    window.history.replaceState(null, "", `/${encodeGachaState(nextState.name, nextState.seed)}`);
  }

  function rollToday() {
    const nextState = {
      name: nameDraft.trim() || "Anonymous",
      seed: seedDraft.trim() || "daily",
    };
    setState(nextState);
    setResult(getInitialResult(nextState, dayString));
    updateUrl(nextState);
    setNotice("Today's resolution is ready.");
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
    setNotice("PNG downloaded.");
  }

  async function copyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}${shareUrl}`);
    setNotice("Share link copied.");
  }

  return (
    <main className="app-page gacha-page">
      <section className="app-shell gacha-shell" aria-labelledby="resolution-title">
        <header className="gacha-header">
          <div>
            <p className="eyebrow">DAILY GACHA / ZERO RUNTIME AI</p>
            <h1 id="resolution-title">Today&apos;s Resolution Gacha</h1>
            <p>One deterministic roll. One finished card. No rerolls until tomorrow.</p>
          </div>
          <span className="date-tag">{dayString}</span>
        </header>
        <div className="gacha-setup">
          <label className="field-label" htmlFor="resolution-name">Name or handle</label>
          <input
            id="resolution-name"
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value)}
            placeholder="e.g. Mika"
            autoComplete="off"
          />
          <label className="field-label" htmlFor="resolution-seed">Personal seed</label>
          <input
            id="resolution-seed"
            value={seedDraft}
            onChange={(event) => setSeedDraft(event.target.value)}
            placeholder="daily"
            autoComplete="off"
          />
          <button className="primary-button gacha-button" type="button" onClick={rollToday}>
            Check today&apos;s resolution <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="gacha-result" aria-live="polite">
          {card ? (
            <>
              <div className="gacha-card">
                <p className="eyebrow accent-text">RESOLUTION OF {dayString}</p>
                <h2>{result?.label}</h2>
                <p>{result?.description}</p>
                <div className="gacha-card-meta">
                  <span>{state.name}</span>
                  <span>{`Resolution of ${dayString}`}</span>
                </div>
                <p className="share-line">{card.shareLine}</p>
              </div>
              <div className="result-actions gacha-actions">
                <button className="primary-button" type="button" onClick={downloadPng}>Download PNG</button>
                <button className="secondary-button" type="button" onClick={copyLink}>Copy link</button>
                <p className={`action-notice ${notice ? "is-visible" : ""}`} role="status">{notice || " "}</p>
              </div>
              <p className="reset-note">Come back tomorrow — resolution resets at midnight UTC</p>
            </>
          ) : (
            <div className="gacha-empty">Your result will appear here after the first roll.</div>
          )}
        </div>
      </section>
    </main>
  );
}
