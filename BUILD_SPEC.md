# Personal ToS — Build Spec

"Terms & Conditions of Being Me" — a parody generator that renders YOUR OWN Terms of Service as the exact UI everyone scrolls past on app launches (long clause text, "I agree" button, fine print), exported as ONE finished shareable image.

## Hard requirements

1. Next.js 16 App Router, scaffolded at this repo root. **Do NOT re-scaffold.** Must build & run under **vinext** (Cloudflare Workers): `npm run build:vinext` + `npm run start:vinext`. workerd is already approved/installed.
2. **Zero runtime AI.** Deterministic generation: user picks traits → clause templates assemble → rendered card. All static.
3. **The exported image is the finished product** — no screenshot needed. Render via **Canvas API client-side** (browser, toBlob → PNG download + clipboard copy). The card is also the OG image via a **static-ish dynamic OG route**: `/card/[id]/opengraph-image.tsx` using `ImageResponse` from `next/og` reproducing the same design (server-side). Both render from the SAME clause data structure so they never diverge. Keep the OG route's design simple (satori supports only flexbox + subset of CSS — no grid, no canvas).
4. **URL-parameter state (no backend):** the generator state serializes into the URL query string (`/?n=<name>&t=<trait-ids>&v=<version>`). Opening a shared link restores the exact card. Keep the param encoding compact and reversible. Shared short path: `/c?s=<base64url(state)>` is also acceptable if cleaner — pick ONE and document it.
5. Mobile-first. The TOS screen must look like a real app ToS modal (scrollable clause area, sticky "I agree" footer, fine-print header, version tag). Ironic detail: the parody should feel MORE scrollable/serious than it is funny, the humor hides in the clause text.
6. Tests for the state codec + clause assembly with **vitest** (pure functions, no Cloudflare plugin). `npm test`.
7. TypeScript strict. Dark theme + one accent. System font stack (no Google Fonts).

## The parody structure (content — I wrote this; keep verbatim)

