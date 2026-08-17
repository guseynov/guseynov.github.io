import { useEffect, useRef, useState } from "react";
import {
  createAsciiSketch,
  type Asciifier,
  type AsciiSketchController,
} from "./asciiSketch";
import styles from "./AsciiHero.module.css";

type ArtworkStatus = "loading" | "ready" | "failed";

interface AsciiWindow {
  p5?: unknown;
  p5asciify?: Asciifier;
}

function getAsciifier(moduleValue: unknown): Asciifier | null {
  const candidates = [
    moduleValue,
    (moduleValue as { default?: unknown } | null)?.default,
    (window as unknown as AsciiWindow).p5asciify,
  ];

  return (
    candidates.find(
      (candidate): candidate is Asciifier =>
        typeof candidate === "object" &&
        candidate !== null &&
        "instance" in candidate &&
        typeof candidate.instance === "function",
    ) ?? null
  );
}

export function AsciiHero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<AsciiSketchController | null>(null);
  const [status, setStatus] = useState<ArtworkStatus>("loading");

  useEffect(() => {
    const root = rootRef.current;
    const mount = mountRef.current;

    if (!root || !mount) {
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

    const initialize = async () => {
      try {
        const p5Module = await import("p5");
        const P5Constructor = p5Module.default;

        if (cancelled) {
          return;
        }

        // p5.asciify 0.3 ships as UMD and expects the p5 constructor globally.
        (window as unknown as AsciiWindow).p5 = P5Constructor;
        const asciifyModule = await import("p5.asciify");

        if (cancelled) {
          return;
        }

        const asciifier = getAsciifier(asciifyModule);
        if (!asciifier) {
          throw new Error("p5.asciify did not expose an instance-mode renderer.");
        }

        controllerRef.current = createAsciiSketch({
          P5Constructor,
          asciifier,
          mount,
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
    };

    void initialize();

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
      className={styles.root}
      data-status={status}
      aria-hidden="true"
    >
      <div ref={mountRef} className={styles.canvas} />
    </div>
  );
}
