import { defineConfig } from "vitest/config";

// Plain vitest config for the pure logic tests (lib/*).
// Kept separate from vite.config.ts (vinext + Cloudflare plugin), which the
// Cloudflare plugin forbids running under the vitest node environment.
export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": new URL(".", import.meta.url).pathname,
    },
  },
});