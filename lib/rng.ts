function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function seededRandom(dayString: string, userSeed: string) {
  const seed = hashString(`${dayString}|${userSeed}`);
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let result = state;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function weightedChoice<T>(
  entries: ReadonlyArray<{ value: T; weight: number }>,
  random: () => number,
) {
  const totalWeight = entries.reduce((total, entry) => total + entry.weight, 0);
  let cursor = random() * totalWeight;

  for (const entry of entries) {
    cursor -= entry.weight;
    if (cursor < 0) {
      return entry.value;
    }
  }

  return entries[entries.length - 1]?.value;
}
