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
