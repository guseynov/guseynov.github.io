import { useEffect, useRef, useState } from "react";
import {
  createAsciiRenderer,
  type AsciiRendererController,
} from "./asciiRenderer";

type ArtworkStatus = "loading" | "ready" | "failed";

export function AsciiHero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const outputRef = useRef<HTMLPreElement | null>(null);
  const controllerRef = useRef<AsciiRendererController | null>(null);
  const [status, setStatus] = useState<ArtworkStatus>("loading");

  useEffect(() => {
    const root = rootRef.current;
    const output = outputRef.current;

    if (!root || !output) {
      return undefined;
    }

    let cancelled = false;
    let intersectionObserver: IntersectionObserver | null = null;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const failSafely = (error: unknown) => {
      if (cancelled) {
        return;
      }

      console.warn("Interactive ASCII artwork could not be initialized.", error);
      controllerRef.current?.destroy();
      controllerRef.current = null;
      setStatus("failed");
    };

    const syncPlayback = (isIntersecting: boolean) => {
      if (document.visibilityState === "visible" && isIntersecting) {
        controllerRef.current?.resume();
      } else {
        controllerRef.current?.pause();
      }
    };

    let inViewport = true;
    const handleVisibilityChange = () => syncPlayback(inViewport);

    try {
      controllerRef.current = createAsciiRenderer({
        root,
        output,
        onError: failSafely,
        onReady: () => {
          if (!cancelled) {
            setStatus("ready");
          }
        },
        reducedMotion,
      });

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          inViewport = entry?.isIntersecting ?? true;
          syncPlayback(inViewport);
        },
        { rootMargin: "120px 0px", threshold: 0 },
      );
      intersectionObserver.observe(root);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    } catch (error) {
      failSafely(error);
    }

    return () => {
      cancelled = true;
      intersectionObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 isolate h-full w-full touch-pan-y cursor-crosshair overflow-hidden bg-[#181818] pointer-events-auto data-[status=failed]:cursor-default [@media(hover:none)_and_(pointer:coarse)]:cursor-default"
      data-status={status}
      aria-hidden="true"
    >
      <pre
        ref={outputRef}
        className="pointer-events-none absolute m-0 block overflow-hidden p-0 font-mono text-[#e9e7e1] font-medium tracking-[0] whitespace-pre select-none [font-feature-settings:'liga'_0,'calt'_0] [font-variant-ligatures:none] [line-height:1.28] [text-rendering:geometricPrecision]"
      />
    </div>
  );
}
