"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { gachaDesign } from "@/lib/gacha-design";
import {
  substituteCharacters,
  substituteShareLine,
} from "@/lib/gacha-content";
import {
  getDefaultGachaState,
  encodeGachaState,
  parseGachaState,
  type GachaState,
} from "@/lib/gacha-state";
import { seededRandom } from "@/lib/rng";
import type { SubstituteCard } from "@/lib/gacha-canvas";

function getDayString() {
  return new Date().toISOString().slice(0, 10);
}

function getInitialResult(state: GachaState, dayString: string) {
  const random = seededRandom(dayString, state.seed);
  const index = Math.floor(random() * substituteCharacters.length);
  return substituteCharacters[index] ?? substituteCharacters[0];
}

export default function SubstituteTool() {
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
  const shareUrl = `/?${encodeGachaState(state.name, state.seed)}`;
  const card: SubstituteCard | null = result
    ? {
        name: state.name,
        date: `Substitute of ${dayString}`,
        character: result.character,
        defense: result.defense,
        shareLine: substituteShareLine(result.character.label),
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
    window.history.replaceState(null, "", `/${encodeGachaState(nextState.name, nextState.seed)}`);
    setNotice("Your substitute has arrived.");
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
    setNotice("PNG downloaded.");
  }

  async function copyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}${shareUrl}`);
    setNotice("Share link copied.");
  }

  return (
    <main className="app-page gacha-page">
      <section className="app-shell gacha-shell" aria-labelledby="substitute-title">
        <header className="gacha-header">
          <div>
            <p className="eyebrow">DAILY GACHA / ZERO RUNTIME AI</p>
            <h1 id="substitute-title">Take The Blame For Me Gacha</h1>
            <p>Summon a programmatically illustrated substitute for tomorrow&apos;s incident.</p>
          </div>
          <span className="date-tag">{dayString}</span>
        </header>
        <div className="gacha-setup">
          <label className="field-label" htmlFor="substitute-name">Name or handle</label>
          <input
            id="substitute-name"
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value)}
            placeholder="e.g. Mika"
            autoComplete="off"
          />
          <label className="field-label" htmlFor="substitute-seed">Personal seed</label>
          <input
            id="substitute-seed"
            value={seedDraft}
            onChange={(event) => setSeedDraft(event.target.value)}
            placeholder="daily"
            autoComplete="off"
          />
          <button className="primary-button gacha-button" type="button" onClick={rollToday}>
            Summon my substitute <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="gacha-result" aria-live="polite">
          {card ? (
            <>
              <div className="gacha-card substitute-card">
                <p className="eyebrow accent-text">SUBSTITUTE OF {dayString}</p>
                <div className="substitute-icon" aria-hidden="true">{result?.character.symbol}</div>
                <h2>{result?.character.label}</h2>
                <p>{result?.character.description}</p>
                <div className="gacha-card-meta">
                  <span>{state.name}</span>
                  <span>{`Substitute of ${dayString}`}</span>
                  <span>Blame deflection rate · {result?.defense}%</span>
                </div>
                <p className="share-line">{card.shareLine}</p>
              </div>
              <div className="result-actions gacha-actions">
                <button className="primary-button" type="button" onClick={downloadPng}>Download PNG</button>
                <button className="secondary-button" type="button" onClick={copyLink}>Copy link</button>
                <p className={`action-notice ${notice ? "is-visible" : ""}`} role="status">{notice || " "}</p>
              </div>
              <p className="reset-note">Come back tomorrow — substitute resets at midnight UTC</p>
            </>
          ) : (
            <div className="gacha-empty">Your substitute will appear here after the first summon.</div>
          )}
        </div>
      </section>
    </main>
  );
}
