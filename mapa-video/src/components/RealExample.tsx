import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme, fonts } from "../theme";
import { Caption } from "./Caption";

export interface RealExampleData {
  index: string;             // ex: "1 de 3"
  region: string;            // ex: "Porto de Santos · SP"
  title: string;             // ex: "Petroleiro saindo do porto"
  vesselType: string;        // ex: "Petroleiro · 250 m"
  vesselName: string;        // ex: "M/T BRAZILIAN STAR"
  latStr: string;
  lonStr: string;
  zone: { name: string; range: string; color: string };
  annexNum: string;          // ex: "I"
  annexTitle: string;        // ex: "Óleo"
  rules: Array<{ tag: "PROIBIDO" | "CONDICIONAL" | "PERMITIDO"; text: string }>;
  observation?: string;
  /**
   * SVG schematic mock map: a (1100×700) viewport with land + coastline path.
   * Provide land path and coast (baseline) path that fits the regional zoom.
   */
  mock: {
    landPath: string;
    coastPath: string;
    shipScreenPos: { x: number; y: number };
    shipMoveTo?: { x: number; y: number }; // se quiser animar o navio
    background?: string;
    bandOffsets?: { x: number; y: number; nm: number; color: string }[]; // offset and color
  };
}

const tagColors: Record<RealExampleData["rules"][0]["tag"], { bg: string; fg: string }> = {
  PROIBIDO:    { bg: "#7f1d1d", fg: "#fecaca" },
  CONDICIONAL: { bg: "#713f12", fg: "#fef08a" },
  PERMITIDO:   { bg: "#14532d", fg: "#bbf7d0" },
};

interface Props { data: RealExampleData; durationInFrames: number; }

