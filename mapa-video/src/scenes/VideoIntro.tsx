import React from "react";
import {
  AbsoluteFill,
  Video,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";

interface Props { durationInFrames: number; }

/**
 * Reproduz a intro institucional `intro-apnt.mp4` (720x720, 24fps).
 * Faz pequeno fade-in (8 frames) e fade-out (24 frames) para transição suave
 * com a próxima cena (Intro tradicional do tutorial).
 */
export const VideoIntro: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const enter = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(
    frame,
    [durationInFrames - 24, durationInFrames],
    [1, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: theme.bg,
        justifyContent: "center",
        alignItems: "center",
        opacity: Math.min(enter, exit),
      }}
    >
      {/* Container que mantém aspect ratio 1:1 do vídeo, ocupando altura quase total */}
      <div
        style={{
          width: 1080,
          height: 1080,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Video
          src={staticFile("assets/intro-apnt.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
