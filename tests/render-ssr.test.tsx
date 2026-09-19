import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { LanguageSwitch } from "@/components/lang-switch";
import { TosGenerator } from "@/components/tos-generator";
import { enStrings, jaStrings } from "@/lib/i18n-strings";

describe("SSR render", () => {
  it("renders LanguageSwitch en", () => {
    const html = renderToString(<LanguageSwitch lang="en" pathname="/" />);
    expect(html).toContain("日本語");
  });
  it("renders LanguageSwitch ja", () => {
    const html = renderToString(<LanguageSwitch lang="ja" pathname="/ja" />);
    expect(html).toContain("English");
  });
  it("renders TosGenerator en", () => {
    const html = renderToString(<TosGenerator lang="en" strings={enStrings.tos} />);
    expect(html).toContain("Terms");
  });
});
