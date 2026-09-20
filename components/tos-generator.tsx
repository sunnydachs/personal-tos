"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  assembleClauses,
  assembleClausesJa,
  assembleClausesLove,
  assembleClausesLoveJa,
  assembleResultCard,
  assembleResultCardJa,
  assembleResultCardLove,
  assembleResultCardLoveJa,
  traitDescriptions,
  traitDescriptionsJa,
  traitDescriptionsLove,
  traitDescriptionsLoveJa,
  traitIds,
  traitLabels,
  traitLabelsJa,
  traitLabelsLove,
  traitLabelsLoveJa,
  type TraitId,
} from "@/lib/tos-content";
import {
  encodeState,
  getDefaultState,
  parseState,
  getVersion,
  type GeneratorState,
} from "@/lib/tos-state";
import { formatTemplate } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n-strings";

type Screen = "setup" | "terms" | "result";
export type Tone = "corporate" | "love";
type TosStrings = {
  eyebrow: string;
  setupEyebrow: string;
  title: string;
  titleEm: string;
  lead: string;
  nameLabel: string;
  namePlaceholder: string;
  traitTitle: string;
  selectedCount: string;
  setupNote: string;
  continueLabel: string;
  termsEyebrow: string;
  termsTitle: string;
  effective: string;
  documentId: string;
  signoff: string;
  progressLabel: string;
  finePrint: string;
  agreeLabel: string;
  readProgress: string;
  resultEyebrow: string;
  resultKicker: string;
  resultClue: string;
  article3: string;
  article6: string;
  resultFooter: string;
  downloadPng: string;
  copyImage: string;
  copyLink: string;
  editTerms: string;
  randomTerms: string;
  rendering: string;
  pngDownloaded: string;
  imageCopied: string;
  linkCopied: string;
  exportFailed: string;
  clipboardBlocked: string;
  footer: string;
};

export type { TosStrings };

function getInitialState(): GeneratorState {
  if (typeof window === "undefined") return getDefaultState();
  return parseState(window.location.search) ?? getDefaultState();
}

function AppIcon() {
  return (
    <div className="app-icon" aria-hidden="true">
      <span /><span /><span />
    </div>
  );
}

