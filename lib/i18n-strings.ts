import type { TosStrings } from "@/components/tos-generator";
import type { Lang } from "@/lib/i18n";

export type ResolutionStrings = GachaStrings & {
  states: Record<ResolutionStateId, string>;
  stateDescription: Record<ResolutionStateId, string>;
  share: string;
};

export type SubstituteStrings = GachaStrings & {
  characters: Record<SubstituteCharacterId, string>;
  characterDescriptions: Record<SubstituteCharacterId, string>;
  defenseLabel: string;
  share: string;
};

export type StatusStrings = {
  eyebrow: string;
  title: string;
  pitch: string;
  nameLabel: string;
  namePlaceholder: string;
  seedLabel: string;
  seedPlaceholder: string;
  action: string;
  downloadPng: string;
  copyLink: string;
  pngDownloaded: string;
  linkCopied: string;
  clipboardBlocked: string;
  statLabels: Record<"hp" | "mp" | "motivation" | "limit", string>;
  statDescriptions: Record<"hp" | "mp" | "motivation" | "limit", string>;
  verdictOperational: string;
  verdictCritical: string;
  verdictCapacity: string;
  verdictStandard: string;
  share: string;
};

export type ResolutionStateId = "4K" | "FullHD" | "720p" | "144p" | "PixelArt";
export type SubstituteCharacterId =
  | "chihuahua"
  | "tanuki"
  | "intern"
  | "ghost"
  | "senior"
  | "meeting";

export type { Lang } from "@/lib/i18n";

type GachaStrings = {
  eyebrow: string;
  title: string;
  pitch: string;
  nameLabel: string;
  namePlaceholder: string;
  seedLabel: string;
  seedPlaceholder: string;
  action: string;
  downloadPng: string;
  copyLink: string;
  pngDownloaded: string;
  linkCopied: string;
  clipboardBlocked: string;
  resetNote: string;
  empty: string;
  cardEyebrow: string;
  cardDate: string;
  share?: string;
};

export type AppStrings = {
  en: {
    tos: TosStrings;
    tosLove: TosStrings;
    resolution: ResolutionStrings;
    substitute: SubstituteStrings;
    status: StatusStrings;
  };
  ja: {
    tos: TosStrings;
    tosLove: TosStrings;
    resolution: ResolutionStrings;
    substitute: SubstituteStrings;
    status: StatusStrings;
  };
};

const enTos: TosStrings = {
  eyebrow: "PERSONAL TERMS / LEGAL NOTICE",
  setupEyebrow: "PERSONAL TERMS / LEGAL NOTICE",
  title: "Terms & Conditions",
  titleEm: "of Being Me",
  lead: "A suspiciously official document for handling the person you already are.",
  nameLabel: "Name or handle",
  namePlaceholder: "e.g. Mika",
  traitTitle: "Choose your handling conditions",
  selectedCount: "{count} / 8 selected",
  setupNote: "The more boxes you check, the stricter your terms become.",
  continueLabel: "Continue to Terms",
  termsEyebrow: "PERSONAL TERMS / LEGAL NOTICE",
  termsTitle: "Terms & Conditions of Being Me",
  effective: "Effective: the day you met me",
  documentId: "Document ID / ME-{version}",
  signoff: "End of terms · no exceptions were reviewed.",
  progressLabel: "You have read {percent}%",
  finePrint: "By proceeding, you accept all clauses, including the ones you skipped.",
  agreeLabel: "I Agree",
  readProgress: "You've read {percent}%",
  resultEyebrow: "PERSONAL TERMS / FINAL CARD",
  resultKicker: "A shareable document for your personal operating conditions.",
  article3: "Handling Precautions",
  article6: "Changes to These Terms",
  resultFooter: "You agreed to this. - {name}",
  downloadPng: "Download PNG",
  copyImage: "Copy image",
  copyLink: "Copy link",
  editTerms: "Edit terms",
  randomTerms: "See a random person's terms",
  rendering: "Rendering your terms...",
  resultClue: "Article 6: These terms may be updated at any time without notice.",
  pngDownloaded: "PNG downloaded.",
  imageCopied: "Image copied to clipboard.",
  linkCopied: "Share link copied.",
  exportFailed: "Export failed. Please try again.",
  clipboardBlocked: "Clipboard access was blocked.",
  footer: "Personal ToS · Your personal handling guide",
};

