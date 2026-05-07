import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { baselineSvgPaths, baselinePoints } from "../baseline";

interface Props {
  showBaseline?: boolean;
  showPoints?: boolean;
  zones?: Array<{
    distance: number; // mn
    color: string;
    fillOpacity?: number;
    strokeOpacity?: number;
    label?: string;
  }>;
  zoneAppearAt?: number; // frame relativo
  width?: number;
  height?: number;
  baselineDelay?: number;
}

// Representação esquemática: para o vídeo, usamos o próprio path da linha de base
// e derivamos as zonas como buffers visuais. A precisão geodésica fica no mapa HTML.
// 1 milha náutica ~ 1.852 km. Em latitude ~-15, 1 grau de lon ~ 107 km.
// Então 1 mn = 0.0173° em lat (constante) ~ 0.31 px com SCALE=18.
// Usaremos um fator empírico para "abrir" as zonas com bom efeito visual.
const PX_PER_NM = 0.45; // ajustado para a estética do vídeo

export const BrazilMap: React.FC<Props> = ({
  showBaseline = true,
  showPoints = false,
  zones = [],
  zoneAppearAt = 0,
  width = 1100,
  height = 900,
  baselineDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Baseline: traça desenhando ao longo do tempo
  const drawProgress = interpolate(frame - baselineDelay, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 1100 900`}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Glow para zona ativa */}
        <filter id="softglow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradiente do oceano (sutil) */}
        <radialGradient id="oceanGrad" cx="55%" cy="50%" r="70%">
          <stop offset="0%" stopColor={theme.panel2} stopOpacity={0.0} />
          <stop offset="100%" stopColor={theme.panel} stopOpacity={0.0} />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={1100} height={900} fill="url(#oceanGrad)" />

      {/* Zonas marítimas como bandas (visual approximation) */}
      {zones.map((z, i) => {
        const appear = interpolate(
          frame - zoneAppearAt - i * 8,
          [0, 24],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const offsetPx = z.distance * PX_PER_NM * appear;
        return (
          <g key={i} opacity={appear}>
            {baselineSvgPaths.map((d, idx) => (
              <path
                key={idx}
                d={d}
                fill="none"
                stroke={z.color}
                strokeWidth={Math.max(2, offsetPx * 2)}
                strokeOpacity={z.fillOpacity ?? 0.18}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: "blur(0.5px)" }}
              />
            ))}
            {/* Linha do limite externo da zona */}
            {baselineSvgPaths.map((d, idx) => (
              <path
                key={`b-${idx}`}
                d={d}
                fill="none"
                stroke={z.color}
                strokeWidth={1.5}
                strokeOpacity={z.strokeOpacity ?? 0.55}
                strokeDasharray="6 4"
                style={{
                  transform: `translate(${offsetPx * 0.7}px, 0)`,
                }}
              />
            ))}
          </g>
        );
      })}

      {/* Linha de base */}
      {showBaseline &&
        baselineSvgPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={theme.accent}
            strokeWidth={2.5}
            strokeDasharray="6 5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDashoffset={1 - drawProgress}
            style={{
              filter: `drop-shadow(0 0 6px ${theme.accent}55)`,
            }}
          />
        ))}

      {/* Pontos LBR */}
      {showPoints &&
        baselinePoints.map((p, i) => {
          const pointDelay = baselineDelay + 30 + (i / baselinePoints.length) * 60;
          const sp = spring({
            frame: frame - pointDelay,
            fps,
            config: { damping: 14, mass: 0.6 },
          });
          return (
            <circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r={2.6 * sp}
              fill={theme.accent}
              stroke="#fff"
              strokeWidth={0.8 * sp}
              opacity={sp}
            />
          );
        })}
    </svg>
  );
};
