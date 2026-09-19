"use client";

import dynamic from "next/dynamic";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  getDefaultGachaState,
  encodeGachaState,
  parseGachaState,
  type GachaState,
} from "@/lib/gacha-state";
import {
  getStatusVerdict,
  statusShareLine,
} from "@/lib/gacha-content";
import type { StatusCard } from "@/lib/gacha-canvas";

type Stats = {
  hp: number;
  mp: number;
  motivation: number;
  limit: number;
};

type StatusRow = {
  label: string;
  value: number;
  inverted: boolean;
};

const DEFAULT_STATS: Stats = { hp: 65, mp: 55, motivation: 45, limit: 35 };

function getDayString() {
  return new Date().toISOString().slice(0, 10);
}

function getInitialState(): { state: GachaState; stats: Stats } {
  if (typeof window === "undefined") {
    return { state: getDefaultGachaState(), stats: DEFAULT_STATS };
  }

  const params = new URLSearchParams(window.location.search);
  const parsedState = parseGachaState(window.location.search) ?? getDefaultGachaState();
  const parsedStats = {
    hp: Number(params.get("hp") ?? DEFAULT_STATS.hp),
    mp: Number(params.get("mp") ?? DEFAULT_STATS.mp),
    motivation: Number(params.get("mot") ?? DEFAULT_STATS.motivation),
    limit: Number(params.get("lim") ?? DEFAULT_STATS.limit),
  };

  return {
    state: parsedState,
    stats: Object.fromEntries(
      Object.entries(parsedStats).map(([key, value]) => [
        key,
        Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : DEFAULT_STATS[key as keyof Stats],
      ]),
    ) as Stats,
  };
}

export default function StatusTool() {
  const [{ state, stats }, setForm] = useState(getInitialState);
  const [nameDraft, setNameDraft] = useState(state.name === "Anonymous" ? "" : state.name);
  const [seedDraft, setSeedDraft] = useState(state.seed === "daily" ? "" : state.seed);
  const [notice, setNotice] = useState("");
  const dayString = getDayString();
  const verdict = getStatusVerdict(stats);
  const card: StatusCard = {
    name: state.name,
    date: `Status of ${dayString}`,
    stats,
    verdict,
    shareLine: statusShareLine(stats),
  };

  useEffect(() => {
    const initial = getInitialState();
    setForm(initial);
    setNameDraft(initial.state.name === "Anonymous" ? "" : initial.state.name);
    setSeedDraft(initial.state.seed === "daily" ? "" : initial.state.seed);
  }, []);

  function updateStats(key: keyof Stats, value: number) {
    setForm((current) => ({ ...current, stats: { ...current.stats, [key]: value } }));
  }

  function renderStatus(event: FormEvent) {
    event.preventDefault();
    const nextState = {
      name: nameDraft.trim() || "Anonymous",
      seed: seedDraft.trim() || "daily",
    };
    setForm((current) => ({ ...current, state: nextState }));
    const params = new URLSearchParams(encodeGachaState(nextState.name, nextState.seed));
    params.set("hp", String(stats.hp));
    params.set("mp", String(stats.mp));
    params.set("mot", String(stats.motivation));
    params.set("lim", String(stats.limit));
    window.history.replaceState(null, "", `/?${params.toString()}`);
    setNotice("Status rendered.");
  }

  async function downloadPng() {
    const canvas = await import("@/lib/gacha-canvas").then(
      (module) => module.renderStatusCanvas(card),
    );
    const link = document.createElement("a");
    link.download = `status-${dayString}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setNotice("PNG downloaded.");
  }

  async function copyLink() {
    const params = new URLSearchParams(encodeGachaState(state.name, state.seed));
    params.set("hp", String(stats.hp));
    params.set("mp", String(stats.mp));
    params.set("mot", String(stats.motivation));
    params.set("lim", String(stats.limit));
    await navigator.clipboard.writeText(`${window.location.origin}/?${params.toString()}`);
    setNotice("Share link copied.");
  }

  return (
    <main className="app-page gacha-page">
      <section className="app-shell gacha-shell status-shell" aria-labelledby="status-title">
        <header className="gacha-header">
          <div>
            <p className="eyebrow">MODERN HUMAN / STATUS SCREEN</p>
            <h1 id="status-title">Modern Human Status Screen</h1>
            <p>Set four values. Render the exact state you are in today.</p>
          </div>
          <span className="date-tag">{dayString}</span>
        </header>
        <form className="status-form" onSubmit={renderStatus}>
          <div className="status-fields">
            <label className="field-label" htmlFor="status-name">Name or handle</label>
            <input id="status-name" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} placeholder="e.g. Mika" autoComplete="off" />
            <label className="field-label" htmlFor="status-seed">Personal seed</label>
            <input id="status-seed" value={seedDraft} onChange={(event) => setSeedDraft(event.target.value)} placeholder="daily" autoComplete="off" />
          </div>
          <div className="stat-grid">
            {[
              ["hp", "HP", "Physical"],
              ["mp", "MP", "Mental"],
              ["motivation", "MOT", "Motivation"],
              ["limit", "LIM", "Limit Gauge"],
            ].map(([key, label, description]) => (
              <label className="stat-field" key={key} htmlFor={`status-${key}`}>
                <span><strong>{label}</strong><small>{description}</small></span>
                <input
                  id={`status-${key}`}
                  type="range"
                  min="0"
                  max="100"
                  value={stats[key as keyof Stats]}
                  onChange={(event) => updateStats(key as keyof Stats, Number(event.target.value))}
                />
                <output>{stats[key as keyof Stats]}</output>
              </label>
            ))}
          </div>
          <button className="primary-button gacha-button" type="submit">Render my status <span aria-hidden="true">→</span></button>
        </form>
        <div className="gacha-result" aria-live="polite">
          <div className="gacha-card status-card">
            <p className="eyebrow accent-text">STATUS OF {dayString}</p>
            <h2>{state.name}</h2>
            <div className="status-bars">
              {([
                { label: "HP", value: stats.hp, inverted: false },
                { label: "MP", value: stats.mp, inverted: false },
                { label: "MOT", value: stats.motivation, inverted: false },
                { label: "LIM", value: stats.limit, inverted: true },
              ] satisfies StatusRow[]).map(({ label, value, inverted }) => (
                <div className="status-bar" key={label}>
                  <span>{label}</span>
                  <div><i className={`status-fill status-${inverted ? "inverted-" : ""}${value > 60 ? "high" : value >= 30 ? "medium" : "low"}`} style={{ width: `${value}%` }} /></div>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <p className="verdict">{verdict}</p>
            <div className="gacha-card-meta"><span>{state.name}</span><span>{`Status of ${dayString}`}</span></div>
            <p className="share-line">{card.shareLine}</p>
          </div>
          <div className="result-actions gacha-actions">
            <button className="primary-button" type="button" onClick={downloadPng}>Download PNG</button>
            <button className="secondary-button" type="button" onClick={copyLink}>Copy link</button>
            <p className={`action-notice ${notice ? "is-visible" : ""}`} role="status">{notice || " "}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
