import { useEffect, useRef, useState } from "react";
import { createAsciiVideoRenderer, type AsciiVideoOptions } from "./asciiVideoRenderer";

const frameInterval = 1000 / 30;

type AsciiVideoProps = AsciiVideoOptions & {
  src: string;
  className: string;
};

export function AsciiVideo({ src, className, fontSize, blackPoint, whitePoint, inverted }: AsciiVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const output = outputRef.current;
    const video = videoRef.current;
    if (!root || !output || !video) return;

    const renderer = createAsciiVideoRenderer(root, output, video, {
      fontSize,
      blackPoint,
      whitePoint,
      inverted,
    });
    if (!renderer) return;

    let disposed = false;
    let inViewport = false;
    let autoplayBlocked = false;
    let frameId = 0;
    let lastFrame = -Infinity;
    const useVideoFrames = typeof video.requestVideoFrameCallback === "function";

    const shouldPlay = () =>
      !disposed && !video.error && !reducedMotion && inViewport && !document.hidden;

    const cancelFrame = () => {
      if (useVideoFrames) {
        video.cancelVideoFrameCallback(frameId);
      } else {
        window.cancelAnimationFrame(frameId);
      }
      frameId = 0;
      lastFrame = -Infinity;
    };

    const render = () => {
      renderer.render();
    };

    const scheduleFrame = () => {
      if (frameId || !shouldPlay() || video.paused) return;
      if (useVideoFrames) {
        frameId = video.requestVideoFrameCallback(animate);
      } else {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const animate = (time: number, metadata?: VideoFrameCallbackMetadata) => {
      frameId = 0;
      if (!shouldPlay()) return;
      // Media time avoids dropped frames from uneven callback delivery. It
      // starts over when the video loops; the RAF fallback uses wall time.
      const frameTime = metadata ? metadata.mediaTime * 1000 : time;
      if (frameTime < lastFrame) lastFrame = -Infinity;
      if (frameTime - lastFrame >= frameInterval - 1) {
        render();
        lastFrame = frameTime;
      }
      scheduleFrame();
    };

    const syncPlayback = () => {
      if (!shouldPlay()) {
        video.pause();
        cancelFrame();
        return;
      }

      void video.play().then(() => {
        if (disposed) return;
        autoplayBlocked = false;
        scheduleFrame();
      }).catch(() => {
        // A normal page interaction can unlock playback if autoplay is blocked.
        if (!disposed && shouldPlay()) autoplayBlocked = true;
      });
    };

    const retryAutoplay = () => {
      if (autoplayBlocked) syncPlayback();
    };

    const resize = () => {
      renderer.resize();
      render();
    };

    const handleLoadedData = () => {
      render();
      syncPlayback();
    };

    const handleError = () => {
      video.pause();
      cancelFrame();
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      syncPlayback();
    });
    const resizeObserver = new ResizeObserver(resize);

    video.muted = true;
    resize();
    intersectionObserver.observe(root);
    resizeObserver.observe(root);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", render);
    video.addEventListener("playing", scheduleFrame);
    video.addEventListener("error", handleError);
    document.addEventListener("visibilitychange", syncPlayback);
    document.addEventListener("pointerdown", retryAutoplay, { passive: true });
    document.addEventListener("keydown", retryAutoplay);
    document.fonts.addEventListener("loadingdone", resize);

    return () => {
      disposed = true;
      video.pause();
      cancelFrame();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", render);
      video.removeEventListener("playing", scheduleFrame);
      video.removeEventListener("error", handleError);
      document.removeEventListener("visibilitychange", syncPlayback);
      document.removeEventListener("pointerdown", retryAutoplay);
      document.removeEventListener("keydown", retryAutoplay);
      document.fonts.removeEventListener("loadingdone", resize);
    };
  }, [src, fontSize, blackPoint, whitePoint, inverted, reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={className}
      ref={rootRef}
    >
      <video
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px opacity-0"
        loop
        muted
        playsInline
        preload="auto"
        ref={videoRef}
        src={src}
        tabIndex={-1}
      />
      <pre
        aria-hidden="true"
        className="pointer-events-none m-0 h-full w-full overflow-hidden p-0 font-mono font-normal tracking-normal whitespace-pre text-[#e9e7e1] select-none [font-variant-ligatures:none]"
        ref={outputRef}
      />
    </div>
  );
}
