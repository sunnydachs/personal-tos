import type { Metadata } from "next";
import { TosGenerator } from "@/components/tos-generator";
import { LanguageSwitch } from "@/components/lang-switch";
import { enStrings } from "@/lib/i18n-strings";

export const metadata: Metadata = {
  title: "Terms & Conditions of Being Me (Personal ToS Generator)",
  description: "Generate a shareable, suspiciously official set of terms for being you.",
  openGraph: {
    locale: "en_US",
    title: "Terms & Conditions of Being Me",
    description: "A personal terms generator for the person who skips the fine print.",
    images: [{ url: "/card/default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions of Being Me",
    description: "A personal terms generator for the person who skips the fine print.",
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

export default function HomePage() {
  return (
    <>
      <LanguageSwitch lang="en" pathname="/" />
      <TosGenerator lang="en" strings={enStrings.tos} stringsLove={enStrings.tosLove} />
    </>
  );
}
