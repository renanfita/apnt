import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../theme";
import { Caption } from "../components/Caption";
import { BrazilMap } from "../components/BrazilMap";

interface Props { durationInFrames: number; }

export const AmazoniaAzul: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Contador animado de área km² (até 5.700.000)
  const counterProgress = interpolate(frame, [60, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const target = 5_700_000;
  const counterValue = Math.round(target * counterProgress);
  const counterStr = counterValue.toLocaleString("pt-BR");

  const enter = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateRight: "clamp" }
  );

  // Itens da AJB (Águas Jurisdicionais Brasileiras)
  const items = [
    { label: "Águas Interiores", desc: "rios, baías, portos", color: theme.indigo },
    { label: "Mar Territorial", desc: "12 mn — soberania plena", color: theme.indigo },
    { label: "Zona Contígua", desc: "12–24 mn — fiscalização", color: theme.purple },
    { label: "ZEE", desc: "até 200 mn — recursos vivos e não-vivos", color: theme.cyan },
    { label: "Plataforma Continental Estendida", desc: "leito/subsolo além de 200 mn", color: theme.cyanLight },
  ];

  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, exit) }}>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 200,
          width: 800,
          fontFamily: fonts.sans,
        }}
      >
        <Caption
          eyebrow="Cap. 1 · Amazônia Azul"
          title="O patrimônio marítimo brasileiro"
          accentColor={theme.cyanLight}
          body="Conjunto de águas jurisdicionais e fundos marinhos sob direitos soberanos brasileiros — fonte de petróleo, biodiversidade, pesca e a principal via do nosso comércio exterior."
        />

        {/* Big number */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              color: theme.cyanLight,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              textShadow: `0 0 24px ${theme.cyan}40`,
            }}
          >
            {counterStr}
          </div>
          <div style={{ fontSize: 36, color: theme.muted, fontWeight: 500 }}>km²</div>
        </div>
        <div
          style={{
            marginTop: 6,
            color: theme.muted,
            fontSize: 16,
            letterSpacing: "0.05em",
            opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          ~5,7 milhões — equivalente a ~67% do território terrestre do Brasil
        </div>

        {/* Stack de zonas que compõem a AJB */}
        <div style={{ marginTop: 60, display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((it, i) => {
            const sp = spring({
              frame: frame - 110 - i * 14,
              fps,
              config: { damping: 18 },
            });
            return (
              <div
                key={i}
                style={{
                  opacity: sp,
                  transform: `translateX(${(1 - sp) * -16}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 16px",
                  background: theme.panel2,
                  border: `1px solid ${theme.line}`,
                  borderLeft: `3px solid ${it.color}`,
                  borderRadius: 8,
                }}
              >
                <span style={{ color: it.color, fontWeight: 700, fontSize: 18 }}>{it.label}</span>
                <span style={{ color: theme.muted, fontSize: 15 }}>· {it.desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mapa do Brasil à direita com bandas suaves animando */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 100,
          width: 850,
          height: 850,
        }}
      >
        <BrazilMap
          showBaseline
          baselineDelay={20}
          zoneAppearAt={130}
          zones={[
            { distance: 350, color: theme.cyan, fillOpacity: 0.10, strokeOpacity: 0.45 },
            { distance: 200, color: theme.cyanDeep, fillOpacity: 0.16, strokeOpacity: 0.5 },
            { distance: 12, color: theme.indigo, fillOpacity: 0.25, strokeOpacity: 0.6 },
          ]}
          width={850}
          height={850}
        />
        {/* Etiqueta lateral */}
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 30,
            color: theme.muted,
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Representação esquemática
        </div>
      </div>
    </AbsoluteFill>
  );
};
