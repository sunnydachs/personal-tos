import { describe, it } from "vitest";
import { ImageResponse } from "next/og";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { access, constants } from "node:fs/promises";

describe("generate default card PNG", () => {
  it("writes public/card/default.png", async () => {
    const ir = new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#111111", padding: 72 }}>
          <div style={{ width: 1056, height: 486, display: "flex", flexDirection: "column", padding: 54, borderRadius: 24, background: "#1b1b1b" }}>
            <div style={{ color: "#d9ff5c", fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>TERMS & CONDITIONS OF BEING ME</div>
            <div style={{ marginTop: 16, color: "#f5f2ea", fontSize: 48, fontWeight: 700, lineHeight: 1.1 }}>Anonymous</div>
            <div style={{ marginTop: 8, color: "#a8a49c", fontSize: 18 }}>Effective: the day you met me</div>
            <div style={{ height: 2, marginTop: 24, display: "flex", background: "#373737" }} />
            <div style={{ marginTop: 28, color: "#f5f2ea", fontSize: 25, fontWeight: 700 }}>ARTICLE 3 · HANDLING PRECAUTIONS</div>
            <div style={{ marginTop: 16, color: "#a8a49c", fontSize: 22, lineHeight: 1.35 }}>Your clauses appear here after you pick your operating conditions.</div>
            <div style={{ marginTop: 24, color: "#f5f2ea", fontSize: 25, fontWeight: 700 }}>ARTICLE 6 · CHANGES TO THESE TERMS</div>
            <div style={{ marginTop: 12, color: "#a8a49c", fontSize: 24, lineHeight: 1.25 }}>These terms may be updated at any time without notice.</div>
            <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid #373737", color: "#a8a49c", fontSize: 22 }}>You agreed to this. - Anonymous</div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    );
    const buf = Buffer.from(await ir.arrayBuffer());
    if (buf.length < 5000) throw new Error("card too small: " + buf.length);
    // Asset generation is a local-only step; CI has no write access to the repo checkout.
    const outDir = resolve(process.cwd(), "public/card");
    try {
      await access(resolve(process.cwd(), "public"), constants.W_OK);
    } catch {
      return; // read-only checkout — skip writing, the PNG is already committed
    }
    await mkdir(outDir, { recursive: true });
    await writeFile(resolve(outDir, "default.png"), buf);
  });
});
