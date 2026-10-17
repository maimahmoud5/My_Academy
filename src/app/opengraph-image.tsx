import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Online Quran Classes`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a4036 0%, #0f5c4c 50%, #1a7a66 100%)",
          padding: 72,
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#e8d5a8", marginBottom: 16 }}>Noor Quran Academy</div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.2, maxWidth: 900 }}>
          Online Quran, Tajweed & Arabic classes
        </div>
        <div style={{ fontSize: 28, marginTop: 24, color: "rgba(255,255,255,0.85)" }}>
          Kids & adults · UK · USA · Canada · Australia
        </div>
      </div>
    ),
    { ...size },
  );
}
