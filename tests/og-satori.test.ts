import { describe, it, expect } from "vitest";
import satori from "satori";
import { readFileSync } from "node:fs";
import { assembleResultCard } from "@/lib/tos-content";
import { design } from "@/lib/tos-design";

const fontData = readFileSync("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf");
const font = { name: "DejaVu", data: fontData, weight: 400, style: "normal" as const };

// EXACT copy of the prod card OG children (from app/card/[id]/opengraph-image.tsx, default state)
const card = assembleResultCard("Anonymous", []);
const children = [
  { type: "div", props: { style: { color: design.accent, fontSize: design.eyebrowSize, fontWeight: 700, letterSpacing: 1 }, children: "TERMS & CONDITIONS OF BEING ME" } },
  { type: "div", props: { style: { marginTop: 16, color: design.ink, fontSize: design.titleSize, fontWeight: 700, lineHeight: 1.1 }, children: card.name } },
  { type: "div", props: { style: { marginTop: 8, color: design.muted, fontSize: design.eyebrowSize }, children: "Effective: the day you met me" } },
  { type: "div", props: { style: { height: 2, marginTop: 24, display: "flex", background: design.line } } },
  { type: "div", props: { style: { marginTop: 28, color: design.ink, fontSize: design.clauseSize, fontWeight: 700 }, children: "ARTICLE 3 · HANDLING PRECAUTIONS" } },
  { type: "div", props: { style: { marginTop: 16, display: "flex", flexDirection: "column", gap: 13 }, children: card.clauses.map((clause: string, index: number) => ({
    type: "div", props: { key: clause, style: { display: "flex", gap: 10, color: design.ink, fontSize: design.clauseSize - 1, lineHeight: 1.25 }, children: [
      { type: "span", props: { style: { color: design.accent }, children: String(index + 1).padStart(2, "0") } },
      { type: "span", props: { children: clause } },
    ] },
  })) } },
  { type: "div", props: { style: { marginTop: 24, color: design.ink, fontSize: design.clauseSize, fontWeight: 700 }, children: "ARTICLE 6 · CHANGES TO THESE TERMS" } },
  { type: "div", props: { style: { marginTop: 12, color: design.ink, fontSize: design.clauseSize - 1, lineHeight: 1.25 }, children: card.changesClause } },
  { type: "div", props: { style: { marginTop: "auto", paddingTop: 18, borderTop: "1px solid #373737", color: design.muted, fontSize: design.footerSize }, children: "You agreed to this. - " + card.name } },
];

describe("find failing element", () => {
  it("tests each child individually", async () => {
    for (let i = 0; i < children.length; i++) {
      const jsx = { type: "div", props: { style: { width: "100%", height: "100%", display: "flex", background: "#111", padding: 72 }, children: [children[i]] } };
      try {
        await satori(jsx as any, { width: 1200, height: 630, fonts: [font] });
        console.log(`child ${i}: OK`);
      } catch (e: any) {
        console.log(`child ${i}: FAIL - ${e.message.slice(0, 120)}`);
      }
    }
    expect(true).toBe(true);
  });
  it("renders all together", async () => {
    const jsx = { type: "div", props: { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: design.background, padding: design.padding }, children: [{ type: "div", props: { style: { width: design.width - design.padding * 2, height: design.height - design.padding * 2, display: "flex", flexDirection: "column", padding: 54, borderRadius: 24, background: design.card }, children } }] } };
    try {
      const svg = await satori(jsx as any, { width: 1200, height: 630, fonts: [font] });
      console.log("ALL TOGETHER: OK");
      expect(svg).toContain("<svg");
    } catch (e: any) {
      console.log("ALL TOGETHER: FAIL -", e.message.slice(0, 200));
      throw e;
    }
  });
});
