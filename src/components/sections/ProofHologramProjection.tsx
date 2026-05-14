import { useEffect, useRef } from "react";

const IMAGE_SRC = `${import.meta.env.BASE_URL}images/alex-ascii-source.png`;
const FRAME_INTERVAL_MS = 1000 / 24;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const CHARACTER_BANDS = [
  " .`",
  ".,:",
  ":;!",
  "irs",
  "7tz",
  "xev",
  "cof",
  "nua",
  "YXZ",
  "AHK",
  "MNR",
  "B8&",
  "#%@",
];

interface PointerState {
  active: boolean;
  x: number;
  y: number;
}

interface RenderConfig {
  cellHeight: number;
  cellWidth: number;
  columns: number;
  cssHeight: number;
  cssWidth: number;
  rows: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
const seededNoise = (value: number) => {
  const sine = Math.sin(value * 12.9898) * 43758.5453;
  return sine - Math.floor(sine);
};

function getRenderConfig(width: number, height: number): RenderConfig {
  const cellHeight = clamp(width / 34, 8.4, 12.2);
  const cellWidth = cellHeight * 0.56;
  const columns = Math.max(28, Math.floor(width / cellWidth));
  const rows = Math.max(30, Math.floor(height / cellHeight));

  return {
    cellHeight,
    cellWidth,
    columns,
    cssHeight: height,
    cssWidth: width,
    rows,
  };
}

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const sourceRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > targetRatio) {
    sourceWidth = image.naturalHeight * targetRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / targetRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height,
  );
}

function pickCharacter(luminance: number, row: number, column: number, tick: number, reducedMotion: boolean) {
  const bandIndex = clamp(
    Math.floor(Math.pow(luminance, 0.82) * (CHARACTER_BANDS.length - 1)),
    0,
    CHARACTER_BANDS.length - 1,
  );
  const band = CHARACTER_BANDS[bandIndex];
  const drift = reducedMotion ? 0 : tick;
  const seed = row * 93.17 + column * 41.73 + bandIndex * 11.31 + drift;
  return band[Math.floor(seededNoise(seed) * band.length)] ?? band[0];
}

export function ProofHologramProjection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<PointerState>({ active: false, x: 0.5, y: 0.48 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;

    if (!canvas || !root) {
      return undefined;
    }

    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return undefined;
    }

    const sampleCanvas = document.createElement("canvas");
    const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
    const image = new Image();
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;

    let animationFrame = 0;
    let config = getRenderConfig(320, 286);
    let imageData: ImageData | null = null;
    let lastFrameAt = 0;
    let layoutFrame = 0;
    let layoutTimeout = 0;
    let visible = true;
    let loaded = false;

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      config = getRenderConfig(width, height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      sampleCanvas.width = config.columns;
      sampleCanvas.height = config.rows;

      if (loaded && sampleContext) {
        sampleContext.clearRect(0, 0, config.columns, config.rows);
        drawCoverImage(sampleContext, image, config.columns, config.rows);
        imageData = sampleContext.getImageData(0, 0, config.columns, config.rows);
      }
    };

    const render = (now: number) => {
      if (!visible || !imageData) {
        animationFrame = window.requestAnimationFrame(render);
        return;
      }

      if (!reducedMotion && now - lastFrameAt < FRAME_INTERVAL_MS) {
        animationFrame = window.requestAnimationFrame(render);
        return;
      }

      lastFrameAt = now;
      const { cellHeight, cellWidth, columns, cssHeight, cssWidth, rows } = config;
      const pointer = pointerRef.current;
      const tick = reducedMotion ? 0 : Math.floor(now / 132);
      const pulse = reducedMotion ? 0 : (Math.sin(now * 0.0016) + 1) / 2;

      context.clearRect(0, 0, cssWidth, cssHeight);
      context.fillStyle = "oklch(0.965 0 0)";
      context.fillRect(0, 0, cssWidth, cssHeight);
      context.font = `${cellHeight * 0.92}px "Lettera Mono LL", "IBM Plex Mono", ui-monospace, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const pixelIndex = (row * columns + column) * 4;
          const red = imageData.data[pixelIndex] ?? 0;
          const green = imageData.data[pixelIndex + 1] ?? 0;
          const blue = imageData.data[pixelIndex + 2] ?? 0;
          const sourceLuminance = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
          const x = (column + 0.5) * cellWidth;
          const y = (row + 0.5) * cellHeight;
          const normalizedX = column / Math.max(1, columns - 1);
          const normalizedY = row / Math.max(1, rows - 1);
          const distance = Math.hypot(normalizedX - pointer.x, normalizedY - pointer.y);
          const pointerLift = pointer.active ? clamp(1 - distance / 0.22, 0, 1) : 0;
          const shimmer = reducedMotion
            ? 0
            : (seededNoise(row * 21.3 + column * 9.7 + tick * 0.43) - 0.5) * 0.14;
          const luminance = clamp(
            sourceLuminance * (0.86 + pointerLift * 0.22) + shimmer + pulse * 0.025,
            0,
            1,
          );
          const alpha = clamp(mix(0.12, 0.92, Math.pow(luminance, 1.08)) + pointerLift * 0.18, 0.08, 1);
          const glyph = pickCharacter(luminance, row, column, tick, reducedMotion);
          const offset = reducedMotion
            ? 0
            : Math.sin(row * 0.31 + column * 0.17 + now * 0.003) * pointerLift * 1.6;

          if (glyph === " " && pointerLift < 0.2) {
            continue;
          }

          context.fillStyle = `oklch(${mix(0.09, 0.36, 1 - luminance).toFixed(3)} 0 0 / ${alpha.toFixed(3)})`;
          context.fillText(glyph, x + offset, y - offset * 0.42);
        }
      }

      context.fillStyle = "oklch(0.08 0 0 / 0.055)";
      for (let scanY = (now * 0.022) % 18; scanY < cssHeight; scanY += 18) {
        context.fillRect(0, scanY, cssWidth, 1);
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      pointerRef.current = {
        active: true,
        x: clamp((event.clientX - bounds.left) / bounds.width, 0, 1),
        y: clamp((event.clientY - bounds.top) / bounds.height, 0, 1),
      };
    };
    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );

    image.onload = () => {
      loaded = true;
      resize();
      animationFrame = window.requestAnimationFrame(render);
    };
    image.src = IMAGE_SRC;

    resizeObserver.observe(root);
    visibilityObserver.observe(root);
    root.addEventListener("pointermove", handlePointerMove);
    root.addEventListener("pointerleave", handlePointerLeave);
    resize();
    layoutFrame = window.requestAnimationFrame(resize);
    layoutTimeout = window.setTimeout(resize, 160);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(layoutFrame);
      window.clearTimeout(layoutTimeout);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      className="proof-hologram"
      aria-hidden="true"
      style={{
        flex: "0 0 auto",
        maxWidth: "100%",
        minWidth: "17rem",
        width: "clamp(17rem, 26vw, 21rem)",
      }}
    >
      <div ref={rootRef} className="proof-hologram__shell proof-ascii-field">
        <canvas ref={canvasRef} className="proof-ascii-field__canvas" />
        <div className="proof-ascii-field__vignette" />
      </div>
    </div>
  );
}
