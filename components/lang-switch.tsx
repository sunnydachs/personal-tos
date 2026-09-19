"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getOtherLangUrl, getPersistedLang, persistLang, type Lang } from "@/lib/i18n";

type LanguageSwitchProps = {
  lang: Lang;
  pathname: string;
  search?: string;
};

export function LanguageSwitch({ lang, pathname, search = "" }: LanguageSwitchProps) {
  const target = lang === "en" ? "ja" : "en";
  const href = getOtherLangUrl(pathname, search, target).replace(
    /^https:\/\/[^/]+/,
    "",
  );

  return (
    <nav className="language-switch" aria-label="Language">
      <Link href={href} onClick={() => persistLang(target)}>
        {target === "ja" ? "日本語" : "English"}
      </Link>
    </nav>
  );
}

export function usePreferredLanguage(defaultLang: Lang) {
  const [preferredLang, setPreferredLang] = useState<Lang | null>(null);

  useEffect(() => {
    setPreferredLang(getPersistedLang());
  }, []);

  return preferredLang;
}
