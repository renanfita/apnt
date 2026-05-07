import React from "react";
import { Img, staticFile, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../theme";

interface Props {
  size?: "lg" | "md" | "sm";
  delay?: number;
  align?: "left" | "center";
}

export const BrandCard: React.FC<Props> = ({
  size = "md",
  delay = 0,
  align = "left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({ frame: frame - delay, fps, config: { damping: 18 } });

  const dims = {
    lg: { logo: 96, title: 28, kicker: 13, sub: 14, gap: 18 },
    md: { logo: 72, title: 22, kicker: 11, sub: 12, gap: 14 },
    sm: { logo: 56, title: 18, kicker: 10, sub: 11, gap: 10 },
  }[size];

  return (
    <div
      style={{
        opacity: sp,
        transform: `translateY(${(1 - sp) * 12}px)`,
        display: "grid",
        gridTemplateColumns: `${dims.logo}px 1fr`,
        gap: dims.gap,
        alignItems: "center",
        padding: 14,
        border: `1px solid ${theme.lineSoft}`,
        borderRadius: 10,
        background: `linear-gradient(135deg, rgba(8,18,33,.96), rgba(20,34,60,.9))`,
        boxShadow: "0 12px 28px rgba(0,0,0,.36)",
        fontFamily: fonts.sans,
        maxWidth: align === "center" ? "fit-content" : undefined,
        margin: align === "center" ? "0 auto" : undefined,
      }}
    >
      <Img
        src={staticFile("assets/apnt-2026-logo.jpeg")}
        style={{
          width: dims.logo,
          height: dims.logo,
          objectFit: "cover",
          borderRadius: 6,
        }}
      />
      <div>
        <div
          style={{
            fontSize: dims.kicker,
            color: theme.gold,
            letterSpacing: "0.16em",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          APNT 2026 · CIAGA
        </div>
        <div
          style={{
            fontSize: dims.title,
            fontWeight: 700,
            color: theme.ink,
            marginTop: 6,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          Sistema de Descarte no Mar
        </div>
        <div
          style={{
            fontSize: dims.sub,
            color: theme.muted,
            marginTop: 6,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Capitão de Cabotagem · Marinha Mercante
        </div>
      </div>
    </div>
  );
};
