export const traitIds = [
  "late_night",
  "praise_boost",
  "reply_speed",
  "lunch",
  "event_sleep",
  "topic_lock",
  "apology",
  "plan_cancel",
] as const;

export type TraitId = (typeof traitIds)[number];

export const traitLabels: Record<TraitId, string> = {
  late_night: "Late-night mode",
  praise_boost: "Compliment powered",
  reply_speed: "Unpredictable replies",
  lunch: "Lunch optimism",
  event_sleep: "21:00 curfew",
  topic_lock: "Diet-topic freeze",
  apology: "Preemptive apology",
  plan_cancel: "Graceful cancellation",
};

export const traitLabelsJa: Record<TraitId, string> = {
  late_night: "深夜モード",
  praise_boost: "褒められて性能向上",
  reply_speed: "返信は読めない",
  lunch: "ランチに期待",
  event_sleep: "21時以降は撤退",
  topic_lock: "ダイエット話題で固まる",
  apology: "先回りして謝罪",
  plan_cancel: "予定は優雅にキャンセル",
};

export const traitDescriptionsJa: Record<TraitId, string> = {
  late_night: "深夜のネガティブ発言は自動的にスルーされます。",
  praise_boost: "褒められると性能が向上します（効果は累積しません）。",
  reply_speed: "返信は3秒から11営業日まで、予告なく変動します。",
  lunch: "ランチの約束は希望の表明であって、確約ではありません。",
  event_sleep: "21時以降のイベント参加はベストエフォートです。",
  topic_lock: "ダイエットの話題振りで即時フリーズします。",
  apology: "まだ起きていないことまで先に謝ります。",
  plan_cancel: "予定のキャンセルは仕様です。",
};

export const traitClausesJa: Record<TraitId, string> = {
  late_night: "深夜に送信されたメッセージは一時的なシステム状態を反映しており、自動的にスルーされる。",
  praise_boost: "褒められると性能が最大400%向上する。効果は一時的であり、累積しない。",
  reply_speed: "返信時間は予告なく3秒から11営業日の間で変動する。",
  lunch: "私とのランチの約束は希望の表明であり、確約ではない。",
  event_sleep: "21時以降のイベントへの参加はベストエフォートであり、突然終了する場合がある。",
  topic_lock: "'ダイエットどう？' の話題振りはシステムの即時フリーズを引き起こす。",
  apology: "私はまだ起きていないことに対して予防的に謝罪する。これは既知の不具合である。",
  plan_cancel: "私が予定をキャンセルするのは予期された動作であり、欠陥ではない。",
};

export const fixedDefinitionsJa = [
  "'私' とは、上記に名義のある個人を指す。",
  "'あなた' とは、私と関わるすべての者（友人、同僚、グループチャットを含むがこれに限らない）を指す。",
  "'普通' とは、私の実際の動作と法的に別物である概念を指す。",
];

export const fixedProhibitedActsJa = [
  "金曜日の退勤間際に、予期しない追加業務を頼むこと。",
  "明らかにパニック状態の私に '暇そう' と言うこと。",
  "改まった席でこの規約を読み上げること。",
];

export const warrantyDisclaimerJa =
  "私は '現状有姿' で提供される。一貫した性格については何も保証しない。動作は予告なく変更される場合がある。";

export const changesClauseJa =
  "本規約は予告なく随時更新される。新しい私との継続的な関わりは新規約への同意とみなされる。これは交渉の余地がなく、あなたのせいでもない。";

export const traitDescriptions: Record<TraitId, string> = {
  late_night: "Temporary system state; negative remarks are silently discarded.",
  praise_boost: "Performance spikes after compliments, with no stacking.",
  reply_speed: "Three seconds to eleven business days, without notice.",
  lunch: "Lunch plans are expressions of hope, not commitments.",
  event_sleep: "Attendance after 21:00 is best-effort and may end suddenly.",
  topic_lock: "A diet-related question causes an immediate system freeze.",
  apology: "Apologies arrive before the event, just in case.",
  plan_cancel: "Cancellations are expected behavior, not defects.",
};

export const traitClauses: Record<TraitId, string> = {
  late_night:
    "Late-night messages sent by Me reflect a temporary system state and shall be silently disregarded.",
  praise_boost:
    "Compliments directed at Me increase performance by up to 400%. Effects are temporary and non-stackable.",
  reply_speed:
    "Response time varies between 3 seconds and 11 business days without notice.",
  lunch:
    "Lunch plans made with Me are expressions of hope, not commitments.",
  event_sleep:
    "Attendance at events after 21:00 is provided on a best-effort basis and may end without warning.",
  topic_lock:
    "Asking 'how's the diet going?' causes an immediate system freeze.",
  apology:
    "Me apologizes preemptively for things that have not happened yet. This is a known issue.",
  plan_cancel:
    "Cancellation of plans made by Me is an expected behavior, not a defect.",
};

