import React from "react";
import { RealExample, RealExampleData } from "../components/RealExample";
import { theme } from "../theme";

interface Props { durationInFrames: number; }

const data: RealExampleData = {
  index: "3 de 3",
  region: "Pré-sal · Bacia de Santos",
  title: "FPSO no pré-sal",
  vesselType: "FPSO · pré-sal Tupi/Lula",
  vesselName: "FPSO Cidade de Maricá",
  latStr: "25° 32.000' S",
  lonStr: "043° 02.000' W",
  zone: { name: "ZEE / Plataforma Continental", range: "offshore licenciado", color: "#22d3ee" },
  annexNum: "I + offshore",
  annexTitle: "Óleo + instalação offshore",
  rules: [
    {
      tag: "PROIBIDO",
      text: "Óleo, sludge, lixo e lama de base oleosa fora de licença: descarte proibido.",
    },
    {
      tag: "CONDICIONAL",
      text: "Água produzida só se tratada, monitorada e dentro da licença ambiental/CONAMA vigente.",
    },
    {
      tag: "PERMITIDO",
      text: "Operação licenciada por IBAMA/ANP, com PEI, plano de área e registros auditáveis.",
    },
  ],
  observation:
    "A PCE, quando aplicável, garante direitos sobre leito/subsolo; não amplia automaticamente a coluna d'água para regras MARPOL.",
  mock: {
    landPath:
      "M 0 0 L 0 700 L 80 700 L 100 680 L 130 660 L 160 645 L 200 640 L 240 645 L 280 660 L 290 700 L 0 700 Z",
    coastPath:
      "M 100 680 L 130 660 L 160 645 L 200 640 L 240 645 L 280 660",
    shipScreenPos: { x: 880, y: 360 }, // bem afastado da costa
    bandOffsets: [
      { x: 80, y: 0, nm: 30, color: theme.indigo },
      { x: 240, y: 0, nm: 90, color: theme.cyan },
      { x: 540, y: 0, nm: 200, color: theme.cyanLight },
    ],
  },
};

export const ExemploBaciaSantos: React.FC<Props> = ({ durationInFrames }) => (
  <RealExample data={data} durationInFrames={durationInFrames} />
);
