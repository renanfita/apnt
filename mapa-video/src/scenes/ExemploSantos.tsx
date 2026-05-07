import React from "react";
import { RealExample, RealExampleData } from "../components/RealExample";
import { theme } from "../theme";

interface Props { durationInFrames: number; }

const data: RealExampleData = {
  index: "1 de 3",
  region: "Porto de Santos · SP",
  title: "Petroleiro saindo do porto",
  vesselType: "Petroleiro VLCC · 280 m",
  vesselName: "M/T Brazilian Star",
  latStr: "23° 59.500' S",
  lonStr: "046° 18.200' W",
  zone: { name: "Mar Territorial", range: "0–12 mn", color: "#6366f1" },
  annexNum: "I",
  annexTitle: "Óleo · controle rigoroso",
  rules: [
    {
      tag: "PROIBIDO",
      text: "Em porto, manobra e mar territorial: reter resíduos de carga, sludge, filtros e trapos oleosos.",
    },
    {
      tag: "CONDICIONAL",
      text: "Água oleosa de máquinas: somente em rota, ≤15 ppm, separador/alarme aprovado e registro no ORB.",
    },
    {
      tag: "PROIBIDO",
      text: "Petroleiro: resíduos de carga/lastro sujo proibidos <50 mn da terra mais próxima (Reg. 34).",
    },
  ],
  observation:
    "Lei 9.966/2000 e NORMAM-401/DPC reforçam a fiscalização em AJB. Siga PEI/SOPEP e registre no Oil Record Book.",
  mock: {
    landPath:
      "M 0 0 L 0 380 L 60 380 L 110 360 L 180 350 L 240 340 L 280 350 L 340 380 L 420 410 L 480 430 L 540 460 L 600 510 L 640 560 L 660 620 L 660 700 L 1100 700 L 1100 0 Z",
    coastPath:
      "M 60 380 L 110 360 L 180 350 L 240 340 L 280 350 L 340 380 L 420 410 L 480 430 L 540 460 L 600 510 L 640 560",
    shipScreenPos: { x: 230, y: 380 },
    shipMoveTo: { x: 720, y: 540 },
    bandOffsets: [
      { x: 30, y: 22, nm: 16, color: theme.indigo },
      { x: 110, y: 80, nm: 60, color: theme.red },
    ],
  },
};

export const ExemploSantos: React.FC<Props> = ({ durationInFrames }) => (
  <RealExample data={data} durationInFrames={durationInFrames} />
);
