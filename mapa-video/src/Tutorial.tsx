import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { theme, fonts } from "./theme";
import { VideoIntro } from "./scenes/VideoIntro";
import { Intro } from "./scenes/Intro";
import { AmazoniaAzul } from "./scenes/AmazoniaAzul";
import { LinhasDeBase } from "./scenes/LinhasDeBase";
import { ZonasMaritimas } from "./scenes/ZonasMaritimas";
import { MarpolAnnexes } from "./scenes/MarpolAnnexes";
import { HowToUse } from "./scenes/HowToUse";
import { ExemploSantos } from "./scenes/ExemploSantos";
import { ExemploBuzios } from "./scenes/ExemploBuzios";
import { ExemploBaciaSantos } from "./scenes/ExemploBaciaSantos";
import { Outro } from "./scenes/Outro";
import { ProgressBar } from "./components/ProgressBar";
import { TopWordmark } from "./components/TopWordmark";

// 30 fps · total ~112s (≤2min)
// VideoIntro: 8.1s do MP4 (24fps reamostrado para 30fps) → 245 frames
const SCENES = [
  { from: 0,    duration: 245, Comp: VideoIntro },        //  0   → 8.2s   (MP4 logo APNT)
  { from: 245,  duration: 150, Comp: Intro },             //  8.2 → 13.2s  (título do tutorial)
  { from: 395,  duration: 360, Comp: AmazoniaAzul },      //  13.2 → 25.2s
  { from: 755,  duration: 330, Comp: LinhasDeBase },      //  25.2 → 36.2s
  { from: 1085, duration: 420, Comp: ZonasMaritimas },    //  36.2 → 50.2s
  { from: 1505, duration: 480, Comp: MarpolAnnexes },     //  50.2 → 66.2s
  { from: 1985, duration: 300, Comp: HowToUse },          //  66.2 → 76.2s
  { from: 2285, duration: 300, Comp: ExemploSantos },     //  76.2 → 86.2s  (Anexo I petroleiro)
  { from: 2585, duration: 300, Comp: ExemploBuzios },     //  86.2 → 96.2s  (Anexo IV cruzeiro)
  { from: 2885, duration: 300, Comp: ExemploBaciaSantos },//  96.2 → 106.2s (Plataforma offshore)
  { from: 3185, duration: 165, Comp: Outro },             //  106.2 → 111.7s
];

// Frame final: 245 + 150 + 360 + 330 + 420 + 480 + 300 + 300 + 300 + 300 + 165 = 3350
export const TOTAL_FRAMES = 3350;

// TopWordmark fica visível durante o conteúdo (após o vídeo intro, antes do outro)
const WORDMARK_FROM = 245;
const WORDMARK_DURATION = TOTAL_FRAMES - WORDMARK_FROM - 165; // exclui Outro

export const Tutorial: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${theme.bgGradEnd} 0%, ${theme.bg} 70%)`,
        fontFamily: fonts.sans,
        color: theme.ink,
      }}
    >
      {SCENES.map(({ from, duration, Comp }, i) => (
        <Sequence key={i} from={from} durationInFrames={duration} premountFor={Math.min(30, from)}>
          <Comp durationInFrames={duration} />
        </Sequence>
      ))}

      <Sequence from={WORDMARK_FROM} durationInFrames={WORDMARK_DURATION} premountFor={30}>
        <TopWordmark />
      </Sequence>

      <ProgressBar totalFrames={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
