import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../theme";
import { Caption } from "../components/Caption";
import { BrazilMap } from "../components/BrazilMap";
import { baselinePointCount } from "../baseline";

interface Props { durationInFrames: number; }

export const LinhasDeBase: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pointsAppear = interpolate(frame, [60, 200], [0, baselinePointCount], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enter = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, exit) }}>
      {/* Mapa centralizado-direita */}
      <div
        style={{
          position: "absolute",
          left: 850,
          top: 90,
          width: 1000,
          height: 900,
        }}
      >
        <BrazilMap
          showBaseline
          showPoints
          baselineDelay={20}
          width={1000}
          height={900}
        />
        {/* labels de extremos */}
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 90,
            color: theme.accent,
            fontSize: 13,
            fontFamily: fonts.sans,
            letterSpacing: "0.05em",
            opacity: spring({ frame: frame - 90, fps, config: { damping: 18 } }),
          }}
        >
          ↖ Foz do Oiapoque (AP) · 4°30′N
        </div>
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 800,
            color: theme.accent,
            fontSize: 13,
            fontFamily: fonts.sans,
            letterSpacing: "0.05em",
            opacity: spring({ frame: frame - 130, fps, config: { damping: 18 } }),
          }}
        >
          ↘ Chuí (RS) · 33°44′S
        </div>
      </div>

      {/* Texto à esquerda */}
      <div style={{ position: "absolute", left: 96, top: 220, width: 720 }}>
        <Caption
          eyebrow="Cap. 2 · Linhas de Base"
          title="Onde tudo começa"
          accentColor={theme.accent}
          body={
            <>
              O <b style={{ color: theme.ink }}>Decreto 8.400/2015</b> define os pontos de
              onde se medem as zonas marítimas — combinação de
              <b style={{ color: theme.ink }}> Linhas de Base Retas</b> (LBR) e a
              linha de baixa-mar (LBN) indicada nas cartas náuticas da DHN.
            </>
          }
        />

        {/* Stats grid */}
        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            opacity: spring({ frame: frame - 60, fps, config: { damping: 18 } }),
          }}
        >
          {[
            { v: Math.round(pointsAppear), max: baselinePointCount, label: "pontos LBR plotados", suffix: "" },
            { v: 1, max: 1, label: "sistema geodésico", suffix: "WGS-84", text: true },
            { v: 7491, max: 7491, label: "km de litoral continental", suffix: "" },
            { v: 1, max: 1, label: "LBN em cartas náuticas", suffix: "DHN", text: true },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: theme.panel2,
                border: `1px solid ${theme.line}`,
                borderRadius: 10,
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: theme.accent,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.text ? s.suffix : s.v.toLocaleString("pt-BR")}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  color: theme.muted,
                  letterSpacing: "0.04em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
