# Love Mode (トリセツ・トーン) — Build Spec

Add a second **tone** to the existing Personal ToS generator: alongside the current cold/corporate/legal parody tone, a warm "Trisetsu-style" self-disclosure tone inspired by the structure of Nishino Kana's トリセツ (2015) — a list of endearing requests to the reader, closing with acceptance and a "lifetime guarantee" punchline.

## Background (why this works — do not change the plan)

- トリセツ替え歌 (custom "my Trisetsu" versions) is a PROVEN 10-year Japanese SNS culture: サッカー部のトリセツ, 非リアのトリセツ etc. — people introduce themselves via a personalized manual.
- The song's psychological core: listing how you want to be treated = trust + self-disclosure. Its structure: concrete requests → acceptance wish → 永久保証 (lifetime guarantee).
- "Instruction Manual for Being Me" with a WARM tone is unclaimed in English (16Personalities-style is serious; the warm self-intro manual is the gap).
- Legal precedent: even Japan's "歌詞を法的に解釈する" meme proved legal-format × trisetsu is funny.

## Hard requirements

1. This repo. No re-scaffold. Build under vinext. Tests: plain vitest (vitest.config.ts, node env).
2. **Tone switcher** in the setup screen: two tabs — "Corporate" (existing, default) and "Love" (new). Tone persists in the URL state (`&m=love` / absent = corporate) and in localStorage is NOT needed (URL state is the source of truth; the tone is part of the shareable card).
3. The tone affects: title, lead, ALL articles/clauses, the card eyebrow/kicker/clue, version prefix. Corporate behavior must stay byte-identical to today when no tone param is present.
4. **Zero runtime AI**. Deterministic. All copy verbatim from this spec. English + Japanese versions for the new mode (both languages, reusing the existing i18n structure: strings tables per lang).
5. Tests for: tone-aware state codec round-trip (m=love), clause assembly per tone (corporate unchanged + love correct), and that the love clauses contain the required phrases.
6. TypeScript strict. No Buffer in client code. The existing RSC rule: strings must NOT contain functions — use {placeholder} templates + formatTemplate.

## The Love mode copy (verbatim)

### English (Love tone)

- Title (setup): "Instruction Manual\nof Being Me" / titleEm stays
- Lead: "A warm, slightly clingy guide for the people who take care of me. Handle with love."
- Tone tabs: "Corporate" / "With Love"
- Trait section title stays ("Choose your handling conditions" → love variant: "Choose what I need from you")
- selectedCount / setupNote stay (format unchanged)
- continue button: "Read my manual →"
- agree button: "I promise →"
- agree fine print: "By promising, you accept all requests, including the ones you skipped."
- read progress: "You've read {percent}% of my heart"

**Manual articles (love tone, EN):**

Article 1 (Purpose):
- "This manual exists so the people who love me can take better care of me. It is a labor of love, not a legal document. (Legally distinct. Probably.)"

Article 2 (About Me):
- "'Me' is the person you care about, flaws and all."
- "'You' are someone I trust enough to hand this manual to. That's a big deal."
- "'Perfect' is a concept I have opted out of."

Article 3 (What I need from you) — user picks 2-4 trait variants:
- trip: "Take me on a trip occasionally, even if it's just one town over. Anniversaries count double."
- dinner: "Have a stylish dinner with me sometimes. Don't say it's too fancy."
- listen: "When I ramble, just listen. You don't have to fix anything."
- praise: "Compliments make my performance spike by up to 400%. Effects are temporary, so please renew them regularly."
- patience: "I'm slow on important days. Wait for me without sighing."
- include: "Invite me even when you're sure I'll say no. Being asked matters more than going."
- smalltalk: "Reply to my 'look at this' messages. They are never just nothing."
- stay: "Stay a little longer when you're about to leave. Goodbyes are my weakness."

Article 4 (Please be gentle):
- "Don't say 'you're too much' when I'm excited. That's just how I work."
- "Don't disappear without warning. I will assume the worst."
- "Don't compare me to anyone else. I come with my own quirks, custom-fitted."

Article 5 (Warranty):
- "I come with a lifetime guarantee. Even though I'm like this, laugh with me and forgive me, and I will keep working. Please cherish me forever."

Article 6 (Fine print):
- "This manual may be updated whenever I grow. Continued love implies acceptance of the new me. That was never your burden to carry alone."

Card (love tone):
- eyebrow: "PERSONAL TERMS / WITH LOVE"
- kicker: "You promised to take care of me. Even though I'm like this."
- clue: "Article 5: I come with a lifetime guarantee."
- footer: "You promised. - {name}"