const enTosLove: TosStrings = {
  ...enTos,
  setupEyebrow: "PERSONAL TERMS / WITH LOVE",
  title: "Instruction Manual",
  lead:
    "A warm, slightly clingy guide for the people who take care of me. Handle with love.",
  traitTitle: "Choose what I need from you",
  continueLabel: "Read my manual →",
  termsEyebrow: "PERSONAL TERMS / WITH LOVE",
  termsTitle: "Instruction Manual of Being Me",
  finePrint:
    "By promising, you accept all requests, including the ones you skipped.",
  agreeLabel: "I promise →",
  resultEyebrow: "PERSONAL TERMS / WITH LOVE",
  resultKicker:
    "You promised to take care of me. Even though I'm like this.",
  resultClue: "Article 5: I come with a lifetime guarantee.",
  resultFooter: "You promised. - {name}",
};

const jaTos: TosStrings = {
  eyebrow: "PERSONAL TERMS / 法的Notice",
  setupEyebrow: "PERSONAL TERMS / 法的Notice",
  title: "私の利用規約",
  titleEm: "を作成する",
  lead: "すでに存在するあなたを適切に取り扱うための、疑わしくも公式な文書。",
  nameLabel: "名前（ハンドル名）",
  namePlaceholder: "例: みか",
  traitTitle: "あなたの取扱条件を選ぶ",
  selectedCount: "{count} / 8 選択中",
  setupNote: "チェックを増やすほど規約は厳しくなります。",
  continueLabel: "規約を読む",
  termsEyebrow: "PERSONAL TERMS / 法的Notice",
  termsTitle: "私の利用規約",
  effective: "発効日: あなたが私に会った日",
  documentId: "文書ID / ME-{version}",
  signoff: "規約終了 · 例外条項は確認されていません。",
  progressLabel: "規約の {percent}% を読みました",
  finePrint: "先へ進むと、読み飛ばした条項を含むすべてに同意したものとみなされます。",
  agreeLabel: "同意する",
  readProgress: "規約の {percent}% を読みました",
  resultEyebrow: "PERSONAL TERMS / 完成カード",
  resultKicker: "あなたの取扱条件を共有できる最終カード。",
  article3: "取扱注意",
  article6: "変更",
  resultFooter: "あなたはこれに同意しました。 - {name}",
  downloadPng: "PNGを保存",
  copyImage: "画像をコピー",
  copyLink: "リンクをコピー",
  editTerms: "規約を編集",
  randomTerms: "ランダムな誰かの規約を見る",
  rendering: "規約をレンダリング中...",
  resultClue: "第6条: 本規約は予告なく随時更新されます。",
  pngDownloaded: "PNGを保存しました。",
  imageCopied: "画像をコピーしました。",
  linkCopied: "共有リンクをコピーしました。",
  exportFailed: "保存に失敗しました。もう一度お試しください。",
  clipboardBlocked: "クリップボードへのアクセスが拒否されました。",
  footer: "Personal ToS · あなたの取り扱い説明書",
};

const jaTosLove: TosStrings = {
  ...jaTos,
  setupEyebrow: "PERSONAL TERMS / 恋愛モード",
  title: "私の取扱説明書",
  titleEm: "（恋愛編）",
  lead:
    "私の世話をしてくれるあなたへ。少し甘えん坊の、あったかいお願い。愛を持って扱ってね。",
  traitTitle: "私にしてほしいことを選ぶ",
  continueLabel: "マニュアルを読む →",
  termsEyebrow: "PERSONAL TERMS / 恋愛モード",
  termsTitle: "私の取扱説明書（恋愛編）",
  finePrint:
    "約束すると、読み飛ばしたお願いを含むすべてに同意したものとみなされます。",
  agreeLabel: "約束する →",
  resultEyebrow: "PERSONAL TERMS / 恋愛モード",
  resultKicker:
    "こんな私だけど、大切にしてくれるって約束してくれた。",
  resultClue: "第5条: 私には永久保証が付いてる。",
  resultFooter: "約束したね。 - {name}",
};

