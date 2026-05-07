import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../theme";

interface CaptionProps {
  eyebrow?: string;
  title: string;
  body?: string | React.ReactNode;
  delay?: number;
  align?: "left" | "right" | "center";
  accentColor?: string;
}

export const Caption: React.FC<CaptionProps> = ({
  eyebrow,
  title,
  body,
  delay = 0,
  align = "left",
  accentColor = theme.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowSp = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  const titleSp = spring({ frame: frame - delay - 6, fps, config: { damping: 18 } });
  const bodySp = spring({ frame: frame - delay - 12, fps, config: { damping: 18 } });

  const ty = (s: number) => `translateY(${(1 - s) * 18}px)`;

  return (
    <div
      style={{
        textAlign: align,
        fontFamily: fonts.sans,
        maxWidth: 720,
      }}
    >
      {eyebrow && (
        <div
          style={{
            opacity: eyebrowSp,
            transform: ty(eyebrowSp),
            fontSize: 14,
            color: accentColor,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: align === "center" ? "center" : "flex-start",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 28,
              height: 2,
              background: accentColor,
              opacity: 0.7,
            }}
          />
          {eyebrow}
        </div>
      )}
      <h1
        style={{
          opacity: titleSp,
          transform: ty(titleSp),
          fontSize: 64,
          fontWeight: 700,
          margin: 0,
          letterSpacing: "-0.02em",
          color: theme.ink,
          lineHeight: 1.05,
        }}
      >
        {title}
      </h1>
      {body && (
        <div
          style={{
            opacity: bodySp,
            transform: ty(bodySp),
            marginTop: 24,
            fontSize: 22,
            lineHeight: 1.55,
            color: theme.muted,
            fontWeight: 400,
            maxWidth: 640,
            ...(align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}),
          }}
        >
          {body}
        </div>
      )}
    </div>
  );
};
