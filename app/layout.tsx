import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://personal-tos.sunnydachs.workers.dev"),
  title: "Terms & Conditions of Being Me (Personal ToS Generator)",
  description: "Generate a shareable, suspiciously official set of terms for being you.",
  openGraph: {
    title: "Terms & Conditions of Being Me",
    description: "A personal terms generator for the person who skips the fine print.",
    type: "website",
    images: [
      {
        url: "/card/default.png",
        width: 1200,
        height: 630,
        alt: "Terms and Conditions of Being Me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions of Being Me",
    description: "A personal terms generator for the person who skips the fine print.",
    images: ["/card/default.png"],
  },
};

const TOOL_LINKS = [
  { href: "/", jaHref: "/ja", en: "Terms & Conditions", ja: "利用規約" },
  { href: "/resolution", jaHref: "/ja/resolution", en: "Resolution Gacha", ja: "解像度ガチャ" },
  { href: "/substitute", jaHref: "/ja/substitute", en: "Substitute Gacha", ja: "身代わりガチャ" },
  { href: "/status", jaHref: "/ja/status", en: "Status Screen", ja: "ステータス画面" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <nav className="site-tools" aria-label="Tools">
          {TOOL_LINKS.map((tool) => (
            <span key={tool.href} className="site-tools-item">
              <a href={tool.href}>{tool.en}</a>
              <a href={tool.jaHref} lang="ja">{tool.ja}</a>
            </span>
          ))}
        </nav>
      </body>
    </html>
  );
}
