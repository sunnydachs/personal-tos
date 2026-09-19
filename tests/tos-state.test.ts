import { describe, expect, it } from "vitest";
import { encodeState, getVersion, parseState } from "../lib/tos-state";

describe("generator state codec", () => {
  it("round-trips a compact reversible query string", () => {
    const query = encodeState("Mika", ["late_night", "lunch", "plan_cancel"]);
    expect(query).toBe("n=Mika&t=iQ&v=v56042");
    expect(parseState(`?${query}`)).toEqual({
      name: "Mika",
      traitIds: ["late_night", "lunch", "plan_cancel"],
      tone: "corporate",
    });
  });

  it("round-trips love tone and includes it in the version", () => {
    const query = encodeState("Taro", ["late_night", "lunch"], "love");
    expect(query).toContain("&m=love");
    expect(parseState(`?${query}`)).toEqual({
      name: "Taro",
      traitIds: ["late_night", "lunch"],
      tone: "love",
    });
    expect(getVersion("Taro", ["late_night", "lunch"], "love")).not.toBe(
      getVersion("Taro", ["late_night", "lunch"], "corporate"),
    );
  });

  it("defaults an empty name to Anonymous", () => {
    const query = encodeState("  ", []);
    expect(parseState(query)).toEqual({ name: "Anonymous", traitIds: [], tone: "corporate" });
  });

  it("returns null for malformed or inconsistent state", () => {
    expect(parseState("not a query")).toBeNull();
    expect(parseState("?n=Mika&t=%%%&v=v00000")).toBeNull();
    expect(parseState("?n=Mika&t=CQgB&v=v00000")).toBeNull();
  });
});
