import { ImageResponse } from "next/og";
import { gachaDesign } from "@/lib/gacha-design";

export const alt = "Take The Blame For Me Gacha";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: gachaDesign.background, padding: gachaDesign.padding }}>
      <div style={{ width: gachaDesign.width - gachaDesign.padding * 2, height: gachaDesign.height - gachaDesign.padding * 2, display: "flex", flexDirection: "column", padding: 54, borderRadius: 24, background: gachaDesign.card }}>
        <div style={{ color: gachaDesign.accent, fontSize: gachaDesign.eyebrowSize, fontWeight: 700, letterSpacing: 1 }}>TAKE THE BLAME FOR ME GACHA</div>
        <div style={{ marginTop: 28, fontSize: 92 }}>🐕</div>
        <div style={{ marginTop: 18, color: gachaDesign.ink, fontSize: 42, fontWeight: 700 }}>The Unbreakable Chihuahua</div>
        <div style={{ marginTop: 14, color: gachaDesign.muted, fontSize: gachaDesign.bodySize, lineHeight: 1.35 }}>Small, loud, and immune to unreasonable criticism.</div>
        <div style={{ marginTop: "auto", paddingTop: 20, borderTop: `1px solid ${gachaDesign.line}`, color: gachaDesign.muted, fontSize: gachaDesign.smallSize }}>Anonymous · Substitute of 2026-09-19</div>
        <div style={{ marginTop: 12, color: gachaDesign.ink, fontSize: gachaDesign.smallSize }}>My substitute for tomorrow: The Unbreakable Chihuahua. Summon yours.</div>
      </div>
    </div>,
    { ...size },
  );
}
