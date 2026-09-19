import { describe, expect, it } from "vitest";
import {
  assembleClauses,
  assembleClausesLove,
  assembleResultCardLove,
  assembleResultCard,
  traitClauses,
} from "../lib/tos-content";

describe("clause assembly", () => {
  it("includes every article and only selected trait variants", () => {
    const clauses = assembleClauses("Mika", ["late_night", "lunch"]);
    expect(clauses).toHaveLength(6);
    expect(clauses[2].clauses).toEqual([
      traitClauses.late_night,
      traitClauses.lunch,
    ]);
    expect(clauses.at(-1)?.clauses[0]).toContain("not your fault");
  });

  it("builds the non-scrollable result card from the same variants", () => {
    const card = assembleResultCard("Mika", ["reply_speed"]);
    expect(card.clauses).toEqual([traitClauses.reply_speed]);
    expect(card.changesClause).toContain("Continued interaction");
  });

  it("keeps corporate assembly unchanged and assembles love copy", () => {
    const corporate = assembleClauses("Mika", ["late_night", "lunch"]);
    expect(corporate).toHaveLength(6);
    expect(corporate[0].clauses[0]).toContain("proper handling");

    const love = assembleClausesLove("Mika", ["late_night", "lunch"]);
    expect(love).toHaveLength(6);
    expect(love[0].clauses[0]).toBe(
      "This manual exists so the people who love me can take better care of me. It is a labor of love, not a legal document. (Legally distinct. Probably.)",
    );
    expect(love[2].clauses[0]).toBe(
      "Take me on a trip occasionally, even if it's just one town over. Anniversaries count double.",
    );
    expect(love[4].clauses[0]).toContain("lifetime guarantee");
  });

  it("builds the love result card from the same variants", () => {
    const card = assembleResultCardLove("Mika", ["late_night"]);
    expect(card.clauses[0]).toContain("Take me on a trip");
    expect(card.changesClause).toContain("Continued love");
  });
});
