import React from "react";
import { Img, staticFile, interpolate, useCurrentFrame } from "remotion";
import { theme, fonts } from "../theme";

export const TopWordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        top: 36,
        left: 56,
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity,
        fontFamily: fonts.sans,
      }}
    >
      <Img
        src={staticFile("assets/apnt-2026-logo.jpeg")}
        style={{
          width: 36,
          height: 36,
          objectFit: "cover",
          borderRadius: 5,
          border: `1px solid ${theme.lineSoft}`,
        }}
      />
      <div style={{ lineHeight: 1.1 }}>
        <div
          style={{
            fontSize: 13,
            color: theme.gold,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          APNT 2026 · CIAGA
        </div>
        <div
          style={{
            fontSize: 11,
            color: theme.muted,
            letterSpacing: "0.06em",
            marginTop: 3,
            opacity: 0.85,
          }}
        >
          Sistema de Descarte no Mar · Decreto 8.400/2015 · MARPOL 73/78
        </div>
      </div>
    </div>
  );
};
