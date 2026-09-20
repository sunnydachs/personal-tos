export const resolutionStates = [
  {
    id: "4K",
    label: "4K",
    weight: 10,
    description: "Painfully sharp. Every pore, every regret, visible in full clarity.",
  },
  {
    id: "FullHD",
    label: "Full HD",
    weight: 30,
    description: "Clear enough. Standard human resolution.",
  },
  {
    id: "720p",
    label: "720p",
    weight: 30,
    description: "Slightly soft. Details are still loading.",
  },
  {
    id: "144p",
    label: "144p",
    weight: 20,
    description: "Mosaic-level. You are legally a blur today.",
  },
  {
    id: "PixelArt",
    label: "Pixel Art",
    weight: 10,
    description: "Rendered at 16×16. Nostalgic, but unreadable.",
  },
] as const;

export const substituteCharacters = [
  {
    id: "chihuahua",
    label: "The Unbreakable Chihuahua",
    symbol: "🐕",
    icon: "/icons/char-chihuahua.png",
    description: "Small, loud, and immune to unreasonable criticism.",
  },
  {
    id: "tanuki",
    label: "The Apology Specialist Tanuki",
    symbol: "🦝",
    icon: "/icons/char-tanuki.png",
    description: "Bows at 45 degrees, has never once meant it.",
  },
  {
    id: "intern",
    label: "The Friday ExcuseIntern",
    symbol: "🧑‍💻",
    icon: "/icons/char-intern.png",
    description: "Fresh, eager, and disposable. Takes all Friday blame.",
  },
  {
    id: "ghost",
    label: "The Time-Loss Ghost",
    symbol: "👻",
    icon: "/icons/char-ghost.png",
    description: "Was not technically present during the incident.",
  },
  {
    id: "senior",
    label: "The Senior Excuser",
    symbol: "🧓",
    icon: "/icons/char-senior.png",
    description: "20 years of experience saying 'that's on me' for things that weren't.",
  },
  {
    id: "meeting",
    label: "The Mandatory Meeting",
    symbol: "📋",
    icon: "/icons/char-meeting.png",
    description: "Blame cannot reach you inside a meeting that could've been an email.",
  },
] as const;

export const resolutionShareLine = (state: (typeof resolutionStates)[number]["label"]) =>
  `Today I'm rendering at ${state}. Check yours.`;

export const substituteShareLine = (
  character: (typeof substituteCharacters)[number]["label"],
) => `My substitute for tomorrow: ${character}. Summon yours.`;

export const statusShareLine = (stats: { hp: number; mp: number; motivation: number; limit: number }) =>
  `My status: HP ${stats.hp} / MP ${stats.mp} / MOT ${stats.motivation} / LIM ${stats.limit}. Render yours.`;

export function getStatusVerdict(stats: { hp: number; mp: number; motivation: number; limit: number }) {
  if (
    stats.hp > 60
    && stats.mp > 60
    && stats.motivation > 60
    && stats.limit > 60
  ) {
    return "Fully operational. Suspiciously healthy.";
  }

  if (stats.hp < 30 || stats.mp < 30) {
    return "Critical state. Do not schedule anything.";
  }

  if (stats.limit > 80) {
    return "Approaching capacity. Step away from the inbox.";
  }

  return "Standard modern human state.";
}

export type StatusVerdictId = "operational" | "standard" | "capacity" | "critical";

export function getStatusVerdictId(stats: { hp: number; mp: number; motivation: number; limit: number }): StatusVerdictId {
  if (
    stats.hp > 60
    && stats.mp > 60
    && stats.motivation > 60
    && stats.limit > 60
  ) {
    return "operational";
  }

  if (stats.hp < 30 || stats.mp < 30) {
    return "critical";
  }

  if (stats.limit > 80) {
    return "capacity";
  }

  return "standard";
}

export const statusVerdictIcons: Record<StatusVerdictId, string> = {
  operational: "/icons/verdict-operational.png",
  standard: "/icons/verdict-standard.png",
  capacity: "/icons/verdict-capacity.png",
  critical: "/icons/verdict-critical.png",
};

export const statusStatIcons: Record<"hp" | "mp" | "motivation" | "limit", string> = {
  hp: "/icons/stat-hp.png",
  mp: "/icons/stat-mp.png",
  motivation: "/icons/stat-mot.png",
  limit: "/icons/stat-lim.png",
};

export const resolutionIcons: Record<(typeof resolutionStates)[number]["id"], string> = {
  "4K": "/icons/res-4k.png",
  FullHD: "/icons/res-fullhd.png",
  "720p": "/icons/res-720p.png",
  "144p": "/icons/res-144p.png",
  PixelArt: "/icons/res-pixelart.png",
};
