import React from "react";
import { RealExample, RealExampleData } from "../components/RealExample";
import { theme } from "../theme";

interface Props { durationInFrames: number; }

const data: RealExampleData = {
  index: "2 de 3",
  region: "Armação dos Búzios · RJ",
  title: "Cruzeiro em águas costeiras",
  vesselType: "Navio de cruzeiro · 1.800 pax",
  vesselName: "M/V Atlantic Pearl",
  latStr: "22° 47.300' S",
  lonStr: "041° 49.800' W",
  zone: { name: "Mar Territorial", range: "3–12 mn", color: "#6366f1" },
  annexNum: "IV",
  annexTitle: "Esgoto Sanitário",
  rules: [
    {
      tag: "PROIBIDO",
      text: "0–3 mn: descarte de esgoto bruto. Permitido apenas tratado por estação aprovada (sem sólidos visíveis).",
    },
    {
      tag: "CONDICIONAL",
      text: "3–12 mn: somente esgoto triturado e desinfetado por sistema aprovado.",
    },
    {
      tag: "PERMITIDO",
      text: "≥12 mn: esgoto não triturado se navio em rota a ≥4 nós, taxa aprovada pela Administração.",
    },
  ],
  observation:
    "Em portos, fundeadouros e áreas sensíveis, use holding tank/ETE e cumpra regra local; registre conforme procedimento do navio.",
  mock: {
    // Búzios: península pequena projetada pro mar
    landPath:
      "M 0 0 L 0 500 L 100 480 L 180 460 L 260 440 L 340 410 L 420 390 L 500 400 L 560 430 L 600 470 L 580 510 L 540 540 L 480 555 L 420 540 L 380 510 L 360 540 L 380 580 L 420 620 L 460 660 L 460 700 L 0 700 Z",
    coastPath:
      "M 100 480 L 180 460 L 260 440 L 340 410 L 420 390 L 500 400 L 560 430 L 600 470 L 580 510 L 540 540 L 480 555 L 420 540 L 380 510",
    shipScreenPos: { x: 720, y: 470 },
    bandOffsets: [
      { x: 14, y: 10, nm: 6, color: theme.red },     // 0-3 mn proibido
      { x: 36, y: 28, nm: 18, color: theme.yellow }, // 3-12 mn condicional
      { x: 90, y: 80, nm: 50, color: theme.green },  // >12 mn permitido
    ],
  },
};

export const ExemploBuzios: React.FC<Props> = ({ durationInFrames }) => (
  <RealExample data={data} durationInFrames={durationInFrames} />
);
