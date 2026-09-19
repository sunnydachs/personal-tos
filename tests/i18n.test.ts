import { describe, expect, it } from "vitest";
import { formatTemplate, getOtherLangUrl } from "../lib/i18n";

describe("formatTemplate", () => {
  it("interpolates string and number values", () => {
    expect(formatTemplate("Read {percent}% as {reader}", { percent: 75, reader: "Mika" }))
      .toBe("Read 75% as Mika");
  });

  it("leaves missing keys unchanged", () => {
    expect(formatTemplate("Hello {name}, see {date}", { name: "Mika" }))
      .toBe("Hello Mika, see {date}");
  });

  it("replaces every occurrence of a placeholder", () => {
    expect(formatTemplate("{state}: {state}", { state: "FullHD" }))
      .toBe("FullHD: FullHD");
  });
});

describe("getOtherLangUrl", () => {
  it("maps home and nested routes in both directions", () => {
    expect(getOtherLangUrl("/", "", "ja")).toBe(
      "https://personal-tos.sunnydachs.workers.dev/ja",
    );
    expect(getOtherLangUrl("/ja", "", "en")).toBe(
      "https://personal-tos.sunnydachs.workers.dev/",
    );
    expect(getOtherLangUrl("/resolution", "", "ja")).toBe(
      "https://personal-tos.sunnydachs.workers.dev/ja/resolution",
    );
    expect(getOtherLangUrl("/ja/status", "", "en")).toBe(
      "https://personal-tos.sunnydachs.workers.dev/status",
    );
  });

  it("preserves query state", () => {
    expect(getOtherLangUrl("/resolution", "?n=Mika&s=daily", "ja")).toBe(
      "https://personal-tos.sunnydachs.workers.dev/ja/resolution?n=Mika&s=daily",
    );
    expect(getOtherLangUrl("/ja/substitute", "n=Mika&s=daily", "en")).toBe(
      "https://personal-tos.sunnydachs.workers.dev/substitute?n=Mika&s=daily",
    );
  });
});
