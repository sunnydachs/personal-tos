import { traitIds, type TraitId } from "./tos-content";

export type { TraitId } from "./tos-content";

export type GeneratorState = {
  name: string;
  traitIds: TraitId[];
};

const DEFAULT_NAME = "Anonymous";
const TRAIT_MASK = (1 << traitIds.length) - 1;

function normalizeName(name: string) {
  const trimmedName = name.trim();
  return trimmedName || DEFAULT_NAME;
}

function hashString(value: string) {
  let hash = 5381;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return hash >>> 0;
}

export function getVersion(name: string, traitIdsToHash: TraitId[]) {
  const mask = getTraitMask(traitIdsToHash);
  const hash = hashString(`${normalizeName(name)}|${mask}`);
  return `v${hash.toString(16).slice(0, 5)}`;
}

export function getTraitMask(selectedTraitIds: TraitId[]) {
  return selectedTraitIds.reduce((mask, traitId) => {
    const index = traitIds.indexOf(traitId);
    return index === -1 ? mask : mask | (1 << index);
  }, 0);
}

function maskToBase64Url(mask: number) {
  const bytes = new Uint8Array(1);
  bytes[0] = mask;
  return Buffer.from(bytes).toString("base64url");
}

function base64UrlToMask(value: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    return null;
  }

  const bytes = Buffer.from(value, "base64url");
  if (bytes.length !== 1) {
    return null;
  }

  const mask = bytes[0];
  return (mask & TRAIT_MASK) === mask ? mask : null;
}

export function encodeState(name: string, selectedTraitIds: TraitId[]) {
  const normalizedTraitIds = selectedTraitIds.filter((traitId) =>
    traitIds.includes(traitId),
  );
  const params = new URLSearchParams();
  params.set("n", normalizeName(name));
  params.set("t", maskToBase64Url(getTraitMask(normalizedTraitIds)));
  params.set("v", getVersion(normalizeName(name), normalizedTraitIds));
  return params.toString();
}

export function parseState(search: string): GeneratorState | null {
  try {
    const params = new URLSearchParams(search);
    const nameValue = params.get("n");
    const traitValue = params.get("t");
    const versionValue = params.get("v");

    if (traitValue === null || !/^[A-Za-z0-9_-]+$/.test(traitValue)) {
      return null;
    }

    const mask = base64UrlToMask(traitValue);
    if (mask === null) {
      return null;
    }

    const selectedTraitIds = traitIds.filter((_, index) => (mask & (1 << index)) !== 0);
    const name = normalizeName(nameValue ?? "");
    const expectedVersion = getVersion(name, selectedTraitIds);

    if (versionValue && versionValue !== expectedVersion) {
      return null;
    }

    return { name, traitIds: selectedTraitIds };
  } catch {
    return null;
  }
}

export function parseCompactState(value: string): GeneratorState | null {
  try {
    if (!/^[A-Za-z0-9_-]+$/.test(value)) {
      return null;
    }

    const bytes = Uint8Array.from(
      atob(value.replace(/-/g, "+").replace(/_/g, "/")),
      (character) => character.charCodeAt(0),
    );
    if (bytes.length < 1) {
      return null;
    }

    const nameLength = bytes[0];
    if (nameLength > bytes.length - 2) {
      return null;
    }

    const name = new TextDecoder().decode(bytes.subarray(1, 1 + nameLength));
    const mask = bytes[1 + nameLength];
    if ((mask & TRAIT_MASK) !== mask) {
      return null;
    }

    const selectedTraitIds = traitIds.filter(
      (_, index) => (mask & (1 << index)) !== 0,
    );
    return { name: normalizeName(name), traitIds: selectedTraitIds };
  } catch {
    return null;
  }
}

export function getDefaultState(): GeneratorState {
  return { name: DEFAULT_NAME, traitIds: [] };
}
