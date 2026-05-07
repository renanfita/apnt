import React from "react";
import { Composition } from "remotion";
import { Tutorial, TOTAL_FRAMES } from "./Tutorial";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Tutorial"
        component={Tutorial}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