Header (fine print, like a real app):
```
Terms & Conditions of Being Me
Effective: the day you met me · Version <VERSION>
```
(VERSION = a short hash of the selected traits, e.g. v2f8a1 — changes when traits change, so a card's "terms version" is self-describing)

The scrollable clause area shows ALL of the following sections; the user's trait picks inject their variant lines:

**第1条（目的）** — fixed lead:
- EN: "Article 1 (Purpose): These terms govern the proper handling of the individual named above."
- JP alt is NOT included — the site is English-first (same arbitrage logic as Corporate Ghost Quiz: Japan has トリセツ text generators saturated; the app-launch ToS UI parody as a shareable IMAGE is unclaimed in both markets).

**Article 2 (Definitions)** — fixed, deadpan:
- "'Me' refers to the individual named above."
- "'You' refers to anyone interacting with Me, including but not limited to friends, coworkers, and group chats."
- "'Normal' refers to a concept that is legally distinct from how Me actually operates."

**Article 3 (Handling Precautions)** — user picks 2-4 trait variants; each renders as a numbered clause:
- late_night: "Late-night messages sent by Me reflect a temporary system state and shall be silently disregarded. (※深夜のネガティブ発言は自動的にスルーされます)"
- praise_boost: "Compliments directed at Me increase performance by up to 400%. Effects are temporary and non-stackable. (※褒められると急激に性能が上がります)"
- reply_speed: "Response time varies between 3 seconds and 11 business days without notice."
- lunch: "Lunch plans made with Me are expressions of hope, not commitments."
- event_sleep: "Attendance at events after 21:00 is provided on a best-effort basis and may end without warning."
- topic_lock: "Asking 'how's the diet going?' causes an immediate system freeze."
- apology: "Me apologizes preemptively for things that have not happened yet. This is a known issue."
- plan_cancel: "Cancellation of plans made by Me is an expected behavior, not a defect."

**Article 4 (Prohibited Acts)** — fixed, 3 items:
- "Assigning Me unexpected extra work on Fridays."
- "Saying 'you seem free' during a visible panic state."
- "Reading these terms aloud in a formal setting."

**Article 5 (Warranty Disclaimer)** — fixed, deadpan irony:
- "Me is provided 'as is', without warranty of consistent personality. behaviors may change without prior notice."

**Article 6 (Changes to These Terms)** — fixed punchline:
- "These terms may be updated at any time without notice. Continued interaction implies acceptance of the new Me. This is not negotiable, and it is not your fault."

Sticky footer (like every real ToS modal):
- Big button: "I Agree" (pressing it reveals the result card state — see flow)
- Tiny text next to it: "By proceeding, you accept all clauses, including the ones you skipped."

**Final exported card** (after "I Agree"): a NON-scrollable single card — header, version, the user's Article 3 clauses (their picked variants), Article 6 punchline, and a footer line "You agreed to this. - <name>". This is what gets exported to PNG / used as OG image. The scroll experience is the joke; the card is the share artifact.

## UI flow (single page, client state)

1. **Setup screen** (looks like an app launching): name input (or handle), then 8 trait checkboxes (the variants above), live preview of the ToS modal updating as they check. "Checking more traits makes your terms stricter." Then a "Continue to Terms" button.
2. **ToS screen** (the parody payoff): a real-feeling modal — fine-print header, scrollable clause area (ALL articles; their trait variants inside Article 3), sticky "I Agree" footer with the tiny fine-print joke. Scroll indicator shows how far they've read (ironic progress bar "You've read X%").
3. **Result screen** (after I Agree): the finished card (non-scrollable), 3 buttons: "Download PNG" (canvas toBlob), "Copy image" (clipboard), "Copy link" (URL-param share). Plus "Edit terms" (back to setup, state preserved) and a subtle "See a random person's terms" (fills random traits — gacha-lite).

## State codec

- traits: fixed ordered list of 8 ids (late_night, praise_boost, reply_speed, lunch, event_sleep, topic_lock, apology, plan_cancel). Encode as a bitmask → base64url (1 char per 3 traits roughly). Name: percent-encoded. Version: first 5 hex chars of a simple hash (djb2) of "name|mask".
- `encodeState(name, traitIds) -> query string`, `parseState(search) -> {name, traitIds} | null` (null on garbage — never throw). Tests cover round-trip, garbage tolerance, and empty-name default ("Anonymous").

## Canvas rendering (client) + OG (server) must share design

- Extract ALL design constants (colors, spacing, font sizes) into `lib/tos-design.ts` as plain data. Canvas code maps them to canvas ops; the OG route maps the same constants to satori-compatible flex styles. No grid in OG (satori). Keep the OG card layout single-column: header, version, clauses, footer.

## Files

- `app/page.tsx` — the 3-screen flow (client). Reuse `.app-shell` style pattern.
- `app/c/s/page.tsx` — optional shared-link entry that parses `?s=` and renders the result screen directly (server wrapper + client component). If you find query-params-on-home cleaner, keep ONE path and document the choice in code comments.
- `lib/tos-content.ts` — the articles + trait variants (content above, verbatim).
- `lib/tos-state.ts` — codec (encode/parse/version).
- `lib/tos-design.ts` — shared design constants.
- `lib/tos-render-canvas.ts` — canvas PNG renderer (client-only, dynamic import).
- `app/card/[id]/opengraph-image.tsx` — ImageResponse OG route rendering the same card from URL state. Size 1200×630. If parsing complex state in OG is heavy, decode just name+trait-ids (the only variable parts).
- `app/layout.tsx` — metadata: title "Terms & Conditions of Being Me (Personal ToS Generator)", description, og/twitter tags (static default card = the no-traits version), `metadataBase: new URL("https://personal-tos.sunnydachs.workers.dev")` (**metadataBase is REQUIRED — without it og:image resolves to localhost**).
- `app/globals.css` — styles.

## Deliverables

Run and report: `npm run build:vinext` exit code, `npm test` pass count, `npm run start:vinext` responding (curl). Do NOT deploy. Commit your work with a descriptive message.