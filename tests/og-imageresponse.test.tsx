import { describe, it, expect } from "vitest";
// Use the actual next/og ImageResponse like the route does
import { ImageResponse } from "next/og";

describe("next/og ImageResponse with prod JSX", () => {
  it("renders the card", async () => {
    const ir = new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#111111", padding: 72 }}>
          <div style={{ width: 1056, height: 486, display: "flex", flexDirection: "column", padding: 54, borderRadius: 24, background: "#1b1b1b" }}>
            <div style={{ color: "#d9ff5c", fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>TERMS & CONDITIONS OF BEING ME</div>
            <div style={{ marginTop: 16, color: "#f5f2ea", fontSize: 48, fontWeight: 700, lineHeight: 1.1 }}>Anonymous</div>
            <div style={{ height: 2, marginTop: 24, display: "flex", background: "#373737" }} />
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 13 }}></div>
            <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid #373737", color: "#a8a49c", fontSize: 22 }}>You agreed to this. - Anonymous</div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    );
    const buf = await ir.arrayBuffer();
    expect(buf.byteLength).toBeGreaterThan(5000);
  });
});
