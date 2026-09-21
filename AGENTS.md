<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## Agent test rules (never violate)

- Never modify, skip, or delete an existing test to make a change pass.
- Never loosen an assertion or change an expected value to whatever the code
  produced — a green suite with a loosened test ships the bug.
- New tests must fail on the previous code and pass with the change
  (revert-and-rerun check on review).
- CodeRabbit findings are resolved or explicitly answered before merge —
  never silent-merge past them.