### Japanese (Love tone)

- Title: "私の取扱説明書\n（恋愛編）" / lead: "私の世話をしてくれるあなたへ。少し甘えん坊の、あったかいお願い。愛を持って扱ってね。"
- Tone tabs: " corporate" → "仕事モード" / "With Love" → "恋愛モード"
- Trait section title: "私にしてほしいことを選ぶ"
- continue: "マニュアルを読む →"
- agree: "約束する →"
- fine print: "約束すると、読み飛ばしたお願いを含むすべてに同意したものとみなされます。"
- read progress: "心の {percent}% を読みました"

Manual articles (ja):
- Article 1（目的）: "このマニュアルは、私を愛してくれる人がもっと私を大切にできるように作りました。法律文書ではなく、愛の労働です。（たぶん法的には別物。）"
- Article 2（私について）:
  - "'私' とは、あなたが大切に思っている人間のこと。欠点込み。"
  - "'あなた' とは、このマニュアルを手渡すだけの信頼ができる相手のこと。それは大きい。"
  - "'完璧' とは、私がオプトアウトした概念のこと。"
- Article 3（私にしてほしいこと）— trait variants:
  - trip: "たまに旅行に連れて行ってほしい。近所でもいい。記念日は2倍カウント。"
  - dinner: "ときどきオシャレなディナーに連れて行ってほしい。高いって言わないで。"
  - listen: "私がぐだぐだ話すときは、聞いてほしい。何も直さなくていい。"
  - praise: "褒めると性能が最大400%上がる。効果は一時的だから、定期的に更新してほしい。"
  - patience: "大事な日は足が遅い。ため息をつかずに待ってほしい。"
  - include: "断ると分かっていても誘ってほしい。行くかどうかより、聞かれることが大事。"
  - smalltalk: "私の 'これ見て' メッセージには反応してほしい。決してただの何かじゃない。"
  - stay: "帰り際にもう少しいてほしい。さよならは私の弱点。"
- Article 4（やさしくいてほしい）:
  - "私が喜んでいるときに 'やりすぎ' と言わないで。それが私の動き方だから。"
  - "予告なしに消えないで。最悪のことばかり考えるから。"
  - "誰かと比較しないで。私の癖はオーダーメイドだから。"
- Article 5（保証）: "私には永久保証が付いてる。こんな私だけど、笑って許してくれたら、ちゃんと動き続ける。ずっと大切にしてほしい。"
- Article 6（細則）: "このマニュアルは、私が成長したら更新される。愛を続けることが、新しい私への同意になる。それはあなた一人で背負う荷物じゃなかった。"

Card (ja):
- eyebrow: "PERSONAL TERMS / 恋愛モード"
- kicker: "こんな私だけど、大切にしてくれるって約束してくれた。"
- clue: "第5条: 私には永久保証が付いてる。"
- footer: "約束したね。 - {name}"

## Implementation notes

- `lib/tos-content.ts`: add love-tone variants — `loveClauses` (EN), `loveClausesJa` (JA), `loveFixedArticles` / `loveFixedArticlesJa`, plus `assembleClausesLove(name, traitIds, lang)` and `assembleResultCardLove(...)` (or extend the existing assemble functions with a tone param — your call, keep it clean).
- `lib/i18n-strings.ts`: add love-tone strings per lang (tabs, title, lead, agree, fine print, progress, card eyebrow/kicker/clue/footer). Reuse TosStrings shape if possible (extend with tone-specific fields).
- `lib/tos-state.ts`: add tone to GeneratorState ("corporate" | "love"); encode as `&m=love` (absent = corporate, backward compatible). parseState must accept and round-trip it. getVersion should include tone in the hash.
- `components/tos-generator.tsx`: add the tone tabs in the setup screen; thread the tone through TermsModal + ResultCard + canvas renderer + share URL. Canvas renderer (lib/tos-render-canvas.ts) needs a love variant (warmer accent color? — use a soft pink/rose accent instead of lime for love tone; keep corporate as-is).
- OG routes: the default card OG stays corporate (no tone param). Skip dynamic love OG (static site, the shared link itself carries the tone).
- The ja home (`app/ja/page.tsx`) gets the same tone tabs with ja labels.

## Deliverables

Run and report: `npm run build:vinext` exit code, `npm test` pass count, local routes responding (/, /ja, and a love-tone share URL like /?n=Taro&m=love&t=<mask>). Do NOT deploy. Commit your work with a descriptive message.