const enResolution: ResolutionStrings = {
  eyebrow: "DAILY GACHA / ZERO RUNTIME AI",
  title: "Today's Resolution Gacha",
  pitch: "One deterministic roll. One finished card. No rerolls until tomorrow.",
  nameLabel: "Name or handle",
  namePlaceholder: "e.g. Mika",
  seedLabel: "Personal seed",
  seedPlaceholder: "daily",
  action: "Check today's resolution",
  downloadPng: "Download PNG",
  copyLink: "Copy link",
  pngDownloaded: "PNG downloaded.",
  linkCopied: "Share link copied.",
  clipboardBlocked: "Clipboard access was blocked.",
  resetNote: "Come back tomorrow — resolution resets at midnight UTC",
  empty: "Your result will appear here after the first roll.",
  cardEyebrow: "RESOLUTION OF",
  cardDate: "Resolution of {date}",
  share: "Today I'm rendering at {state}. Check yours.",
  states: {
    "4K": "4K",
    FullHD: "Full HD",
    "720p": "720p",
    "144p": "144p",
    PixelArt: "Pixel Art",
  },
  stateDescription: {
    "4K": "Painfully sharp. Every pore, every regret, visible in full clarity.",
    FullHD: "Clear enough. Standard human resolution.",
    "720p": "Slightly soft. Details are still loading.",
    "144p": "Mosaic-level. You are legally a blur today.",
    PixelArt: "Rendered at 16×16. Nostalgic, but unreadable.",
  },
};

const jaResolution: ResolutionStrings = {
  eyebrow: "DAILY GACHA / ZERO RUNTIME AI",
  title: "今日の解像度ガチャ",
  pitch: "決定論的な1回ガチャ。完成されたカード。明日までリロードなし。",
  nameLabel: "名前（ハンドル名）",
  namePlaceholder: "例: みか",
  seedLabel: "個人シード",
  seedPlaceholder: "daily",
  action: "今日の解像度をチェック",
  downloadPng: "PNGを保存",
  copyLink: "リンクをコピー",
  pngDownloaded: "PNGを保存しました。",
  linkCopied: "共有リンクをコピーしました。",
  clipboardBlocked: "クリップボードへのアクセスが拒否されました。",
  resetNote: "明日までリロードなし。",
  empty: "最初のガチャ後に結果がここに表示されます。",
  cardEyebrow: "解像度",
  cardDate: "{date} の解像度",
  share: "今日の私は {state} でレンダリング中。あなたもチェック。",
  states: {
    "4K": "4K",
    FullHD: "FullHD",
    "720p": "720p",
    "144p": "144p",
    PixelArt: "PixelArt",
  },
  stateDescription: {
    "4K": "痛いほど解像度が高い。毛穴も後悔もすべて露わになる。",
    FullHD: "十分にクリア。標準的な人間の解像度。",
    "720p": "やや柔らかい。詳細はまだ読み込み中。",
    "144p": "モザイクレベル。今日の私はほぼぼやし。",
    PixelArt: "ドット絵。レトロだが判読不能。",
  },
};

const enSubstitute: SubstituteStrings = {
  eyebrow: "DAILY GACHA / ZERO RUNTIME AI",
  title: "Take The Blame For Me Gacha",
  pitch: "Summon a programmatically illustrated substitute for tomorrow's incident.",
  nameLabel: "Name or handle",
  namePlaceholder: "e.g. Mika",
  seedLabel: "Personal seed",
  seedPlaceholder: "daily",
  action: "Summon my substitute",
  downloadPng: "Download PNG",
  copyLink: "Copy link",
  pngDownloaded: "PNG downloaded.",
  linkCopied: "Share link copied.",
  clipboardBlocked: "Clipboard access was blocked.",
  resetNote: "Come back tomorrow — substitute resets at midnight UTC",
  empty: "Your substitute will appear here after the first summon.",
  cardEyebrow: "SUBSTITUTE OF",
  cardDate: "Substitute of {date}",
  share: "My substitute for tomorrow: {character}. Summon yours.",
  characters: {
    chihuahua: "The Unbreakable Chihuahua",
    tanuki: "The Apology Specialist Tanuki",
    intern: "The Friday ExcuseIntern",
    ghost: "The Time-Loss Ghost",
    senior: "The Senior Excuser",
    meeting: "The Mandatory Meeting",
  },
  characterDescriptions: {
    chihuahua: "Small, loud, and immune to unreasonable criticism.",
    tanuki: "Bows at 45 degrees, has never once meant it.",
    intern: "Fresh, eager, and disposable. Takes all Friday blame.",
    ghost: "Was not technically present during the incident.",
    senior: "20 years of experience saying 'that's on me' for things that weren't.",
    meeting: "Blame cannot reach you inside a meeting that could've been an email.",
  },
  defenseLabel: "Blame deflection rate",
};

