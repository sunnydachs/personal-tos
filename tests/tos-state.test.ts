import { describe, expect, it } from "vitest";
import { encodeState, parseState } from "../lib/tos-state";

describe("generator state codec", () => {
  it("round-trips a compact reversible query string", () => {
    const query = encodeState("Mika", ["late_night", "lunch", "plan_cancel"]);
    expect(query).toBe("n=Mika&t=iQ&v=vbeb39");
    expect(parseState(`?${query}`)).toEqual({
      name: "Mika",
      traitIds: ["late_night", "lunch", "plan_cancel"],
    });
  });

  it("defaults an empty name to Anonymous", () => {
    const query = encodeState("  ", []);
    expect(parseState(query)).toEqual({ name: "Anonymous", traitIds: [] });
  });

  it("returns null for malformed or inconsistent state", () => {
    expect(parseState("not a query")).toBeNull();
    expect(parseState("?n=Mika&t=%%%&v=v00000")).toBeNull();
    expect(parseState("?n=Mika&t=CQgB&v=v00000")).toBeNull();
  });
});