export const RealExample: React.FC<Props> = ({ data, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateRight: "clamp" }
  );

  const titleSp = spring({ frame, fps, config: { damping: 18 } });
  const cardSp = spring({ frame: frame - 12, fps, config: { damping: 18 } });
  const mapSp = spring({ frame: frame - 6, fps, config: { damping: 18 } });
  const shipSp = spring({ frame: frame - 30, fps, config: { damping: 14 } });
  const ruleSp = spring({ frame: frame - 50, fps, config: { damping: 18 } });

  // Animate ship from start to shipMoveTo (if defined)
  const moveProgress = interpolate(frame, [40, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sx = data.mock.shipMoveTo
    ? data.mock.shipScreenPos.x + (data.mock.shipMoveTo.x - data.mock.shipScreenPos.x) * moveProgress
    : data.mock.shipScreenPos.x;
  const sy = data.mock.shipMoveTo
    ? data.mock.shipScreenPos.y + (data.mock.shipMoveTo.y - data.mock.shipScreenPos.y) * moveProgress
    : data.mock.shipScreenPos.y;

  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, exit), padding: "120px 80px 60px" }}>
      <div style={{ display: "flex", gap: 48, alignItems: "stretch", height: "100%" }}>

        {/* COLUNA ESQUERDA - texto */}
        <div style={{ flex: "0 0 660px", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              opacity: titleSp,
              fontSize: 12,
              color: theme.gold,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            Caso de Uso · {data.index}
          </div>

          <Caption
            eyebrow={data.region}
            title={data.title}
            accentColor={theme.gold}
          />

          {/* Card do navio — coordenadas */}
          <div
            style={{
              opacity: cardSp,
              transform: `translateY(${(1 - cardSp) * 14}px)`,
              marginTop: 36,
              padding: "20px 24px",
              background: theme.panel2,
              border: `1px solid ${theme.lineSoft}`,
              borderLeft: `4px solid ${theme.gold}`,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: theme.gold,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Posição do Navio
            </div>
            <div
              style={{
                fontSize: 22,
                color: theme.ink,
                fontWeight: 600,
                marginBottom: 4,
                letterSpacing: "-0.01em",
              }}
            >
              {data.vesselName}
            </div>
            <div style={{ fontSize: 13, color: theme.muted, marginBottom: 12 }}>
              {data.vesselType}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                fontFamily: fonts.mono,
                fontSize: 18,
                color: theme.goldLight,
              }}
            >
              <div>
                <div style={{ fontSize: 9, color: theme.muted, letterSpacing: "0.18em", marginBottom: 3, fontFamily: fonts.sans }}>
                  LATITUDE
                </div>
                {data.latStr}
              </div>
              <div>
                <div style={{ fontSize: 9, color: theme.muted, letterSpacing: "0.18em", marginBottom: 3, fontFamily: fonts.sans }}>
                  LONGITUDE
                </div>
                {data.lonStr}
              </div>
            </div>
          </div>

          {/* Zone identificada */}
          <div
            style={{
              opacity: cardSp,
              transform: `translateY(${(1 - cardSp) * 14}px)`,
              marginTop: 12,
              padding: "12px 18px",
              background: theme.panel,
              border: `1px solid ${data.zone.color}`,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: data.zone.color,
                boxShadow: `0 0 10px ${data.zone.color}`,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: theme.muted,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Zona identificada
              </div>
              <div style={{ fontSize: 17, color: theme.ink, fontWeight: 600 }}>
                {data.zone.name} <span style={{ color: theme.muted, fontWeight: 400, fontSize: 14 }}>· {data.zone.range}</span>
              </div>
            </div>
          </div>

          {/* Anexo + regras */}
          <div
            style={{
              opacity: ruleSp,
              transform: `translateY(${(1 - ruleSp) * 14}px)`,
              marginTop: 18,
              padding: "18px 22px",
              background: `linear-gradient(160deg, ${theme.panel2} 0%, ${theme.panel} 100%)`,
              border: `1px solid ${theme.lineSoft}`,
              borderRadius: 10,
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: theme.gold,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Anexo MARPOL {data.annexNum}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: theme.ink, marginBottom: 14 }}>
              {data.annexTitle}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {data.rules.map((r, i) => {
                const c = tagColors[r.tag];
                const itemSp = spring({ frame: frame - 60 - i * 10, fps, config: { damping: 18 } });
                return (
                  <div
                    key={i}
                    style={{
                      opacity: itemSp,
                      transform: `translateX(${(1 - itemSp) * -10}px)`,
                      display: "flex",
                      gap: 10,
                      fontSize: 14,
                      color: theme.inkSoft,
                      lineHeight: 1.45,
                    }}
                  >
                    <span
                      style={{
                        background: c.bg,
                        color: c.fg,
                        fontSize: 9.5,
                        padding: "3px 7px",
                        borderRadius: 3,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        flexShrink: 0,
                        marginTop: 2,
                        height: "fit-content",
                      }}
                    >
                      {r.tag}
                    </span>
                    <span>{r.text}</span>
                  </div>
                );
              })}
            </div>

            {data.observation && (
              <div
                style={{
                  marginTop: 14,
                  paddingTop: 12,
                  borderTop: `1px solid ${theme.line}`,
                  fontSize: 12,
                  color: theme.muted,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                {data.observation}
              </div>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA - mapa schematic */}
        <div
          style={{
            flex: 1,
            opacity: mapSp,
            transform: `scale(${0.97 + mapSp * 0.03})`,
            background: data.mock.background ?? `radial-gradient(ellipse at 60% 50%, #0e2240 0%, #08152a 60%, #050d1d 100%)`,
            border: `1px solid ${theme.line}`,
            borderRadius: 14,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1100 700"
            style={{ position: "absolute", inset: 0 }}
          >
            {/* land */}
            <path
              d={data.mock.landPath}
              fill="#1a2e44"
              opacity={0.6}
              stroke={theme.gold}
              strokeOpacity={0.32}
              strokeWidth={1.4}
            />

            {/* zone bands (each band is the coast path translated by offset, with width = nm * factor) */}
            {data.mock.bandOffsets?.map((b, i) => (
              <path
                key={i}
                d={data.mock.coastPath}
                fill="none"
                stroke={b.color}
                strokeWidth={Math.max(2, b.nm * 1.2)}
                strokeOpacity={0.22}
                style={{ filter: "blur(0.6px)" }}
                transform={`translate(${b.x}, ${b.y})`}
              />
            ))}

            {/* coastline */}
            <path
              d={data.mock.coastPath}
              fill="none"
              stroke={theme.gold}
              strokeWidth={2.2}
              strokeDasharray="6 5"
              opacity={0.95}
            />

            {/* ship trail (if moving) */}
            {data.mock.shipMoveTo && (
              <path
                d={`M ${data.mock.shipScreenPos.x} ${data.mock.shipScreenPos.y} L ${sx} ${sy}`}
                stroke={theme.gold}
                strokeWidth={1.2}
                strokeDasharray="2 4"
                opacity={0.5}
                fill="none"
              />
            )}

            {/* ship */}
            <g
              transform={`translate(${sx}, ${sy}) scale(${0.7 + shipSp * 0.3})`}
              opacity={shipSp}
            >
              <circle r={22} fill={theme.gold} fillOpacity={0.16} />
              <circle r={11} fill={theme.gold} stroke="#fff" strokeWidth={1.6} />
              <text
                x={20}
                y={-14}
                fill={theme.gold}
                fontSize={13}
                fontWeight={700}
                fontFamily={fonts.mono}
              >
                {data.vesselName.split(" ")[0]} {data.vesselName.split(" ")[1] ?? ""}
              </text>
              <text
                x={20}
                y={4}
                fill={theme.muted}
                fontSize={10}
                fontFamily={fonts.mono}
              >
                {data.latStr.replace(/\s/g, "")}
              </text>
            </g>
          </svg>

          {/* Region tag superior */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 22,
              fontSize: 11,
              color: theme.muted,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              opacity: mapSp,
            }}
          >
            ▣ {data.region}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
