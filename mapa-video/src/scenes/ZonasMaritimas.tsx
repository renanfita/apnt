import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../theme";
import { Caption } from "../components/Caption";
import { BrazilMap } from "../components/BrazilMap";

interface Props { durationInFrames: number; }

interface Zone {
  distance: number;
  name: string;
  short: string;
  color: string;
  legalRef: string;
}

const ZONES: Zone[] = [
  { distance: 12,  name: "Mar Territorial",                  short: "12 mn",  color: theme.indigo,    legalRef: "0–12 mn · soberania plena" },
  { distance: 24,  name: "Zona Contígua",                    short: "24 mn",  color: theme.purple,    legalRef: "12–24 mn · fiscalização aduaneira/sanitária" },
  { distance: 200, name: "Zona Econômica Exclusiva",         short: "200 mn", color: theme.cyanDeep,  legalRef: "12–200 mn · recursos vivos e não-vivos" },
  { distance: 350, name: "Plataforma Continental Estendida", short: "PCE",    color: theme.cyanLight, legalRef: "Leito/subsolo além de 200 mn · não muda a coluna d'água" },
];

export const ZonasMaritimas: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Tempo de "highlight" para cada zona, em sequência
  // Cada zona tem janela de ~90 frames
  const ZONE_WINDOW = 90;
  const ZONE_START = 50;

  const enter = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, exit) }}>
      {/* Mapa centralizado-direita com bandas progressivas */}
      <div style={{ position: "absolute", right: 60, top: 90, width: 1000, height: 900 }}>
        <BrazilMap
          showBaseline
          baselineDelay={0}
          zoneAppearAt={ZONE_START}
          zones={ZONES.map((z) => ({
            distance: z.distance,
            color: z.color,
            fillOpacity: 0.20,
            strokeOpacity: 0.55,
          })).reverse()}
          width={1000}
          height={900}
        />
      </div>

      <div style={{ position: "absolute", left: 96, top: 200, width: 760 }}>
        <Caption
          eyebrow="Cap. 3 · Zonas Marítimas"
          title="Quatro faixas, regras distintas"
          accentColor={theme.cyanLight}
          body={
            <>
              A partir da linha de base, o Brasil exerce poderes distintos em cada faixa.
              Para descarte MARPOL, a decisão também depende do tipo de resíduo, da terra mais próxima e de restrições locais.
            </>
          }
        />

        {/* Cards das zonas */}
        <div
          style={{
            marginTop: 50,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {ZONES.map((z, i) => {
            const appear = spring({
              frame: frame - ZONE_START - i * 28,
              fps,
              config: { damping: 18 },
            });
            // highlight: pulsando levemente quando a zona é introduzida
            const localFrame = frame - ZONE_START - i * 28;
            const highlight = interpolate(
              localFrame,
              [0, 30, 60, ZONE_WINDOW],
              [0, 1, 1, 0.35],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  opacity: appear,
                  transform: `translateX(${(1 - appear) * -16}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "18px 22px",
                  background: theme.panel2,
                  border: `1px solid ${theme.line}`,
                  borderLeft: `4px solid ${z.color}`,
                  borderRadius: 10,
                  boxShadow: `0 0 ${24 * highlight}px ${z.color}30`,
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: z.color,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                    minWidth: 100,
                  }}
                >
                  {z.short}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 19,
                      fontWeight: 600,
                      color: theme.ink,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {z.name}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: theme.muted,
                      marginTop: 4,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {z.legalRef}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