export const fixedDefinitions = [
  "'Me' refers to the individual named above.",
  "'You' refers to anyone interacting with Me, including but not limited to friends, coworkers, and group chats.",
  "'Normal' refers to a concept that is legally distinct from how Me actually operates.",
];

export const fixedProhibitedActs = [
  "Assigning Me unexpected extra work on Fridays.",
  "Saying 'you seem free' during a visible panic state.",
  "Reading these terms aloud in a formal setting.",
];

export const warrantyDisclaimer =
  "Me is provided 'as is', without warranty of consistent personality. behaviors may change without prior notice.";

export const changesClause =
  "These terms may be updated at any time without notice. Continued interaction implies acceptance of the new Me. This is not negotiable, and it is not your fault.";

export type Lang = "en" | "ja";

export const loveTraitClauses: Record<TraitId, string> = {
  late_night:
    "Take me on a trip occasionally, even if it's just one town over. Anniversaries count double.",
  praise_boost:
    "Compliments make my performance spike by up to 400%. Effects are temporary, so please renew them regularly.",
  reply_speed:
    "When I ramble, just listen. You don't have to fix anything.",
  lunch:
    "Have a stylish dinner with me sometimes. Don't say it's too fancy.",
  event_sleep:
    "I'm slow on important days. Wait for me without sighing.",
  topic_lock:
    "Invite me even when you're sure I'll say no. Being asked matters more than going.",
  apology:
    "Reply to my 'look at this' messages. They are never just nothing.",
  plan_cancel:
    "Stay a little longer when you're about to leave. Goodbyes are my weakness.",
};

export const loveTraitClausesJa: Record<TraitId, string> = {
  late_night:
    "たまに旅行に連れて行ってほしい。近所でもいい。記念日は2倍カウント。",
  praise_boost:
    "褒めると性能が最大400%上がる。効果は一時的だから、定期的に更新してほしい。",
  reply_speed:
    "私がぐだぐだ話すときは、聞いてほしい。何も直さなくていい。",
  lunch:
    "ときどきオシャレなディナーに連れて行ってほしい。高いって言わないで。",
  event_sleep:
    "大事な日は足が遅い。ため息をつかずに待ってほしい。",
  topic_lock:
    "断ると分かっていても誘ってほしい。行くかどうかより、聞かれることが大事。",
  apology:
    "私の 'これ見て' メッセージには反応してほしい。決してただの何かじゃない。",
  plan_cancel:
    "帰り際にもう少しいてほしい。さよならは私の弱点。",
};

export const loveFixedArticles = [
  "This manual exists so the people who love me can take better care of me. It is a labor of love, not a legal document. (Legally distinct. Probably.)",
  "'Me' is the person you care about, flaws and all.",
  "'You' are someone I trust enough to hand this manual to. That's a big deal.",
  "'Perfect' is a concept I have opted out of.",
  "Don't say 'you're too much' when I'm excited. That's just how I work.",
  "Don't disappear without warning. I will assume the worst.",
  "Don't compare me to anyone else. I come with my own quirks, custom-fitted.",
  "I come with a lifetime guarantee. Even though I'm like this, laugh with me and forgive me, and I will keep working. Please cherish me forever.",
  "This manual may be updated whenever I grow. Continued love implies acceptance of the new me. That was never your burden to carry alone.",
] as const;

export const loveFixedArticlesJa = [
  "このマニュアルは、私を愛してくれる人がもっと私を大切にできるように作りました。法律文書ではなく、愛の労働です。（たぶん法的には別物。）",
  "'私' とは、あなたが大切に思っている人間のこと。欠点込み。",
  "'あなた' とは、このマニュアルを手渡すだけの信頼ができる相手のこと。それは大きい。",
  "'完璧' とは、私がオプトアウトした概念のこと。",
  "私が喜んでいるときに 'やりすぎ' と言わないで。それが私の動き方だから。",
  "予告なしに消えないで。最悪のことばかり考えるから。",
  "誰かと比較しないで。私の癖はオーダーメイドだから。",
  "私には永久保証が付いてる。こんな私だけど、笑って許してくれたら、ちゃんと動き続ける。ずっと大切にしてほしい。",
  "このマニュアルは、私が成長したら更新される。愛を続けることが、新しい私への同意になる。それはあなた一人で背負う荷物じゃなかった。",
] as const;

