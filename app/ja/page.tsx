import type { Metadata } from "next";
import { TosGenerator } from "@/components/tos-generator";
import { LanguageSwitch } from "@/components/lang-switch";
import { jaStrings } from "@/lib/i18n-strings";

export const metadata: Metadata = {
  title: "私の利用規約（Personal ToS Generator）",
  description: "共有できる、少し怪しい公式風のあなた専用利用規約を作成します。",
  openGraph: {
    locale: "ja_JP",
    title: "私の利用規約",
    description: "あなたのための個人利用規約ジェネレーター。",
    images: [{ url: "/card/default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "私の利用規約",
    description: "あなたのための個人利用規約ジェネレーター。",
    images: ["/card/default.png"],
  },
  alternates: {
    languages: {
      en: "https://personal-tos.sunnydachs.workers.dev/",
      ja: "https://personal-tos.sunnydachs.workers.dev/ja",
      "x-default": "https://personal-tos.sunnydachs.workers.dev/",
    },
  },
};

export default function JapaneseHomePage() {
  return (
    <>
      <LanguageSwitch lang="ja" pathname="/ja" />
      <TosGenerator lang="ja" strings={jaStrings.tos} stringsLove={jaStrings.tosLove} />
    </>
  );
}
