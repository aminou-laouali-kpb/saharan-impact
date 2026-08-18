import { ImageResponse } from "next/og";

export const alt = "Saharan Impact — De l'équipement à l'usage";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          color: "#F7F6F1",
          background: "linear-gradient(150deg, #24231F 0%, #2F2E29 72%, #57544D 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>
          Saharan <span style={{ color: "#D4AA00", marginLeft: 10 }}>Impact</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ color: "#D4AA00", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
            Sahel · IA · Solutions numériques
          </div>
          <div style={{ marginTop: 28, fontSize: 68, fontWeight: 800, lineHeight: 1.08 }}>
            Transformer l&apos;équipement en usage concret.
          </div>
        </div>
        <div style={{ height: 2, width: "100%", background: "linear-gradient(90deg, #D4AA00, #57544D)" }} />
      </div>
    ),
    size,
  );
}
