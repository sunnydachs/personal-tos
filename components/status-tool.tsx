"use client";

import { FormEvent, useEffect, useState } from "react";
import { ShareButtons } from "@/components/share-buttons";
import {
  getDefaultGachaState,
  saveGachaIdentity,
  encodeGachaState,
  parseGachaState,
  type GachaState,
} from "@/lib/gacha-state";
import type { StatusCard } from "@/lib/gacha-canvas";
import { formatTemplate } from "@/lib/i18n";
import type { Lang, StatusStrings } from "@/lib/i18n-strings";

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

function getStatusVerdict(stats: Stats, strings: StatusStrings) {
  if (stats.hp > 60 && stats.mp > 60 && stats.motivation > 60 && stats.limit > 60) {
    return strings.verdictOperational;
  }
  if (stats.hp < 30 || stats.mp < 30) return strings.verdictCritical;
  if (stats.limit > 80) return strings.verdictCapacity;
  return strings.verdictStandard;
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

export default function StatusTool({
  lang,
  strings,
}: {
  lang: Lang;
  strings: StatusStrings;
}) {
  const [{ state, stats }, setForm] = useState(getInitialState);
  const [nameDraft, setNameDraft] = useState(state.name === "Anonymous" ? "" : state.name);
  const [seedDraft, setSeedDraft] = useState(state.seed === "daily" ? "" : state.seed);
  const [notice, setNotice] = useState("");
  const statusParams = new URLSearchParams(encodeGachaState(state.name, state.seed));
  statusParams.set("hp", String(stats.hp));
  statusParams.set("mp", String(stats.mp));
  statusParams.set("mot", String(stats.motivation));
  statusParams.set("lim", String(stats.limit));
  const shareUrl = `/${lang === "ja" ? "ja?" : "?"}${statusParams.toString()}`;
  const dayString = getDayString();
  const verdict = getStatusVerdict(stats, strings);
  const card: StatusCard = {
    name: state.name,
    date: `${dayString}`,
    stats,
    verdict,
    shareLine: formatTemplate(strings.share, {
      hp: stats.hp,
      mp: stats.mp,
      mot: stats.motivation,
      lim: stats.limit,
    }),
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

  function applyPreset(presetStats: Stats) {
    setForm((current) => ({ ...current, stats: presetStats }));
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
    window.history.replaceState(null, "", `/${lang === "ja" ? "ja?" : "?"}${params.toString()}`);
    saveGachaIdentity(nextState.name, nextState.seed);
    setNotice(lang === "ja" ? "ステータスを表示しました。" : "Status rendered.");
  }

  async function downloadPng() {
    const canvas = await import("@/lib/gacha-canvas").then(
      (module) => module.renderStatusCanvas(card),
    );
    const link = document.createElement("a");
    link.download = `status-${dayString}.png`;
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
      <section className="app-shell gacha-shell status-shell" aria-labelledby="status-title">
        <header className="gacha-header">
          <div>
            <p className="eyebrow">{strings.eyebrow}</p>
            <h1 id="status-title">{strings.title}</h1>
            <p>{strings.pitch}</p>
          </div>
          <span className="date-tag">{dayString}</span>
        </header>
        <form className="status-form" onSubmit={renderStatus}>
          <div className="status-fields">
            <label className="field-label" htmlFor="status-name">{strings.nameLabel}</label>
            <input id="status-name" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} placeholder={strings.namePlaceholder} autoComplete="off" />
            <label className="field-label" htmlFor="status-seed">{strings.seedLabel}</label>
            <input id="status-seed" value={seedDraft} onChange={(event) => setSeedDraft(event.target.value)} placeholder={strings.seedPlaceholder} autoComplete="off" />
          </div>
          <div className="stat-grid">
            {(["hp", "mp", "motivation", "limit"] as const).map((key) => (
              <label className="stat-field" key={key} htmlFor={`status-${key}`}>
                <span><strong>{strings.statLabels[key]}</strong><small>{strings.statDescriptions[key]}</small></span>
                <input id={`status-${key}`} type="range" min="0" max="100" value={stats[key]} onChange={(event) => updateStats(key, Number(event.target.value))} />
                <output>{stats[key]}</output>
              </label>
            ))}
          </div>
          <div className="status-presets">
            <span className="status-presets-label">{strings.presetsLabel}</span>
            {strings.presets.map((preset) => (
              <button
                className="status-preset-chip"
                key={preset.id}
                type="button"
                onClick={() => applyPreset({ ...preset.stats })}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <button className="primary-button gacha-button" type="submit">{strings.action} <span aria-hidden="true">→</span></button>
        </form>
        <div className="gacha-result" aria-live="polite">
          <div className="gacha-card status-card">
            <p className="eyebrow accent-text">STATUS OF {dayString}</p>
            <h2>{state.name}</h2>
            <div className="status-bars">
              {(["hp", "mp", "motivation", "limit"] as const).map((key) => {
                const inverted = key === "limit";
                return (
                  <div className="status-bar" key={key}>
                    <span>{strings.statLabels[key]}</span>
                    <div><i className={`status-fill status-${inverted ? "inverted-" : ""}${stats[key] > 60 ? "high" : stats[key] >= 30 ? "medium" : "low"}`} style={{ width: `${stats[key]}%` }} /></div>
                    <strong>{stats[key]}</strong>
                  </div>
                );
              })}
            </div>
            <p className="verdict">{verdict}</p>
            <div className="gacha-card-meta"><span>{state.name}</span><span>{dayString}</span></div>
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
        </div>
      </section>
    </main>
  );
}
