# Personal ToS — Terms & Conditions of Being Me

A parody generator that renders **your own Terms of Service** as the exact UI everyone scrolls past on app launches — long clause text, "I agree" button, fine print — then exports it as **one finished shareable image**.

> Article 3.1: Late-night messages sent by Me reflect a temporary system state and shall be silently disregarded.
> Article 3.2: Compliments directed at Me increase performance by up to 400%. Effects are temporary and non-stackable.

## Live

https://personal-tos.sunnydachs.workers.dev

## The flow

1. **Setup** — enter your name, pick your "operating conditions" (8 trait checkboxes: late-night posts, praise boost, reply speed, lunch, event sleep, topic freeze, preemptive apologies, plan cancellation).
2. **Terms** — a real-feeling ToS modal: fine-print header, scrollable clauses (your variants inside Article 3), sticky "I Agree" footer with the fine-print joke. An ironic progress bar tracks how far you've read.
3. **Result** — the finished, non-scrollable card. Download PNG, copy image, or copy link. The link encodes your state in the URL — opening it restores the exact card.

The scroll experience is the joke. The card is the share artifact.

## Stack

- **Next.js 16** (App Router) + **vinext** — compiles clean to **Cloudflare Workers**
- **Zero runtime AI** — deterministic generation (traits → clause templates → render). No API keys, no per-request cost.
- **Canvas API** (client) renders the PNG export; **`next/og` ImageResponse** (server) renders the same design as the OG image from the same clause data — they never diverge.
- **URL-parameter state** (no backend): `?n=<name>&t=<base64url-mask>&v=<version>` — compact, reversible, garbage-tolerant. The version tag (`v` = hash of name+traits) makes every card's terms version self-describing.
- **vitest** for the state codec + clause assembly.
- Deploys via **GitHub Actions** on push to `main`.

## Development

```bash
npm install
npm run dev:vinext     # vinext dev server (Cloudflare runtime)
npm run build:vinext   # production build
npm run start:vinext   # serve built worker locally (wrangler)
npm test               # vitest unit tests
```

## Architecture

```
app/page.tsx                  → setup → terms → result state machine (client)
app/card/[id]/opengraph-image.tsx → ImageResponse OG route (same design constants)
lib/tos-content.ts            → the articles + trait variants (content)
lib/tos-state.ts              → URL state codec (encode/parse/version)
lib/tos-design.ts             → shared design constants (canvas + OG read these)
lib/tos-render-canvas.ts      → canvas PNG renderer (client-only)
```

## License

MIT