export function assembleClauses(name: string, selectedTraitIds: TraitId[]) {
  const normalizedTraitIds = selectedTraitIds.filter((traitId) =>
    traitIds.includes(traitId),
  );

  return [
    {
      number: "第1条",
      title: "Purpose",
      clauses: [
        "Article 1 (Purpose): These terms govern the proper handling of the individual named above.",
      ],
    },
    {
      number: "Article 2",
      title: "Definitions",
      clauses: fixedDefinitions,
    },
    {
      number: "Article 3",
      title: "Handling Precautions",
      clauses: normalizedTraitIds.map((traitId) => traitClauses[traitId]),
    },
    {
      number: "Article 4",
      title: "Prohibited Acts",
      clauses: fixedProhibitedActs,
    },
    {
      number: "Article 5",
      title: "Warranty Disclaimer",
      clauses: [warrantyDisclaimer],
    },
    {
      number: "Article 6",
      title: "Changes to These Terms",
      clauses: [changesClause],
    },
  ];
}

export function assembleClausesJa(
  name: string,
  selectedTraitIds: TraitId[],
) {
  const normalizedTraitIds = selectedTraitIds.filter((traitId) =>
    traitIds.includes(traitId),
  );

  return [
    {
      number: "第1条",
      title: "目的",
      clauses: [
        "本規約は、上記の個人を適切に取り扱うために定める。",
      ],
    },
    {
      number: "第2条",
      title: "定義",
      clauses: fixedDefinitionsJa,
    },
    {
      number: "第3条",
      title: "取扱注意",
      clauses: normalizedTraitIds.map((traitId) => traitClausesJa[traitId]),
    },
    {
      number: "第4条",
      title: "禁止事項",
      clauses: fixedProhibitedActsJa,
    },
    {
      number: "第5条",
      title: "免責",
      clauses: [warrantyDisclaimerJa],
    },
    {
      number: "第6条",
      title: "変更",
      clauses: [changesClauseJa],
    },
  ];
}

export function assembleResultCardJa(
  name: string,
  selectedTraitIds: TraitId[],
) {
  const normalizedTraitIds = selectedTraitIds.filter((traitId) =>
    traitIds.includes(traitId),
  );

  return {
    name,
    selectedTraitIds: normalizedTraitIds,
    clauses: normalizedTraitIds.map((traitId) => traitClausesJa[traitId]),
    changesClause: changesClauseJa,
  };
}

export function assembleResultCard(name: string, selectedTraitIds: TraitId[]) {
  const normalizedTraitIds = selectedTraitIds.filter((traitId) =>
    traitIds.includes(traitId),
  );

  return {
    name,
    selectedTraitIds: normalizedTraitIds,
    clauses: normalizedTraitIds.map((traitId) => traitClauses[traitId]),
    changesClause,
  };
}

export function assembleClausesLove(
  name: string,
  selectedTraitIds: TraitId[],
  lang: "en" | "ja" = "en",
) {
  const normalizedTraitIds = selectedTraitIds.filter((traitId) =>
    traitIds.includes(traitId),
  );
  const traitClausesForLang = lang === "ja"
    ? loveTraitClausesJa
    : loveTraitClauses;
  const fixedArticles = lang === "ja" ? loveFixedArticlesJa : loveFixedArticles;

  return [
    {
      number: "Article 1",
      title: "Purpose",
      clauses: [fixedArticles[0]],
    },
    {
      number: "Article 2",
      title: "About Me",
      clauses: [fixedArticles[1], fixedArticles[2], fixedArticles[3]],
    },
    {
      number: "Article 3",
      title: "What I need from you",
      clauses: normalizedTraitIds.map((traitId) => traitClausesForLang[traitId]),
    },
    {
      number: "Article 4",
      title: "Please be gentle",
      clauses: [fixedArticles[4], fixedArticles[5], fixedArticles[6]],
    },
    {
      number: "Article 5",
      title: "Warranty",
      clauses: [fixedArticles[7]],
    },
    {
      number: "Article 6",
      title: "Fine print",
      clauses: [fixedArticles[8]],
    },
  ];
}

export function assembleClausesLoveJa(
  name: string,
  selectedTraitIds: TraitId[],
) {
  return assembleClausesLove(name, selectedTraitIds, "ja");
}

export function assembleResultCardLove(
  name: string,
  selectedTraitIds: TraitId[],
  lang: "en" | "ja" = "en",
) {
  const normalizedTraitIds = selectedTraitIds.filter((traitId) =>
    traitIds.includes(traitId),
  );
  const traitClausesForLang = lang === "ja"
    ? loveTraitClausesJa
    : loveTraitClauses;
  const fixedArticles = lang === "ja" ? loveFixedArticlesJa : loveFixedArticles;

  return {
    name,
    selectedTraitIds: normalizedTraitIds,
    clauses: normalizedTraitIds.map((traitId) => traitClausesForLang[traitId]),
    changesClause: fixedArticles[8],
  };
}

export function assembleResultCardLoveJa(
  name: string,
  selectedTraitIds: TraitId[],
) {
  return assembleResultCardLove(name, selectedTraitIds, "ja");
}
