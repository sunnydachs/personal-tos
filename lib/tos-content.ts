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
  late_night: "一時的なシステム状態。ネガティブ発言は自動破棄。",
  praise_boost: "褒めると性能が向上。ただし累積しない。",
  reply_speed: "3秒から11営業日。予告はありません。",
  lunch: "希望の表明であって、約束ではありません。",
  event_sleep: "21時以降の参加はベストエフォート。",
  topic_lock: "ダイエットの話題で即時フリーズ。",
  apology: "何もないうちから謝っておく。",
  plan_cancel: "キャンセルは仕様です。",
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
