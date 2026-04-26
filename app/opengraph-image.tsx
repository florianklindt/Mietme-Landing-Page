import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "mietme — Mieten. Einfach wie Kaufen. Berlins einfachste Verleihplattform.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.24em",
            color: "#6B6B6B",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              background: "#00D66C",
              borderRadius: 999,
            }}
          />
          MIETME · BERLIN · MIETME.APP
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            fontSize: 94,
            lineHeight: 1.02,
            color: "#0A0A0A",
            fontWeight: 500,
            letterSpacing: "-0.035em",
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ color: "#00D66C" }}>Mieten.</span>
          </div>
          <div style={{ display: "flex" }}>
            <span>Einfach wie&nbsp;</span>
            <span style={{ color: "#00D66C" }}>Kaufen.</span>
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "#6B6B6B",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span
              style={{
                fontSize: 36,
                color: "#0A0A0A",
                fontWeight: 500,
                letterSpacing: "-0.03em",
              }}
            >
              mietme
            </span>
            <span
              style={{
                width: 8,
                height: 8,
                background: "#00D66C",
                borderRadius: 999,
                display: "block",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: "#00D66C",
                borderRadius: 999,
              }}
            />
            mietme.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
