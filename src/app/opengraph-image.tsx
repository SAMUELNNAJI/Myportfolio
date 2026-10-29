import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt =
  "Samizil Dev — Nnaji Samuel, website developer in Port Harcourt.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070506",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(255,59,59,0.32), transparent 52%), radial-gradient(circle at 4% 100%, rgba(255,138,61,0.16), transparent 48%)",
          padding: "58px 72px 52px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 54,
              height: 54,
              borderRadius: 15,
              border: "1px solid rgba(255,255,255,0.16)",
              backgroundColor: "rgba(255,59,59,0.14)",
              color: "#ffc9c2",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {"</>"}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 24, color: "#f6efee", fontWeight: 600 }}>
              {siteConfig.brand}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#8d7f7d",
                letterSpacing: 3,
              }}
            >
              DEVELOPER PORTFOLIO
            </div>
          </div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(52,211,153,0.28)",
              backgroundColor: "rgba(52,211,153,0.08)",
              color: "#a7f3d0",
              padding: "10px 20px",
              borderRadius: 999,
              fontSize: 16,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: "#34d399",
              }}
            />
            Available for new projects
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 1000,
              fontSize: 74,
              lineHeight: 1.04,
              letterSpacing: -3.5,
              color: "#f6efee",
              fontWeight: 600,
            }}
          >
            I build fast websites that feel effortless.
          </div>
          <div style={{ display: "flex", fontSize: 25, color: "#b3a6a4" }}>
            Website developer · HTML · CSS · JavaScript · React · Django · WordPress
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 26,
            fontSize: 16,
            color: "#8d7f7d",
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.email}</div>
          <div style={{ display: "flex", gap: 28 }}>
            <span>Port Harcourt</span>
            <span>5 years</span>
            <span>Responsive</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
