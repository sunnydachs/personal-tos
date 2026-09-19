import type { Metadata } from "next";
import SubstituteTool from "@/components/substitute-tool";
import { LanguageSwitch } from "@/components/lang-switch";
import { jaStrings } from "@/lib/i18n-strings";

export const metadata: Metadata = {
  title: "身代わりガチャ",
  description: "決定論的な今日の身代わりを召喚して共有します。",
  openGraph: {
    locale: "ja_JP",
    title: "身代わりガチャ",
    description: "決定論的な今日の身代わりカード。",
    images: [{ url: "/substitute/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "身代わりガチャ",
    description: "決定論的な今日の身代わりカード。",
    images: ["/substitute/opengraph-image.png"],
  },
  alternates: {
    languages: {
      en: "https://personal-tos.sunnydachs.workers.dev/substitute",
      ja: "https://personal-tos.sunnydachs.workers.dev/ja/substitute",
      "x-default": "https://personal-tos.sunnydachs.workers.dev/substitute",
    },
  },
};

export default function JapaneseSubstitutePage() {
  return (
    <>
      <LanguageSwitch lang="ja" pathname="/ja/substitute" />
      <SubstituteTool lang="ja" strings={jaStrings.substitute} />
    </>
  );
}
