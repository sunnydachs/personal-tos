import { ImageResponse } from "next/og";
import { assembleResultCard } from "@/lib/tos-content";
import { design } from "@/lib/tos-design";
import { parseCompactState, type TraitId } from "@/lib/tos-state";

export const alt = "Terms & Conditions of Being Me";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const state = id === "default"
    ? { name: "Anonymous", traitIds: [] as TraitId[] }
    : parseCompactState(id);

  if (!state) {
    return new Response("Invalid card state", { status: 400 });
  }

  const card = assembleResultCard(state.name, state.traitIds);
  return new ImageResponse(
    (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: design.background,
        padding: design.padding,
      }}>
        <div style={{
          width: design.width - design.padding * 2,
          height: design.height - design.padding * 2,
          display: "flex",
          flexDirection: "column",
          padding: 54,
          borderRadius: 24,
          background: design.card,
        }}>
          <div style={{ color: design.accent, fontSize: design.eyebrowSize, fontWeight: 700, letterSpacing: 1 }}>TERMS &amp; CONDITIONS OF BEING ME</div>
          <div style={{ marginTop: 16, color: design.ink, fontSize: design.titleSize, fontWeight: 700, lineHeight: 1.1 }}>{card.name}</div>
          <div style={{ marginTop: 8, color: design.muted, fontSize: design.eyebrowSize }}>Effective: the day you met me</div>
          <div style={{ height: 2, marginTop: 24, background: design.line }} />
          <div style={{ marginTop: 28, color: design.ink, fontSize: design.clauseSize, fontWeight: 700 }}>ARTICLE 3 · HANDLING PRECAUTIONS</div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 13 }}>
            {card.clauses.map((clause, index) => (
              <div key={clause} style={{ display: "flex", gap: 10, color: design.ink, fontSize: design.clauseSize - 1, lineHeight: 1.25 }}>
                <span style={{ color: design.accent }}>{String(index + 1).padStart(2, "0")}</span>
                <span>{clause}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, color: design.ink, fontSize: design.clauseSize, fontWeight: 700 }}>ARTICLE 6 · CHANGES TO THESE TERMS</div>
          <div style={{ marginTop: 12, color: design.ink, fontSize: design.clauseSize - 1, lineHeight: 1.25 }}>{card.changesClause}</div>
          <div style={{ marginTop: "auto", paddingTop: 18, borderTop: `1px solid ${design.line}`, color: design.muted, fontSize: design.footerSize }}>You agreed to this. - {card.name}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
