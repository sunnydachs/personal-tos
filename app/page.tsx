"use client";

import dynamic from "next/dynamic";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  assembleClauses,
  assembleResultCard,
  traitDescriptions,
  traitIds,
  traitLabels,
  type TraitId,
} from "@/lib/tos-content";
import {
  encodeState,
  getDefaultState,
  parseState,
  getVersion,
  type GeneratorState,
} from "@/lib/tos-state";

type Screen = "setup" | "terms" | "result";

function getInitialState(): GeneratorState {
  if (typeof window === "undefined") {
    return getDefaultState();
  }

  return parseState(window.location.search) ?? getDefaultState();
}

function AppIcon() {
  return (
    <div className="app-icon" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function TraitPicker({
  selectedTraitIds,
  onToggle,
}: {
  selectedTraitIds: TraitId[];
  onToggle: (traitId: TraitId) => void;
}) {
  return (
    <div className="trait-picker">
      {traitIds.map((traitId) => {
        const selected = selectedTraitIds.includes(traitId);
        return (
          <label className={`trait-option ${selected ? "is-selected" : ""}`} key={traitId}>
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggle(traitId)}
            />
            <span className="trait-checkbox" aria-hidden="true">
              {selected ? "✓" : ""}
            </span>
            <span className="trait-copy">
              <strong>{traitLabels[traitId]}</strong>
              <small>{traitDescriptions[traitId]}</small>
            </span>
          </label>
        );
      })}
    </div>
  );
}

function TermsModal({
  name,
  traitIds: selectedTraitIds,
  onAgree,
}: GeneratorState & { onAgree: () => void }) {
  const clauses = useMemo(
    () => assembleClauses(name, selectedTraitIds),
    [name, selectedTraitIds],
  );
  const [readPercent, setReadPercent] = useState(0);

  useEffect(() => {
    const clauseArea = document.getElementById("clause-area");
    if (!clauseArea) {
      return;
    }

    const updateProgress = () => {
      const maximumScroll = clauseArea.scrollHeight - clauseArea.clientHeight;
      setReadPercent(
        maximumScroll <= 0
          ? 100
          : Math.min(100, Math.round((clauseArea.scrollTop / maximumScroll) * 100)),
      );
    };

    updateProgress();
    clauseArea.addEventListener("scroll", updateProgress, { passive: true });
    return () => clauseArea.removeEventListener("scroll", updateProgress);
  }, [clauses]);

  return (
    <section className="app-shell tos-shell" aria-labelledby="terms-title">
      <header className="terms-header">
        <div>
          <p className="eyebrow">PERSONAL TERMS / LEGAL NOTICE</p>
          <h1 id="terms-title">Terms &amp; Conditions of Being Me</h1>
        </div>
        <span className="version-tag">Version {getVersion(name, selectedTraitIds)}</span>
      </header>
      <div className="terms-meta">
        <span>Effective: the day you met me</span>
        <span>Document ID / ME-{name.toUpperCase().replace(/[^A-Z0-9]/g, "") || "ANON"}</span>
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
                  <p key={clause}>
                    {article.number === "Article 3" ? `${index + 1}. ` : ""}{clause}
                  </p>
                ))}
              </div>
            </section>
          ))}
          <p className="clause-signoff">End of terms · no exceptions were reviewed.</p>
        </div>
      </div>
      <div className="reading-progress" aria-label={`You have read ${readPercent}%`}>
        <span style={{ width: `${readPercent}%` }} />
      </div>
      <footer className="terms-footer">
        <p>By proceeding, you accept all clauses, including the ones you skipped.</p>
        <button className="primary-button" type="button" onClick={onAgree}>
          I Agree <span aria-hidden="true">→</span>
        </button>
        <small>You&apos;ve read {readPercent}%</small>
      </footer>
    </section>
  );
}

