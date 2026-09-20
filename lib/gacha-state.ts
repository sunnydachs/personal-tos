export type GachaState = {
  name: string;
  seed: string;
};

const DEFAULT_NAME = "Anonymous";
const DEFAULT_SEED = "daily";
const STORAGE_KEY = "personal-tos:identity";

function normalizeName(name: string) {
  return name.trim() || DEFAULT_NAME;
}

function normalizeSeed(seed: string) {
  return seed.trim() || DEFAULT_SEED;
}

function encodeBase64Url(value: string) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return atob(padded);
}

export function encodeGachaState(name: string, seed: string) {
  const params = new URLSearchParams();
  params.set("n", normalizeName(name));
  params.set("s", encodeBase64Url(normalizeSeed(seed)));
  return params.toString();
}

export function parseGachaState(search: string): GachaState | null {
  try {
    const params = new URLSearchParams(search);
    const name = params.get("n");
    const seed = params.get("s");
    if (seed === null || !/^[A-Za-z0-9_-]*$/.test(seed)) {
      return null;
    }

    return {
      name: normalizeName(name ?? ""),
      seed: normalizeSeed(decodeBase64Url(seed)),
    };
  } catch {
    return null;
  }
}

export function getDefaultGachaState(): GachaState {
  let name = DEFAULT_NAME;
  let seed = DEFAULT_SEED;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as { name?: string; seed?: string };
      if (parsed.name) name = parsed.name;
      if (parsed.seed) seed = parsed.seed;
    }
  } catch {
    // storage unavailable — defaults
  }
  return { name, seed };
}

export function saveGachaIdentity(name: string, seed: string) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ name: normalizeName(name), seed: normalizeSeed(seed) }),
    );
  } catch {
    // storage unavailable — skip persisting
  }
}
