import type { Metadata } from "next";
import ResolutionTool from "@/components/resolution-tool";
import { LanguageSwitch } from "@/components/lang-switch";
import { jaStrings } from "@/lib/i18n-strings";

export const metadata: Metadata = {
  title: "今日の解像度ガチャ",
  description: "決定論的な今日の解像度カードをPNGで共有します。",
  openGraph: {
    locale: "ja_JP",
    title: "今日の解像度ガチャ",
    description: "決定論的な今日の解像度カード。",
    images: [{ url: "/resolution/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "今日の解像度ガチャ",
    description: "決定論的な今日の解像度カード。",
    images: ["/resolution/opengraph-image.png"],
  },
  alternates: {
    languages: {
      en: "https://personal-tos.sunnydachs.workers.dev/resolution",
      ja: "https://personal-tos.sunnydachs.workers.dev/ja/resolution",
      "x-default": "https://personal-tos.sunnydachs.workers.dev/resolution",
    },
  },
};

export default function JapaneseResolutionPage() {
  return (
    <>
      <LanguageSwitch lang="ja" pathname="/ja/resolution" />
      <ResolutionTool lang="ja" strings={jaStrings.resolution} />
    </>
  );
}
