import { AsciiVideo } from "../AsciiVideo/AsciiVideo";

// The clip includes forward and reverse playback, with no repeated end frames.
const videoSource = `${import.meta.env.BASE_URL}assets/hero/hero-loop.mp4`;

export function AsciiVideoHero() {
  return (
    <AsciiVideo
      blackPoint={136}
      className="hero-ascii-video absolute top-[200px] bottom-[calc(clamp(164px,25.8svh,218px)+42px)] left-1/2 w-[calc(100%-24px)] -translate-x-1/2 overflow-hidden md:top-[110px] md:bottom-[215px] md:w-[min(calc(100%-192px),1088px)] md:max-[901px]:w-[calc(100%-68px)]"
      inverted
      src={videoSource}
      whitePoint={248}
    />
  );
}
