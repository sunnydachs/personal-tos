import { ImageResponse } from "next/og";
import { gachaDesign } from "@/lib/gacha-design";

export const alt = "Modern Human Status Screen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const rows = [
    { label: "HP", value: 65 },
    { label: "MP", value: 55 },
    { label: "MOT", value: 45 },
    { label: "LIM", value: 35 },
  ] as const;

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: gachaDesign.background, padding: gachaDesign.padding }}>
      <div style={{ width: gachaDesign.width - gachaDesign.padding * 2, height: gachaDesign.height - gachaDesign.padding * 2, display: "flex", flexDirection: "column", padding: 54, borderRadius: 24, background: gachaDesign.card }}>
        <div style={{ color: gachaDesign.accent, fontSize: gachaDesign.eyebrowSize, fontWeight: 700, letterSpacing: 1 }}>MODERN HUMAN STATUS SCREEN</div>
        <div style={{ marginTop: 26, color: gachaDesign.ink, fontSize: 42, fontWeight: 700 }}>Anonymous</div>
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map(({ label, value }) => (
            <div key={`${label}-${value}`} style={{ display: "flex", alignItems: "center", gap: 12, color: gachaDesign.muted, fontSize: gachaDesign.smallSize, width: 680 }}><span style={{ width: 54 }}>{label}</span><div style={{ height: 12, background: "#2b2b2b", flex: 1 }}><div style={{ width: `${value}%`, height: "100%", background: value > 60 ? "#8fe36a" : value >= 30 ? "#f3d35c" : "#ff6b6b" }} /></div><span>{value}</span></div>
          ))}
        </div>
        <div style={{ marginTop: "auto", paddingTop: 20, borderTop: `1px solid ${gachaDesign.line}`, color: gachaDesign.muted, fontSize: gachaDesign.smallSize }}>Anonymous · Status of 2026-09-19</div>
        <div style={{ marginTop: 12, color: gachaDesign.ink, fontSize: gachaDesign.smallSize }}>My status: HP 65 / MP 55 / MOT 45 / LIM 35. Render yours.</div>
      </div>
    </div>,
    { ...size },
  );
}