const jaSubstitute: SubstituteStrings = {
  eyebrow: "DAILY GACHA / ZERO RUNTIME AI",
  title: "身代わりガチャ",
  pitch: "明日の怒られを、代わりに引き受けてくれる誰かを召喚。",
  nameLabel: "名前（ハンドル名）",
  namePlaceholder: "例: みか",
  seedLabel: "個人シード",
  seedPlaceholder: "daily",
  action: "身代わりを召喚",
  downloadPng: "PNGを保存",
  copyLink: "リンクをコピー",
  pngDownloaded: "PNGを保存しました。",
  linkCopied: "共有リンクをコピーしました。",
  clipboardBlocked: "クリップボードへのアクセスが拒否されました。",
  resetNote: "明日までリロードなし。",
  empty: "最初の召喚後に身代わりがここに表示されます。",
  cardEyebrow: "身代わり",
  cardDate: "{date} の身代わり",
  share: "明日の私の身代わり: {character}。あなたも召喚。",
  characters: {
    chihuahua: "打たれ強いチワワ 🐕",
    tanuki: "謝罪のプロのタヌキ 🦝",
    intern: "金曜日の言い訳インターン 🧑‍💻",
    ghost: "時間ロスの幽霊 👻",
    senior: "ベテラン言い訳係 🧓",
    meeting: "強制会議そのもの 📋",
  },
  characterDescriptions: {
    chihuahua: "小さくてうるさいが、理不尽には無敵。",
    tanuki: "45度のお辞儀、一度も本心から謝ったことがない。",
    intern: "新鮮で意欲的で使い捨て。金曜の怒られを全部引き受ける。",
    ghost: "過失の瞬間、技術的には不在だった。",
    senior: "'それは私のせいです' の歴20年。実際は違ったことが一度もない。",
    meeting: "電会議だったはずの会議の中では怒られは届かない。",
  },
  defenseLabel: "身代わり率",
};

const enStatus: StatusStrings = {
  eyebrow: "MODERN HUMAN / STATUS SCREEN",
  title: "Modern Human Status Screen",
  pitch: "Set four values. Render the exact state you are in today.",
  nameLabel: "Name or handle",
  namePlaceholder: "e.g. Mika",
  seedLabel: "Personal seed",
  seedPlaceholder: "daily",
  action: "Render my status",
  downloadPng: "Download PNG",
  copyLink: "Copy link",
  pngDownloaded: "PNG downloaded.",
  linkCopied: "Share link copied.",
  clipboardBlocked: "Clipboard access was blocked.",
  statLabels: { hp: "HP", mp: "MP", motivation: "MOT", limit: "LIM" },
  statDescriptions: { hp: "Physical", mp: "Mental", motivation: "Motivation", limit: "Limit Gauge" },
  verdictOperational: "Fully operational. Suspiciously healthy.",
  verdictCritical: "Critical state. Do not schedule anything.",
  verdictCapacity: "Approaching capacity. Step away from the inbox.",
  verdictStandard: "Standard modern human state.",
  share: "My status: HP {hp} / MP {mp} / MOT {mot} / LIM {lim}. Render yours.",
};

const jaStatus: StatusStrings = {
  eyebrow: "MODERN HUMAN / STATUS SCREEN",
  title: "現代人ステータス画面",
  pitch: "4つの値を設定。今日のあなたの正確な状態をレンダリング。",
  nameLabel: "名前（ハンドル名）",
  namePlaceholder: "例: みか",
  seedLabel: "個人シード",
  seedPlaceholder: "daily",
  action: "ステータスを表示",
  downloadPng: "PNGを保存",
  copyLink: "リンクをコピー",
  pngDownloaded: "PNGを保存しました。",
  linkCopied: "共有リンクをコピーしました。",
  clipboardBlocked: "クリップボードへのアクセスが拒否されました。",
  statLabels: { hp: "HP", mp: "MP", motivation: "MOT", limit: "LIM" },
  statDescriptions: { hp: "体力", mp: "メンタル", motivation: "意欲", limit: "限界ゲージ" },
  verdictOperational: "全システム正常稼働。不自然なくらい健康。",
  verdictCritical: "危険状態。何も予定するな。",
  verdictCapacity: "容量に接近中。受信箱から離れろ。",
  verdictStandard: "標準的な現代人の状態。",
  share: "私のステータス: 体力 {hp} / メンタル {mp} / 意欲 {mot} / 限界 {lim}。あなたも表示。",
};

export const enStrings = {
  tos: enTos,
  tosLove: enTosLove,
  resolution: enResolution,
  substitute: enSubstitute,
  status: enStatus,
};

export const jaStrings = {
  tos: jaTos,
  tosLove: jaTosLove,
  resolution: jaResolution,
  substitute: jaSubstitute,
  status: jaStatus,
};

export const stringsByLang = { en: enStrings, ja: jaStrings } as const;
