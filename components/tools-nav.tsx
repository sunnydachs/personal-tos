"use client";

import { useEffect, useState } from "react";

const TOOL_LINKS = [
  { href: "/", icon: "📋", en: "Terms & Conditions", ja: "利用規約" },
  { href: "/resolution", icon: "📷", en: "Resolution Gacha", ja: "解像度ガチャ" },
  { href: "/substitute", icon: "🎲", en: "Substitute Gacha", ja: "身代わりガチャ" },
  { href: "/status", icon: "📊", en: "Status Screen", ja: "ステータス画面" },
];

function isJaPath(pathname: string) {
  return pathname === "/ja" || pathname.startsWith("/ja/");
}

export function ToolsNav() {
  const [lang, setLang] = useState<"en" | "ja">("en");

  useEffect(() => {
    setLang(isJaPath(window.location.pathname) ? "ja" : "en");
  }, []);

  return (
    <nav className="site-tools" aria-label="Tools">
      {TOOL_LINKS.map((tool) => {
        const href = lang === "ja" ? `/ja${tool.href === "/" ? "" : tool.href}` : tool.href;
        const label = lang === "ja" ? tool.ja : tool.en;
        return (
          <a key={tool.href} href={href} className="site-tools-chip">
            <span className="site-tools-icon" aria-hidden="true">{tool.icon}</span>
            <span>{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
