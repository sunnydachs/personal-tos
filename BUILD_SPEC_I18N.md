# i18n: Japanese versions (/ja) — Build Spec

Add full Japanese versions of both tools under `/ja/...` paths, following Google Search Central's internationalization guidelines: separate URLs per language, hreflang + x-default mutual declaration, NO automatic redirects, explicit language switcher, user choice persisted in localStorage.

## Hard requirements

1. This repo. Do NOT re-scaffold. Must build & run under vinext. Tests via plain vitest (`vitest.config.ts` — Cloudflare plugin stays OUT of the test config).
2. **NO automatic language redirects** (Google guideline: "don't redirect based on what you think the user's language may be"). English `/` stays the default landing for everyone; `/ja` is reachable via the switcher only.
3. **hreflang declaration on every page** (both languages + x-default), pointing at the SAME page in the other language (fully-qualified URLs incl. https://personal-tos.sunnydachs.workers.dev).
4. **Language switcher in the header** of every page: "日本語 / English" — navigates to the SAME page in the other language (preserve any URL state: query params for gacha state must survive the language switch). Persists choice in localStorage (`tos-lang` = "en" | "ja"); when set, the SITE-INTERNAL links (home launcher cards, ghost-index links, header logo) navigate within the chosen language. Never auto-redirect on load.
5. TypeScript strict. All Japanese copy is provided in this spec — use verbatim. English copy stays as-is.
6. Tests for the language switcher state helper (pure function: same-page-other-language URL builder + localStorage key handling mocked). vitest node env.
7. `og:locale` per language (en_US / ja_JP) + og:title/description per language. metadataBase stays as-is.

## URL structure (create these routes)

- `app/ja/page.tsx` — Japanese home (the ToS generator, Japanese UI)
- `app/ja/resolution/page.tsx` — 解像度ガチャ（日本語）
- `app/ja/substitute/page.tsx` — 身代わりガチャ（日本語）
- `app/ja/status/page.tsx` — ステータス画面（日本語）
- Shared components: extract the existing page bodies into reusable client components under
  `components/` (e.g. `components/tos-generator.tsx`, `components/resolution-tool.tsx`,
  `components/substitute-tool.tsx`, `components/status-tool.tsx`) parameterized by a
  `lang: "en" | "ja"` prop + a `strings` object. The /ja routes render the same components with
  Japanese strings. Do NOT copy-paste the whole page code into /ja — one implementation,
  two string tables.

## The Japanese copy (verbatim)

### Common UI strings (ja)
- home eyebrow: "PERSONAL TERMS / 法的Notice" → keep the English eyebrow brand as-is; Japanese
  sites keep the brand eyebrow in English (brand consistency), body copy in Japanese.
- switcher: "English" / "日本語"
- name label: "名前（ハンドル名）", placeholder: "例: みか"
- seed label: "個人シード", placeholder: "daily"
- trait section title: "あなたの取扱条件を選ぶ"
- selected count: "{n} / 8 選択中"
- setup note: "チェックを増やすほど規約は厳しくなります。"
- continue button: "規約を読む →"
- agree button: "同意する →"
- agree fine print: "先へ進むと、読み飛ばした条項を含むすべてに同意したものとみなされます。"
- read progress: "規約の {p}% を読みました"
- result actions: "PNGを保存" / "画像をコピー" / "リンクをコピー" / "規約を編集" / "ランダムな誰かの規約を見る"
- footer: "Personal ToS · あなたの取り扱い説明書"

### ToS articles (ja)
- header title: "私の利用規約"
- header sub: "発効日: あなたが私に会った日 · バージョン <VERSION>"
- Article 1（目的）: "本規約は、上記の個人を適切に取り扱うために定める。"
- Article 2（定義）:
  - "'私' とは、上記に名義のある個人を指す。"
  - "'あなた' とは、私と関わるすべての者（友人、同僚、グループチャットを含むがこれに限らない）を指す。"
  - "'普通' とは、私の実際の動作と法的に別物である概念を指す。"
- Article 3（取扱注意）— trait variants (ja):
  - late_night: "深夜に送信されたメッセージは一時的なシステム状態を反映しており、自動的にスルーされる。"
  - praise_boost: "褒められると性能が最大400%向上する。効果は一時的であり、累積しない。"
  - reply_speed: "返信時間は予告なく3秒から11営業日の間で変動する。"
  - lunch: "私とのランチの約束は希望の表明であり、確約ではない。"
  - event_sleep: "21時以降のイベントへの参加はベストエフォートであり、突然終了する場合がある。"
  - topic_lock: "'ダイエットどう？' の話題振りはシステムの即時フリーズを引き起こす。"
  - apology: "私はまだ起きていないことに対して予防的に謝罪する。これは既知の不具合である。"
  - plan_cancel: "私が予定をキャンセルするのは予期された動作であり、欠陥ではない。"
- Article 4（禁止事項）:
  - "金曜日の退勤間際に、予期しない追加業務を頼むこと。"
  - "明らかにパニック状態の私に '暇そう' と言うこと。"
  - "改まった席でこの規約を読み上げること。"
- Article 5（免責）: "私は '現状有姿' で提供される。一貫した性格については何も保証しない。動作は予告なく変更される場合がある。"
- Article 6（変更）: "本規約は予告なく随時更新される。新しい私との継続的な関わりは新規約への同意とみなされる。これは交渉の余地がなく、あなたのせいでもない。"
- result card footer: "あなたはこれに同意しました。 - {name}"

### Resolution gacha (ja)
- title: "今日の解像度ガチャ", eyebrow stays "DAILY GACHA / ZERO RUNTIME AI"
- pitch: "決定論的な1回ガチャ。完成されたカード。明日までリロードなし。"
- button: "今日の解像度をチェック →"
- states (ja):
  - 4K: "痛いほど解像度が高い。毛穴も後悔もすべて露わになる。"
  - FullHD: "十分にクリア。標準的な人間の解像度。"
  - 720p: "やや柔らかい。詳細はまだ読み込み中。"
  - 144p: "モザイクレベル。今日の私はほぼぼやし。"
  - PixelArt: "ドット絵。レトロだが判読不能。"
- date line: "{date} の解像度"
- share: "今日の私は {state} でレンダリング中。あなたもチェック。"
- reroll note: "明日までリロードなし。"

### Substitute gacha (ja)
- title: "身代わりガチャ", eyebrow stays
- pitch: "明日の怒られを、代わりに引き受けてくれる誰かを召喚。"
- button: "身代わりを召喚 →"
- characters (ja):
  - "打たれ強いチワワ 🐕 — 小さくてうるさいが、理不尽には無敵。"
  - "謝罪のプロのタヌキ 🦝 — 45度のお辞儀、一度も本心から謝ったことがない。"
  - "金曜日の言い訳インターン 🧑‍💻 — 新鮮で意欲的で使い捨て。金曜の怒られを全部引き受ける。"
  - "時間ロスの幽霊 👻 — 過失の瞬間、技術的には不在だった。"
  - "ベテラン言い訳係 🧓 — 'それは私のせいです' の歴20年。実際は違ったことが一度もない。"
  - "強制会議そのもの 📋 — 電会議だったはずの会議の中では怒られは届かない。"
- defense stat label: "身代わり率"
- share: "明日の私の身代わり: {character}。あなたも召喚。"

### Status tool (ja)
- title: "現代人ステータス画面", eyebrow stays "MODERN HUMAN / STATUS SCREEN"
- pitch: "4つの値を設定。今日のあなたの正確な状態をレンダリング。"
- stat labels: HP "体力", MP "メンタル", MOT "意欲", LIM "限界ゲージ"
- button: "ステータスを表示 →"
- verdicts (ja):
  - all>60: " fully operational" → "全システム正常稼働。不自然なくらい健康。"
  - HP<30 or MP<30: "危険状態。何も予定するな。"
  - LIM>80: "容量に接近中。受信箱から離れろ。"
  - else: "標準的な現代人の状態。"
- share: "私のステータス: 体力 {hp} / メンタル {mp} / 意欲 {mot} / 限界 {lim}。あなたも表示。"

## Language switcher behavior (exact)

- Header of every page (en + ja): two small links — "日本語" (on en pages) / "English" (on ja pages)
  — each navigates to the SAME page in the other language:
  - `/` ↔ `/ja`, `/resolution` ↔ `/ja/resolution`, etc.
  - Gacha state query params: preserve `?n=...&s=...` across the switch (append to the target URL).
- Clicking the switcher also writes localStorage `tos-lang` = target lang.
- On load: read localStorage; if "ja" and current page is English home `/` with NO other state, the
  SITE-INTERNAL links (launcher cards, logo) point at /ja versions — but do NOT redirect. If the
  user lands on `/` fresh (no localStorage), everything stays English (default).
- Keep implementation in a small client helper `components/lang-switch.tsx` + `lib/i18n.ts` with
  `getOtherLangUrl(pathname, search, target)` (pure, tested) and `getPersistedLang()` /
  `persistLang(lang)` (localStorage guarded for SSR).

## hreflang (every page, en + ja)

In `app/layout.tsx` metadata: `alternates: { languages: { en: "...", ja: "...", "x-default": "..." } }`
— but these are PAGE-SPECIFIC (per-route hreflang, not just home). Add `alternates` to each page's
`generateMetadata` (or static metadata) with the fully-qualified URL of the same page in each
language. Example for /result-EMZG-style routes... (this repo has no /result routes; apply to
`/`, `/resolution`, `/substitute`, `/status` and their /ja twins).

## Deliverables

Run and report: `npm run build:vinext` exit code, `npm test` pass count, `npm run start:vinext`
responding (curl `/` + `/ja` + all 3 ja routes + hreflang presence in the HTML head). Do NOT
deploy. Commit your work with a descriptive message.