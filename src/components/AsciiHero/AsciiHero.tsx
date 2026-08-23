import { useEffect, useRef, useState } from "react";
import {
  createAsciiRenderer,
  type AsciiRendererController,
} from "./asciiRenderer";
import styles from "./AsciiHero.module.css";

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
      className={styles.root}
      data-status={status}
      aria-hidden="true"
    >
      <pre ref={outputRef} className={styles.glyphs} />
    </div>
  );
}
