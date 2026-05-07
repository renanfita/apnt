import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../theme";

interface Props { durationInFrames: number; }

export const Intro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineSp = spring({ frame, fps, config: { damping: 20 } });
  const logoSp = spring({ frame: frame - 6, fps, config: { damping: 16 } });
  const titleSp = spring({ frame: frame - 18, fps, config: { damping: 18 } });
  const subSp = spring({ frame: frame - 30, fps, config: { damping: 18 } });
  const tagSp = spring({ frame: frame - 42, fps, config: { damping: 18 } });
  const authorSp = spring({ frame: frame - 60, fps, config: { damping: 18 } });

  const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: exit,
      }}
    >
      {/* Decoração — aros concêntricos sutis */}
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1300,
          borderRadius: "50%",
          border: `1px solid ${theme.line}`,
          opacity: 0.3,
          transform: `scale(${0.92 + Math.sin(frame / 30) * 0.02})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 880,
          height: 880,
          borderRadius: "50%",
          border: `1px solid ${theme.gold}`,
          opacity: 0.18,
        }}
      />

      <div style={{ textAlign: "center", fontFamily: fonts.sans, maxWidth: 1300 }}>
        {/* Eyebrow */}
        <div
          style={{
            opacity: lineSp,
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            color: theme.gold,
            fontSize: 16,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 36,
          }}
        >
          <span style={{ width: 40 * lineSp, height: 2, background: theme.gold }} />
          Tutorial
          <span style={{ width: 40 * lineSp, height: 2, background: theme.gold }} />
        </div>

        {/* Logo APNT */}
        <div
          style={{
            opacity: logoSp,
            transform: `scale(${0.6 + logoSp * 0.4})`,
            marginBottom: 28,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Img
            src={staticFile("assets/apnt-2026-logo.jpeg")}
            style={{
              width: 130,
              height: 130,
              objectFit: "cover",
              borderRadius: 14,
              border: `2px solid ${theme.gold}`,
              boxShadow: `0 18px 44px rgba(215, 180, 90, 0.22)`,
            }}
          />
        </div>

        {/* Kicker APNT 2026 · CIAGA */}
        <div
          style={{
            opacity: titleSp,
            color: theme.gold,
            fontSize: 18,
            letterSpacing: "0.32em",
            fontWeight: 700,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          APNT 2026 · CIAGA
        </div>

        {/* Título */}
        <h1
          style={{
            opacity: titleSp,
            transform: `translateY(${(1 - titleSp) * 24}px)`,
            fontSize: 92,
            fontWeight: 800,
            margin: 0,
            letterSpacing: "-0.025em",
            lineHeight: 1.0,
            background: `linear-gradient(180deg, ${theme.ink}, ${theme.inkSoft})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Sistema de
          <br />
          Descarte no Mar
        </h1>

        {/* Subtítulo */}
        <div
          style={{
            opacity: subSp,
            transform: `translateY(${(1 - subSp) * 18}px)`,
            marginTop: 28,
            fontSize: 24,
            color: theme.muted,
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          Capitão de Cabotagem · Marinha Mercante
          <br />
          <span style={{ fontSize: 18, color: theme.muted, opacity: 0.8 }}>
            Decreto 8.400/2015 · MARPOL 73/78 · Lei 9.966/2000
          </span>
        </div>

        {/* Tags */}
        <div
          style={{
            opacity: tagSp,
            transform: `translateY(${(1 - tagSp) * 14}px)`,
            marginTop: 44,
            display: "flex",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {["Linhas de Base", "Zonas Marítimas", "MARPOL I–VI", "Amazônia Azul"].map(
            (t, i) => (
              <span
                key={i}
                style={{
                  padding: "10px 22px",
                  borderRadius: 999,
                  background: theme.panel2,
                  border: `1px solid ${theme.lineSoft}`,
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  color: theme.inkSoft,
                  fontWeight: 500,
                }}
              >
                {t}
              </span>
            )
          )}
        </div>

        {/* Autor */}
        <div
          style={{
            opacity: authorSp,
            marginTop: 56,
            fontSize: 13,
            color: theme.muted,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Desenvolvido por{" "}
          <span style={{ color: theme.gold, fontWeight: 700 }}>1ON Renan Fita</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
