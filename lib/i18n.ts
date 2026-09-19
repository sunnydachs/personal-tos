export type Lang = "en" | "ja";

const LANGUAGE_STORAGE_KEY = "tos-lang";
const BASE_ORIGIN = "https://personal-tos.sunnydachs.workers.dev";

export function formatTemplate(
  template: string,
  vars: Record<string, string | number>,
) {
  return template.replace(/\{([^}]+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  );
}

export function getOtherLangUrl(
  pathname: string,
  search: string,
  target: Lang,
) {
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const englishPath = normalizedPathname === "/ja"
    ? "/"
    : normalizedPathname.startsWith("/ja/")
      ? normalizedPathname.slice("/ja".length)
      : normalizedPathname;
  const targetPath = target === "ja"
    ? englishPath === "/" ? "/ja" : `/ja${englishPath}`
    : englishPath;

  const normalizedSearch = search.startsWith("?") ? search : search ? `?${search}` : "";
  return `${BASE_ORIGIN}${targetPath}${normalizedSearch}`;
}

export function getPersistedLang(): Lang | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return value === "en" || value === "ja" ? value : null;
}

export function getSiteInternalUrl(pathname: string, lang: Lang) {
  if (typeof window === "undefined") return pathname;
  if (getPersistedLang() !== "ja") return pathname;
  if (pathname === "/") return "/ja";
  if (pathname.startsWith("/ja/")) return pathname;
  return `/ja${pathname}`;
}

export function persistLang(lang: Lang) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}
