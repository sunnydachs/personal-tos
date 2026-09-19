import { describe, expect, it } from "vitest";
import {
  encodeGachaState,
  parseGachaState,
} from "../lib/gacha-state";
import {
  getStatusVerdict,
  resolutionShareLine,
  resolutionStates,
  statusShareLine,
  substituteCharacters,
  substituteShareLine,
} from "../lib/gacha-content";
import { seededRandom, weightedChoice } from "../lib/rng";

describe("gacha seeded random", () => {
  it("returns the same sequence for the same UTC day and seed", () => {
    const first = seededRandom("2026-09-19", "mika");
    const second = seededRandom("2026-09-19", "mika");
    expect(Array.from({ length: 4 }, () => first())).toEqual(
      Array.from({ length: 4 }, () => second()),
    );
  });

  it("changes when the UTC day changes", () => {
    const today = seededRandom("2026-09-19", "mika");
    const tomorrow = seededRandom("2026-09-20", "mika");
    expect(today()).not.toBe(tomorrow());
  });

  it("selects weighted resolution states", () => {
    const state = weightedChoice(
      resolutionStates.map((entry) => ({ value: entry.id, weight: entry.weight })),
      seededRandom("2026-09-19", "mika"),
    );
    expect(resolutionStates.some((entry) => entry.id === state)).toBe(true);
  });
});

describe("gacha content assembly", () => {
  it("keeps the resolution and substitute share lines verbatim", () => {
    expect(resolutionShareLine("Full HD")).toBe(
      "Today I'm rendering at Full HD. Check yours.",
    );
    expect(substituteShareLine("The Unbreakable Chihuahua")).toBe(
      "My substitute for tomorrow: The Unbreakable Chihuahua. Summon yours.",
    );
  });

  it("assembles the status share line and verdict thresholds", () => {
    expect(statusShareLine({ hp: 65, mp: 55, motivation: 45, limit: 35 })).toBe(
      "My status: HP 65 / MP 55 / MOT 45 / LIM 35. Render yours.",
    );
    expect(getStatusVerdict({ hp: 65, mp: 65, motivation: 65, limit: 65 })).toBe(
      "Fully operational. Suspiciously healthy.",
    );
    expect(getStatusVerdict({ hp: 20, mp: 65, motivation: 65, limit: 65 })).toBe(
      "Critical state. Do not schedule anything.",
    );
    expect(getStatusVerdict({ hp: 65, mp: 65, motivation: 50, limit: 90 })).toBe(
      "Approaching capacity. Step away from the inbox.",
    );
  });

  it("contains every required result table entry", () => {
    expect(resolutionStates.map((entry) => entry.id)).toEqual([
      "4K",
      "FullHD",
      "720p",
      "144p",
      "PixelArt",
    ]);
    expect(substituteCharacters).toHaveLength(6);
  });
});

describe("gacha URL state", () => {
  it("round-trips name and seed without Buffer", () => {
    const query = encodeGachaState("Mika", "personal-seed");
    expect(query).toBe("n=Mika&s=cGVyc29uYWwtc2VlZA");
    expect(parseGachaState(`?${query}`)).toEqual({
      name: "Mika",
      seed: "personal-seed",
    });
  });

  it("defaults missing values", () => {
    expect(parseGachaState("?n=%20&s=")).toEqual({
      name: "Anonymous",
      seed: "daily",
    });
  });
});
