import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../theme";

interface Props { durationInFrames: number; }

const SOURCES = [
  "Decreto 8.400/2015",
  "Lei 8.617/1993",
  "Lei 9.966/2000",
  "Decreto 4.136/2002",
  "Lei 13.187/2015",
  "MARPOL 73/78 (IMO)",
  "NORMAM-401/DPC",
  "DHN / Cartas Náuticas",
  "LEPLAC / CIRM",
];

export const Outro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateRight: "clamp",
  });

  const bannerSp = spring({ frame, fps, config: { damping: 16 } });
  const titleSp = spring({ frame: frame - 18, fps, config: { damping: 18 } });
  const subSp = spring({ frame: frame - 30, fps, config: { damping: 18 } });
  const authorSp = spring({ frame: frame - 42, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(enter, exit),
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: fonts.sans,
        padding: "80px 96px",
      }}
    >
      {/* Linhas decorativas */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: "10%",
          right: "10%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${theme.gold}, transparent)`,
          opacity: bannerSp * 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "10%",
          right: "10%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${theme.gold}, transparent)`,
          opacity: bannerSp * 0.7,
        }}
      />

      {/* Banner Marinha */}
      <div
        style={{
          opacity: bannerSp,
          transform: `scale(${0.94 + bannerSp * 0.06})`,
          marginBottom: 36,
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${theme.lineSoft}`,
          boxShadow: "0 18px 60px rgba(0,0,0,0.5)",
          maxWidth: 1100,
        }}
      >
        <Img
          src={staticFile("assets/apnt-2026-marinha-banner.png")}
          style={{
            width: "100%",
            display: "block",
            maxHeight: 320,
            objectFit: "cover",
          }}
        />
      </div>

      {/* Kicker */}
      <div
        style={{
          opacity: titleSp,
          fontSize: 13,
          color: theme.gold,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 18,
        }}
      >
        APNT 2026 · CIAGA
      </div>

      <h1
        style={{
          opacity: titleSp,
          transform: `translateY(${(1 - titleSp) * 18}px)`,
          fontSize: 56,
          fontWeight: 700,
          margin: 0,
          letterSpacing: "-0.025em",
          color: theme.ink,
          lineHeight: 1.05,
          maxWidth: 1100,
        }}
      >
        Conhecer e proteger
        a <span style={{ color: theme.gold }}>Amazônia Azul</span>
      </h1>

      <div
        style={{
          opacity: subSp,
          marginTop: 22,
          fontSize: 17,
          color: theme.muted,
          fontWeight: 400,
          letterSpacing: "0.04em",
          maxWidth: 800,
        }}
      >
        16 de novembro · Dia da Amazônia Azul (Lei 13.187/2015)
      </div>

      {/* Fontes */}
      <div
        style={{
          marginTop: 32,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
          maxWidth: 1100,
        }}
      >
        {SOURCES.map((s, i) => {
          const sp = spring({
            frame: frame - 50 - i * 4,
            fps,
            config: { damping: 18 },
          });
          return (
            <div
              key={i}
              style={{
                opacity: sp * 0.85,
                transform: `translateY(${(1 - sp) * 8}px)`,
                padding: "7px 14px",
                fontSize: 12,
                color: theme.muted,
                background: theme.panel2,
                border: `1px solid ${theme.lineSoft}`,
                borderRadius: 999,
                letterSpacing: "0.03em",
              }}
            >
              {s}
            </div>
          );
        })}
      </div>

      {/* Autor */}
      <div
        style={{
          opacity: authorSp,
          marginTop: 36,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: theme.muted,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Desenvolvido por
        </div>
        <div
          style={{
            fontSize: 22,
            color: theme.gold,
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          1ON Renan Fita
        </div>
      </div>
    </AbsoluteFill>
  );
};
