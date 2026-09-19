import type { Metadata } from "next";
import StatusTool from "@/components/status-tool";
import { LanguageSwitch } from "@/components/lang-switch";
import { jaStrings } from "@/lib/i18n-strings";

export const metadata: Metadata = {
  title: "現代人ステータス画面",
  description: "決定論的な現代人のステータス画面をPNGで共有します。",
  openGraph: {
    locale: "ja_JP",
    title: "現代人ステータス画面",
    description: "決定論的な現代人のステータス画面。",
    images: [{ url: "/status/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "現代人ステータス画面",
    description: "決定論的な現代人のステータス画面。",
    images: ["/status/opengraph-image.png"],
  },
  alternates: {
    languages: {
      en: "https://personal-tos.sunnydachs.workers.dev/status",
      ja: "https://personal-tos.sunnydachs.workers.dev/ja/status",
      "x-default": "https://personal-tos.sunnydachs.workers.dev/status",
    },
  },
};

export default function JapaneseStatusPage() {
  return (
    <>
      <LanguageSwitch lang="ja" pathname="/ja/status" />
      <StatusTool lang="ja" strings={jaStrings.status} />
    </>
  );
}