function ToneTabs({ tone, onChange, lang }: { tone: Tone; onChange: (tone: Tone) => void; lang: Lang }) {
  const labels: Record<Tone, string> =
    lang === "ja"
      ? { corporate: "仕事モード", love: "恋愛モード" }
      : { corporate: "Corporate", love: "With Love" };
  return (
    <div className="tone-tabs" role="tablist" aria-label="Tone">
      {([
        ["corporate", labels.corporate],
        ["love", labels.love],
      ] as const).map(([value, label]) => (
        <button
          className={tone === value ? "is-active" : ""}
          key={value}
          type="button"
          role="tab"
          aria-selected={tone === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function TraitPicker({
  selectedTraitIds,
  onToggle,
  strings,
  lang,
  tone,
}: {
  selectedTraitIds: TraitId[];
  onToggle: (traitId: TraitId) => void;
  strings: Pick<TosStrings, "selectedCount">;
  lang: Lang;
  tone: Tone;
}) {
  const labels = tone === "love"
    ? (lang === "ja" ? traitLabelsLoveJa : traitLabelsLove)
    : (lang === "ja" ? traitLabelsJa : traitLabels);
  const descriptions = tone === "love"
    ? (lang === "ja" ? traitDescriptionsLoveJa : traitDescriptionsLove)
    : (lang === "ja" ? traitDescriptionsJa : traitDescriptions);
  return (
    <div className="trait-picker">
      {traitIds.map((traitId) => {
        const selected = selectedTraitIds.includes(traitId);
        return (
          <label className={`trait-option ${selected ? "is-selected" : ""}`} key={traitId}>
            <input type="checkbox" checked={selected} onChange={() => onToggle(traitId)} />
            <span className="trait-checkbox" aria-hidden="true">{selected ? "✓" : ""}</span>
            <span className="trait-copy">
              <strong>{labels[traitId]}</strong>
              <small>{descriptions[traitId]}</small>
            </span>
          </label>
        );
      })}
    </div>
  );
}

function TermsModal({
  lang,
  state,
  tone,
  onAgree,
  strings,
}: {
  lang: Lang;
  state: GeneratorState;
  tone: Tone;
  onAgree: () => void;
  strings: TosStrings;
}) {
  const clauses = useMemo(
    () => tone === "love"
      ? lang === "ja"
        ? assembleClausesLoveJa(state.name, state.traitIds)
        : assembleClausesLove(state.name, state.traitIds)
      : lang === "ja"
        ? assembleClausesJa(state.name, state.traitIds)
        : assembleClauses(state.name, state.traitIds),
    [lang, state.name, state.traitIds, tone],
  );
  const [readPercent, setReadPercent] = useState(0);

  useEffect(() => {
    const clauseArea = document.getElementById("clause-area");
    if (!clauseArea) return;
    const updateProgress = () => {
      const maximumScroll = clauseArea.scrollHeight - clauseArea.clientHeight;
      setReadPercent(maximumScroll <= 0
        ? 100
        : Math.min(100, Math.round((clauseArea.scrollTop / maximumScroll) * 100)));
    };
    updateProgress();
    clauseArea.addEventListener("scroll", updateProgress, { passive: true });
    return () => clauseArea.removeEventListener("scroll", updateProgress);
  }, [clauses]);

  return (
    <section className="app-shell tos-shell" aria-labelledby="terms-title">
      <header className="terms-header">
        <div>
          <p className="eyebrow">{strings.termsEyebrow}</p>
          <h1 id="terms-title">{strings.termsTitle}</h1>
        </div>
        <span className="version-tag">{strings.effective} · {strings.documentId.replace("{version}", getVersion(state.name, state.traitIds, tone))}</span>
      </header>
      <div className="terms-meta">
        <span>{strings.effective}</span>
        <span>Document ID / ME-{state.name.toUpperCase().replace(/\s+/g, "-") || "ANON"}</span>
      </div>
      <div className="clause-area" id="clause-area">
        <div className="clause-list">
          {clauses.map((article) => (
            <section className="clause-section" key={article.number}>
              <div className="clause-heading">
                <span className="clause-number">{article.number}</span>
                <h2>{article.title}</h2>
              </div>
              <div className="clause-body">
                {article.clauses.map((clause, index) => (
                  <p key={clause}>{article.number === "第3条" ? `${index + 1}. ` : ""}{clause}</p>
                ))}
              </div>
            </section>
          ))}
          <p className="clause-signoff">{strings.signoff}</p>
        </div>
      </div>
      <div className="reading-progress" aria-label={formatTemplate(strings.progressLabel, { percent: readPercent })}>
        <span style={{ width: `${readPercent}%` }} />
      </div>
      <footer className="terms-footer">
        <p>{strings.finePrint}</p>
        <button className="primary-button" type="button" onClick={onAgree}>{strings.agreeLabel} <span aria-hidden="true">→</span></button>
        <small>{formatTemplate(strings.readProgress, { percent: readPercent })}</small>
      </footer>
    </section>
  );
}

function ResultCard({
  lang,
  state,
  tone,
  onEdit,
  strings,
}: {
  lang: Lang;
  state: GeneratorState;
  tone: Tone;
  onEdit: () => void;
  strings: TosStrings;
}) {
  const card = useMemo(
    () => tone === "love"
      ? lang === "ja"
        ? assembleResultCardLoveJa(state.name, state.traitIds)
        : assembleResultCardLove(state.name, state.traitIds)
      : lang === "ja"
        ? assembleResultCardJa(state.name, state.traitIds)
        : assembleResultCard(state.name, state.traitIds),
    [lang, state.name, state.traitIds, tone],
  );
  const [notice, setNotice] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const shareUrl = `/${lang === "ja" ? "ja?" : "?"}${encodeState(state.name, state.traitIds, tone)}`;

  async function downloadPng() {
    setIsExporting(true);
    setNotice("");
    try {
      const { renderTosCanvas } = await import("@/lib/tos-render-canvas");
      const canvas = await renderTosCanvas({ name: state.name, traitIds: state.traitIds, tone });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Could not create PNG.");
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `personal-tos-${state.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "anonymous"}.png`;
      anchor.click();
      URL.revokeObjectURL(url);
      setNotice(strings.pngDownloaded);
    } catch {
      setNotice(strings.exportFailed);
    } finally {
      setIsExporting(false);
    }
  }

  async function copyImage() {
    setNotice("");
    try {
      const { renderTosCanvas } = await import("@/lib/tos-render-canvas");
      const canvas = await renderTosCanvas({ name: state.name, traitIds: state.traitIds, tone });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Could not create PNG.");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setNotice(strings.imageCopied);
    } catch {
      setNotice(strings.clipboardBlocked);
    }
  }

  async function copyLink() {
    setNotice("");
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${shareUrl}`);
      setNotice(strings.linkCopied);
    } catch {
      setNotice(strings.clipboardBlocked);
    }
  }

  function randomize() {
    const shuffled = [...traitIds].sort(() => Math.random() - 0.5);
    const count = 3 + Math.floor(Math.random() * 3);
    window.location.assign(`/${lang === "ja" ? "ja?" : "?"}${encodeState(state.name, shuffled.slice(0, count), tone)}`);
  }

  return (
    <section className="result-wrap" aria-labelledby="result-title">
      <div className="result-card" id="result-card">
        <div className="result-card-inner">
          <p className="eyebrow accent-text">{strings.resultEyebrow}</p>
          <h1 id="result-title">{card.name}</h1>
          <p className="result-kicker">{strings.resultKicker}</p>
          <div className="result-rule" />
          <div className="result-ink" />
          {card.clauses.length > 0 && (
            <div className="result-clauses">
              {card.clauses.map((clause, index) => (
                <p className="result-clause-item" key={clause}>{index + 1}. {clause}</p>
              ))}
            </div>
          )}
          <p className="result-clause">{strings.resultClue}</p>
        </div>
      </div>
      <div className="result-actions gacha-actions">
        <button className="primary-button" type="button" onClick={downloadPng} disabled={isExporting}>{strings.downloadPng}</button>
        <button className="secondary-button" type="button" onClick={copyImage}>{strings.copyImage}</button>
        <button className="secondary-button" type="button" onClick={copyLink}>{strings.copyLink}</button>
      </div>
      <div className="result-actions">
        <button className="text-button" type="button" onClick={onEdit}>{strings.editTerms}</button>
        <button className="text-button" type="button" onClick={randomize}>{strings.randomTerms}</button>
      </div>
      <p className={`action-notice ${notice ? "is-visible" : ""}`} role="status">{notice || " "}</p>
    </section>
  );
}

export function TosGenerator({
  lang,
  strings,
  stringsLove,
  tone = "corporate",
}: {
  lang: Lang;
  strings: TosStrings;
  stringsLove: TosStrings;
  tone?: Tone;
}) {
  const [state, setState] = useState<GeneratorState>(() => getInitialState());
  const [activeTone, setActiveTone] = useState<Tone>(() =>
    typeof window === "undefined"
      ? tone
      : new URLSearchParams(window.location.search).get("m") === "love"
        ? "love"
        : "corporate",
  );
  const toneStrings = activeTone === "love" ? stringsLove : strings;
  const [screen, setScreen] = useState<Screen>("setup");
  const [nameDraft, setNameDraft] = useState(state.name === "Anonymous" ? "" : state.name);
  const [selectedTraitIds, setSelectedTraitIds] = useState<TraitId[]>(state.traitIds);

  useEffect(() => {
    const nextState = getInitialState();
    setState(nextState);
    setActiveTone(
      new URLSearchParams(window.location.search).get("m") === "love"
        ? "love"
        : "corporate",
    );
    setNameDraft(nextState.name === "Anonymous" ? "" : nextState.name);
    setSelectedTraitIds(nextState.traitIds);
    if (nextState.traitIds.length > 0) setScreen("terms");
  }, []);

  function toggleTrait(traitId: TraitId) {
    setSelectedTraitIds((current) => current.includes(traitId)
      ? current.filter((currentTraitId) => currentTraitId !== traitId)
      : [...current, traitId]);
  }
  function continueToTerms(event: FormEvent) {
    event.preventDefault();
    const nextState = { name: nameDraft.trim() || "Anonymous", traitIds: selectedTraitIds, tone: activeTone };
    setState(nextState);
    window.history.replaceState(null, "", `/${lang === "ja" ? "ja?" : "?"}${encodeState(nextState.name, nextState.traitIds, activeTone)}`);
    try {
      const stored = window.localStorage.getItem("personal-tos:identity");
      const parsed = stored ? JSON.parse(stored) as { seed?: string } : {};
      window.localStorage.setItem("personal-tos:identity", JSON.stringify({ name: nextState.name, seed: parsed.seed ?? "daily" }));
    } catch {
      // storage unavailable — skip persisting
    }
    setScreen("terms");
  }
  function agreeToTerms() { setScreen("result"); }
  function editTerms() { setScreen("setup"); }

  return (
    <main className={`app-page ${activeTone === "love" ? "tone-love" : ""}`}>
      {screen === "setup" && (
        <section className="app-shell setup-shell" aria-labelledby="setup-title">
          <ToneTabs tone={activeTone} onChange={setActiveTone} lang={lang} />
          <div className="setup-intro">
            <AppIcon />
            <div>
              <p className="eyebrow">{toneStrings.setupEyebrow}</p>
              <h1 id="setup-title">{toneStrings.title}<br /><em>{toneStrings.titleEm}</em></h1>
              <p className="setup-lead">{toneStrings.lead}</p>
            </div>
          </div>
          <form className="setup-form" onSubmit={continueToTerms}>
            <label className="field-label" htmlFor="name">{toneStrings.nameLabel}</label>
            <input id="name" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} placeholder={toneStrings.namePlaceholder} autoComplete="off" />
            <div className="trait-heading">
              <div><span className="section-index">01</span><h2>{toneStrings.traitTitle}</h2></div>
              <p>{formatTemplate(toneStrings.selectedCount, { count: selectedTraitIds.length })}</p>
            </div>
            <TraitPicker selectedTraitIds={selectedTraitIds} onToggle={toggleTrait} strings={toneStrings} lang={lang} tone={activeTone} />
            <p className="setup-note">{toneStrings.setupNote}</p>
            <button className="primary-button continue-button" type="submit" disabled={selectedTraitIds.length < 3}>{toneStrings.continueLabel} <span aria-hidden="true">→</span></button>
          </form>
        </section>
      )}
      {screen === "terms" && <TermsModal lang={lang} state={state} tone={activeTone} onAgree={agreeToTerms} strings={toneStrings} />}
      {screen === "result" && <ResultCard lang={lang} state={state} tone={activeTone} onEdit={editTerms} strings={toneStrings} />}
    </main>
  );
}
