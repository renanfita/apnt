import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme, fonts } from "../theme";
import { Caption } from "../components/Caption";

interface Props { durationInFrames: number; }

export const HowToUse: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateRight: "clamp",
  });

  // 5 passos (incluindo Posição do Navio)
  const step = (start: number, end: number) =>
    interpolate(frame, [start, start + 8, end - 8, end], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const s1 = step(20, 75);    // ativar zonas
  const s2 = step(75, 130);   // selecionar anexo
  const s3 = step(130, 195);  // posicionar navio (lat/lon)
  const s4 = step(195, 255);  // clicar no mapa
  const s5 = step(255, 305);  // limpar tudo

  // Cursor virtual
  type Pos = { x: number; y: number };
  const cursorPositions: Array<{ at: number; pos: Pos }> = [
    { at: 20,  pos: { x: 60,  y: 200 } },   // toggle Mar Territorial
    { at: 75,  pos: { x: 90,  y: 410 } },   // botão Anexo I
    { at: 130, pos: { x: 200, y: 595 } },   // campo Latitude (ship)
    { at: 195, pos: { x: 720, y: 480 } },   // clique no mapa
    { at: 255, pos: { x: 200, y: 730 } },   // limpar tudo
    { at: 305, pos: { x: 200, y: 730 } },
  ];
  const cursorPos = (() => {
    for (let i = 0; i < cursorPositions.length - 1; i++) {
      const a = cursorPositions[i];
      const b = cursorPositions[i + 1];
      if (frame >= a.at && frame < b.at) {
        const t = interpolate(frame, [a.at, b.at], [0, 1]);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        return {
          x: a.pos.x + (b.pos.x - a.pos.x) * eased,
          y: a.pos.y + (b.pos.y - a.pos.y) * eased,
        };
      }
    }
    return cursorPositions[cursorPositions.length - 1].pos;
  })();

  const sidebarItems = [
    { id: "tb", label: "Linhas de Base (LBR + LBN)", checked: true },
    { id: "tp", label: "Pontos LBR (vértices)", checked: true },
    { id: "tt", label: "Mar Territorial (12 mn)", checked: s1 > 0.3 || s4 > 0 },
    { id: "tc", label: "Zona Contígua (24 mn)", checked: false },
    { id: "te", label: "ZEE (200 mn)", checked: false },
  ];
  const annexButtons = [
    { num: "I",  title: "Óleo",           active: s2 > 0.3 || s4 > 0 },
    { num: "II", title: "Subst. L. Nocivas", active: false },
    { num: "III", title: "Embaladas",     active: false },
    { num: "IV", title: "Esgoto",         active: false },
    { num: "V",  title: "Lixo",           active: false },
    { num: "VI", title: "Atmosfera",      active: false },
  ];

  // Coordenadas digitadas progressivamente
  const latStr = "23° 00.000' S";
  const lonStr = "043° 12.000' W";
  const typedLat = latStr.slice(0, Math.max(0, Math.floor(interpolate(frame, [130, 165], [0, latStr.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))));
  const typedLon = lonStr.slice(0, Math.max(0, Math.floor(interpolate(frame, [148, 180], [0, lonStr.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))));

  return (
    <AbsoluteFill style={{ opacity: Math.min(enter, exit) }}>
      <div style={{ position: "absolute", left: 96, top: 130, width: 700 }}>
        <Caption
          eyebrow="Cap. 5 · Como Usar"
          title="Cinco passos"
          accentColor={theme.gold}
        />

        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            { label: "Ative as zonas marítimas que quer ver",                          strength: s1, color: theme.indigo },
            { label: "Clique em um anexo MARPOL para abrir as regras",                 strength: s2, color: theme.gold },
            { label: "Insira a posição do navio (graus-minutos ou DD)",                strength: s3, color: theme.goldLight },
            { label: "Ou clique direto no mapa para identificar a zona",               strength: s4, color: theme.cyanLight },
            { label: "Use “Limpar tudo” para começar do zero",                         strength: s5, color: theme.muted },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                opacity: 0.42 + step.strength * 0.58,
                transform: `translateX(${step.strength * 6}px)`,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: step.strength > 0.3 ? step.color : theme.panel2,
                  border: `1.5px solid ${step.strength > 0.3 ? step.color : theme.line}`,
                  color: step.strength > 0.3 ? "#0b1729" : theme.muted,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 16,
                  flexShrink: 0,
                  boxShadow: step.strength > 0.5 ? `0 0 24px ${step.color}55` : "none",
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: step.strength > 0.3 ? theme.ink : theme.muted,
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
              >
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock UI à direita */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 100,
          width: 1000,
          height: 850,
          background: theme.panel,
          border: `1px solid ${theme.line}`,
          borderRadius: 14,
          overflow: "hidden",
          fontFamily: fonts.sans,
          display: "flex",
          opacity: spring({ frame, fps, config: { damping: 18 } }),
          boxShadow: `0 30px 80px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: 380,
            background: theme.panel,
            borderRight: `1px solid ${theme.line}`,
            padding: "20px 22px",
            fontSize: 13,
            overflow: "hidden",
          }}
        >
          {/* Brand mini */}
          <div
            style={{
              display: "flex",
              gap: 10,
              padding: "8px 10px",
              border: `1px solid ${theme.lineSoft}`,
              borderRadius: 6,
              marginBottom: 14,
              background: "rgba(20,34,60,0.4)",
            }}
          >
            <Img
              src={staticFile("assets/apnt-2026-logo.jpeg")}
              style={{
                width: 32,
                height: 32,
                borderRadius: 4,
                objectFit: "cover",
              }}
            />
            <div>
              <div style={{ color: theme.gold, fontSize: 9, letterSpacing: "0.14em", fontWeight: 700 }}>
                APNT 2026 · CIAGA
              </div>
              <div style={{ color: theme.ink, fontSize: 12, fontWeight: 600, marginTop: 2 }}>
                Sistema de Descarte no Mar
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 11, color: theme.gold, letterSpacing: "0.14em",
              textTransform: "uppercase", fontWeight: 700, marginBottom: 8,
            }}
          >
            Camadas de Base
          </div>
          {sidebarItems.map((it) => (
            <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div
                style={{
                  width: 14, height: 14, borderRadius: 3,
                  background: it.checked ? theme.gold : "transparent",
                  border: `1.5px solid ${it.checked ? theme.gold : theme.muted}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: theme.bg, fontWeight: 800,
                }}
              >
                {it.checked && "✓"}
              </div>
              <span style={{ color: theme.inkSoft, fontSize: 11.5 }}>{it.label}</span>
            </div>
          ))}

          <div
            style={{
              fontSize: 11, color: theme.gold, letterSpacing: "0.14em",
              textTransform: "uppercase", fontWeight: 700, marginTop: 18, marginBottom: 8,
            }}
          >
            Anexos MARPOL
          </div>
          {annexButtons.map((b) => (
            <div
              key={b.num}
              style={{
                padding: "7px 10px",
                marginBottom: 4,
                borderRadius: 5,
                background: b.active ? "linear-gradient(90deg, rgba(215,180,90,0.22), rgba(215,180,90,0.08))" : theme.panel2,
                border: `1px solid ${b.active ? theme.gold : theme.line}`,
                fontSize: 11,
                color: b.active ? theme.ink : theme.inkSoft,
                fontWeight: 500,
              }}
            >
              Anexo {b.num} — {b.title}
            </div>
          ))}

          {/* Posição do Navio */}
          <div
            style={{
              fontSize: 11, color: theme.gold, letterSpacing: "0.14em",
              textTransform: "uppercase", fontWeight: 700, marginTop: 18, marginBottom: 8,
            }}
          >
            Posição do Navio
          </div>
          <div
            style={{
              padding: 10,
              border: `1px solid ${s3 > 0.3 ? theme.gold : theme.line}`,
              borderRadius: 6,
              background: theme.panel2,
              boxShadow: s3 > 0.5 ? `0 0 18px ${theme.gold}33` : "none",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              <div>
                <div style={{ fontSize: 9, color: theme.muted, letterSpacing: "0.1em", marginBottom: 3 }}>
                  LATITUDE
                </div>
                <div
                  style={{
                    background: theme.bg,
                    border: `1px solid ${s3 > 0.3 ? theme.gold : theme.line}`,
                    padding: "6px 8px",
                    borderRadius: 4,
                    fontSize: 11,
                    color: theme.ink,
                    fontFamily: fonts.mono,
                    minHeight: 22,
                  }}
                >
                  {typedLat || <span style={{ color: theme.muted }}>23° 00.000' S</span>}
                  {s3 > 0.3 && typedLat.length < latStr.length && (
                    <span style={{ opacity: Math.floor(frame / 8) % 2 ? 1 : 0 }}>|</span>
                  )}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: theme.muted, letterSpacing: "0.1em", marginBottom: 3 }}>
                  LONGITUDE
                </div>
                <div
                  style={{
                    background: theme.bg,
                    border: `1px solid ${s3 > 0.3 ? theme.gold : theme.line}`,
                    padding: "6px 8px",
                    borderRadius: 4,
                    fontSize: 11,
                    color: theme.ink,
                    fontFamily: fonts.mono,
                    minHeight: 22,
                  }}
                >
                  {typedLon || <span style={{ color: theme.muted }}>043° 12.000' W</span>}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <div
                style={{
                  flex: 1, padding: "6px 8px", borderRadius: 4,
                  border: `1px solid ${theme.gold}`,
                  textAlign: "center", fontSize: 10, color: theme.gold,
                  fontWeight: 600, letterSpacing: "0.05em",
                }}
              >
                Posicionar
              </div>
              <div
                style={{
                  flex: 1, padding: "6px 8px", borderRadius: 4,
                  border: `1px solid ${theme.line}`,
                  textAlign: "center", fontSize: 10, color: theme.muted,
                  fontWeight: 500,
                }}
              >
                Centralizar
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 12,
              padding: "8px 10px",
              borderRadius: 5,
              background: s5 > 0.3 ? "#5a1818" : "#2a1010",
              border: `1px solid ${s5 > 0.3 ? "#dc2626" : "#7f1d1d"}`,
              textAlign: "center",
              fontSize: 11,
              color: "#fecaca",
              fontWeight: 600,
              boxShadow: s5 > 0.5 ? `0 0 16px #ef444466` : "none",
            }}
          >
            Limpar tudo
          </div>
        </div>

        {/* Mapa mock */}
        <div
          style={{
            flex: 1,
            background: `radial-gradient(ellipse at 60% 50%, #0e2240 0%, #08152a 60%, #050d1d 100%)`,
            position: "relative",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 620 850" style={{ position: "absolute", inset: 0 }}>
            {/* Land */}
            <path
              d="M 60 200 L 230 100 L 280 80 L 360 110 L 410 200 L 480 280 L 470 370 L 480 450 L 440 530 L 380 620 L 290 700 L 200 760 L 130 770 L 100 720 L 60 600 L 30 480 L 50 360 L 60 200 Z"
              fill="#1a2e44" opacity={0.55} stroke={theme.gold} strokeOpacity={0.4} strokeWidth={1.4}
            />
            {/* Coast baseline */}
            <path
              d="M 410 200 L 480 280 L 470 370 L 480 450 L 440 530 L 380 620 L 290 700 L 200 760"
              fill="none" stroke={theme.gold} strokeWidth={2.4} strokeDasharray="6 5" opacity={0.95}
            />
            {(s1 > 0.3 || s4 > 0) && (
              <path
                d="M 410 200 L 480 280 L 470 370 L 480 450 L 440 530 L 380 620 L 290 700 L 200 760"
                fill="none" stroke={theme.indigo}
                strokeWidth={Math.max(2, 14 * Math.max(s1, s4))} strokeOpacity={0.28}
                style={{ filter: "blur(0.5px)" }} transform="translate(50, 0)"
              />
            )}
            {(s2 > 0.3 || s4 > 0) && (
              <>
                <path
                  d="M 410 200 L 480 280 L 470 370 L 480 450 L 440 530 L 380 620 L 290 700 L 200 760"
                  fill="none" stroke={theme.red}
                  strokeWidth={Math.max(2, 22 * Math.max(s2, s4))} strokeOpacity={0.22}
                  style={{ filter: "blur(0.6px)" }} transform="translate(40, 0)"
                />
                <path
                  d="M 410 200 L 480 280 L 470 370 L 480 450 L 440 530 L 380 620 L 290 700 L 200 760"
                  fill="none" stroke={theme.yellow}
                  strokeWidth={Math.max(3, 60 * Math.max(s2, s4))} strokeOpacity={0.16}
                  style={{ filter: "blur(0.8px)" }} transform="translate(110, 0)"
                />
              </>
            )}

            {/* Ship icon — aparece quando s3 ativo */}
            {s3 > 0.3 && (
              <g transform="translate(485, 480)" opacity={s3}>
                <circle r={18} fill={theme.gold} fillOpacity={0.18} />
                <circle r={9} fill={theme.gold} stroke="#fff" strokeWidth={1.5} />
                <text x={20} y={-12} fill={theme.gold} fontSize={11} fontWeight={700} fontFamily={fonts.mono}>
                  M/V APNT
                </text>
                <text x={20} y={4} fill={theme.muted} fontSize={9} fontFamily={fonts.mono}>
                  23°S · 43°W
                </text>
              </g>
            )}
          </svg>

          {/* Popup ao clicar */}
          {s4 > 0.3 && (
            <div
              style={{
                position: "absolute",
                left: 320, top: 380,
                background: "#0b1729",
                border: `1px solid ${theme.gold}`,
                borderRadius: 6,
                padding: "10px 14px",
                fontSize: 11,
                color: theme.ink,
                opacity: s4,
                boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                maxWidth: 280,
                lineHeight: 1.5,
              }}
            >
              <b style={{ color: "#fff" }}>Posição do navio</b><br />
              <span style={{ color: theme.muted, fontSize: 10 }}>Lat: -23.50° · Lon: -42.30°</span><br />
              <b style={{ color: theme.gold }}>Zona Contígua (12–24 mn)</b>
            </div>
          )}
        </div>

        {/* Cursor */}
        <svg
          style={{ position: "absolute", left: cursorPos.x, top: cursorPos.y, pointerEvents: "none" }}
          width={28} height={28} viewBox="0 0 28 28"
        >
          <path
            d="M 4 2 L 4 22 L 9 18 L 12 24 L 14 23 L 11 17 L 18 17 Z"
            fill="#fff" stroke="#000" strokeWidth={1} strokeLinejoin="round"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