function ResultCard({ state, onEdit }: { state: GeneratorState; onEdit: () => void }) {
  const card = useMemo(
    () => assembleResultCard(state.name, state.traitIds),
    [state.name, state.traitIds],
  );
  const [notice, setNotice] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const shareUrl = `/?${encodeState(state.name, state.traitIds)}`;

  async function downloadPng() {
    setIsExporting(true);
    setNotice("");
    try {
      const { renderTosCanvas } = await import("@/lib/tos-render-canvas");
      const canvas = await renderTosCanvas({
        name: state.name,
        traitIds: state.traitIds,
      });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) {
        throw new Error("Could not create PNG.");
      }
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `personal-tos-${state.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "anonymous"}.png`;
      anchor.click();
      URL.revokeObjectURL(url);
      setNotice("PNG downloaded.");
    } catch {
      setNotice("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }

  async function copyImage() {
    setNotice("");
    try {
      const { renderTosCanvas } = await import("@/lib/tos-render-canvas");
      const canvas = await renderTosCanvas({
        name: state.name,
        traitIds: state.traitIds,
      });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) {
        throw new Error("Could not create PNG.");
      }
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setNotice("Image copied to clipboard.");
    } catch {
      setNotice("Clipboard access was blocked.");
    }
  }

  async function copyLink() {
    setNotice("");
    try {
      await navigator.clipboard.writeText(shareUrl);
      setNotice("Share link copied.");
    } catch {
      setNotice("Clipboard access was blocked.");
    }
  }

  function randomize() {
    const shuffled = [...traitIds].sort(() => Math.random() - 0.5);
    const count = 2 + Math.floor(Math.random() * 3);
    window.location.assign(`/?${encodeState(state.name, shuffled.slice(0, count))}`);
  }

  return (
    <section className="result-wrap" aria-labelledby="result-title">
      <div className="result-card" id="result-card">
        <div className="result-card-inner">
          <p className="eyebrow accent-text">ACCEPTED TERMS / PERSONAL FILE</p>
          <h1 id="result-title">{card.name}</h1>
          <p className="result-kicker">Terms &amp; Conditions of Being Me</p>
          <div className="result-rule" />
          <div className="result-clauses">
            <p className="result-label">Article 3 · Handling Precautions</p>
            {card.clauses.map((clause, index) => (
              <p className="result-clause" key={clause}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {clause}
              </p>
            ))}
            <p className="result-label result-change-label">Article 6 · Changes to These Terms</p>
            <p className="result-clause">{card.changesClause}</p>
          </div>
          <p className="result-footer">You agreed to this. - {card.name}</p>
        </div>
      </div>
      <div className="result-actions">
        <button className="primary-button" type="button" onClick={downloadPng} disabled={isExporting}>
          {isExporting ? "Rendering…" : "Download PNG"}
        </button>
        <button className="secondary-button" type="button" onClick={copyImage}>Copy image</button>
        <button className="secondary-button" type="button" onClick={copyLink}>Copy link</button>
        <button className="text-button" type="button" onClick={onEdit}>Edit terms</button>
        <button className="random-button" type="button" onClick={randomize}>See a random person&apos;s terms</button>
        <p className={`action-notice ${notice ? "is-visible" : ""}`} role="status">{notice || "\u00a0"}</p>
      </div>
    </section>
  );
}

export default function Home() {
  const [state, setState] = useState<GeneratorState>(() => getInitialState());
  const [screen, setScreen] = useState<Screen>("setup");
  const [nameDraft, setNameDraft] = useState(state.name === "Anonymous" ? "" : state.name);
  const [selectedTraitIds, setSelectedTraitIds] = useState<TraitId[]>(state.traitIds);

  useEffect(() => {
    const nextState = getInitialState();
    setState(nextState);
    setNameDraft(nextState.name === "Anonymous" ? "" : nextState.name);
    setSelectedTraitIds(nextState.traitIds);
    if (nextState.traitIds.length > 0) {
      setScreen("terms");
    }
  }, []);

  const clauses = useMemo(() => assembleClauses(state.name, selectedTraitIds), [state, selectedTraitIds]);

  function toggleTrait(traitId: TraitId) {
    setSelectedTraitIds((current) =>
      current.includes(traitId)
        ? current.filter((currentTraitId) => currentTraitId !== traitId)
        : [...current, traitId],
    );
  }

  function continueToTerms(event: FormEvent) {
    event.preventDefault();
    const nextState = { name: nameDraft.trim() || "Anonymous", traitIds: selectedTraitIds };
    setState(nextState);
    window.history.replaceState(null, "", `/?${encodeState(nextState.name, nextState.traitIds)}`);
    setScreen("terms");
  }

  function agreeToTerms() {
    setScreen("result");
  }

  function editTerms() {
    setScreen("setup");
  }

  return (
    <main className="app-page">
      {screen === "setup" && (
        <section className="app-shell setup-shell" aria-labelledby="setup-title">
          <div className="setup-intro">
            <AppIcon />
            <div>
              <p className="eyebrow">A VERY SERIOUS LEGAL PRODUCT</p>
              <h1 id="setup-title">Terms &amp; Conditions<br /><em>of Being Me</em></h1>
              <p className="setup-lead">Create the terms everyone scrolls past. Select the clauses that make you, you.</p>
            </div>
          </div>
          <form className="setup-form" onSubmit={continueToTerms}>
            <label className="field-label" htmlFor="name">Your name or handle</label>
            <input
              id="name"
              value={nameDraft}
              onChange={(event) => setNameDraft(event.target.value)}
              placeholder="e.g. Mika"
              autoComplete="off"
            />
            <div className="trait-heading">
              <div>
                <span className="section-index">01</span>
                <h2>Select your operating conditions</h2>
              </div>
              <p>{selectedTraitIds.length} / 8 selected</p>
            </div>
            <TraitPicker selectedTraitIds={selectedTraitIds} onToggle={toggleTrait} />
            <p className="setup-note">Checking more traits makes your terms stricter.</p>
            <button className="primary-button continue-button" type="submit">Continue to Terms <span aria-hidden="true">→</span></button>
          </form>
        </section>
      )}
      {screen === "terms" && <TermsModal {...state} onAgree={agreeToTerms} />}
      {screen === "result" && <ResultCard state={state} onEdit={editTerms} />}
    </main>
  );
}
