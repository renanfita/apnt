import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../theme";
import { Caption } from "../components/Caption";

interface Props { durationInFrames: number; }

interface Annex {
  num: string;
  title: string;
  subject: string;
  rules: Array<{ tag: "PROIBIDO" | "CONDICIONAL" | "PERMITIDO"; text: string }>;
  accent: string;
}

const ANNEXES: Annex[] = [
  {
    num: "I",
    title: "Óleo",
    subject: "Hidrocarbonetos · água oleosa · resíduos de carga",
    accent: theme.red,
    rules: [
      { tag: "PROIBIDO", text: "Sludge, trapos/filtros e resíduos oleosos: nunca ao mar" },
      { tag: "CONDICIONAL", text: "Porão de máquinas: em rota, ≤15 ppm, separador/alarme aprovado" },
      { tag: "PROIBIDO", text: "Petroleiro: resíduos de carga/lastro sujo <50 mn da terra mais próxima" },
    ],
  },
  {
    num: "II",
    title: "Subst. Líq. Nocivas",
    subject: "Produtos químicos a granel (Cat. X · Y · Z · OS)",
    accent: theme.orange,
    rules: [
      { tag: "PROIBIDO", text: "Cat. X: pré-lavagem e recepção obrigatória em porto" },
      { tag: "CONDICIONAL", text: "Cat. Y/Z: P&A Manual, em rota, >12 mn e profundidade >25 m" },
    ],
  },
  {
    num: "III",
    title: "Subst. Embaladas",
    subject: "Cargas perigosas em embalagem · Código IMDG",
    accent: theme.red,
    rules: [
      { tag: "PROIBIDO", text: "Perda ou lançamento operacional em qualquer zona" },
      { tag: "CONDICIONAL", text: "Alijamento só por segurança do navio ou vidas" },
    ],
  },
  {
    num: "IV",
    title: "Esgoto Sanitário",
    subject: "Águas servidas · banheiros · hospital",
    accent: theme.yellow,
    rules: [
      { tag: "PROIBIDO", text: "0–3 mn: esgoto bruto; portos/baías: reter ou tratar" },
      { tag: "CONDICIONAL", text: "3–12 mn: triturado/desinfetado; ≥12 mn bruto em rota ≥4 nós" },
      { tag: "PERMITIDO", text: "ETE aprovada: efluente, salvo regra local mais restritiva" },
    ],
  },
  {
    num: "V",
    title: "Lixo",
    subject: "Plásticos · alimentos · papelão · vidro",
    accent: theme.red,
    rules: [
      { tag: "PROIBIDO", text: "Plásticos, óleo de cozinha, cinzas, vidro/metal/papel: zero descarga" },
      { tag: "CONDICIONAL", text: "Alimentos triturados >3 mn; não triturados >12 mn, em rota" },
      { tag: "CONDICIONAL", text: "Resíduo de carga não-HME >12 mn; HME proibido" },
    ],
  },
  {
    num: "VI",
    title: "Poluição Atmosférica",
    subject: "SOx · NOx · SDOs · incineração",
    accent: theme.cyan,
    rules: [
      { tag: "CONDICIONAL", text: "Combustível global ≤0,50% m/m; ECA só onde designada" },
      { tag: "PROIBIDO", text: "SDOs deliberadas; incinerar PCBs e resíduos proibidos" },
    ],
  },
];

const tagColors: Record<Annex["rules"][0]["tag"], { bg: string; fg: string }> = {
  PROIBIDO:    { bg: "#7f1d1d", fg: "#fecaca" },
  CONDICIONAL: { bg: "#713f12", fg: "#fef08a" },
  PERMITIDO:   { bg: "#14532d", fg: "#bbf7d0" },
};

export const MarpolAnnexes: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, exit), padding: "120px 96px 60px" }}>
      <div style={{ marginBottom: 36 }}>
        <Caption
          eyebrow="Cap. 4 · MARPOL 73/78"
          title="Seis Anexos, Seis Categorias"
          accentColor={theme.accent}
          body="A Convenção Internacional para Prevenção da Poluição por Navios da IMO categoriza poluentes em seis anexos. A regra aplicável muda por resíduo, equipamento aprovado, rota e distância da terra mais próxima."
        />
      </div>

      {/* Grid 3x2 dos anexos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 22,
          marginTop: 36,
          flex: 1,
        }}
      >
        {ANNEXES.map((a, i) => {
          const sp = spring({
            frame: frame - 30 - i * 14,
            fps,
            config: { damping: 18, mass: 0.7 },
          });
          return (
            <div
              key={i}
              style={{
                opacity: sp,
                transform: `translateY(${(1 - sp) * 22}px) scale(${0.96 + sp * 0.04})`,
                background: `linear-gradient(160deg, ${theme.panel2} 0%, ${theme.panel} 100%)`,
                border: `1px solid ${theme.line}`,
                borderRadius: 14,
                padding: "26px 30px",
                position: "relative",
                overflow: "hidden",
                fontFamily: fonts.sans,
              }}
            >
              {/* Stripe top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: a.accent,
                  opacity: 0.9,
                }}
              />
              {/* Numeração */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    color: a.accent,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Anexo {a.num}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: theme.line,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: theme.ink,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                }}
              >
                {a.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: theme.muted,
                  marginTop: 6,
                  letterSpacing: "0.03em",
                }}
              >
                {a.subject}
              </div>

              {/* Rules */}
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                {a.rules.map((r, ri) => {
                  const c = tagColors[r.tag];
                  return (
                    <div
                      key={ri}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 13,
                        color: theme.inkSoft,
                        lineHeight: 1.4,
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
                          marginTop: 1,
                        }}
                      >
                        {r.tag}
                      </span>
                      <span>{r.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
