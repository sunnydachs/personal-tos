import { describe, expect, it } from "vitest";
import {
  assembleClauses,
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
});
