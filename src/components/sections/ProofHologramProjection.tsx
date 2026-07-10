import { useEffect, useRef } from "react";

const IMAGE_SRC = `${import.meta.env.BASE_URL}images/alex-ascii-source.jpg`;
const FRAME_INTERVAL_MS = 1000 / 24;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const CHARACTER_BANDS = [
  " .`'",
  ".,:;-",
  "_~^!/",
  "\\|()[]",
  "{}<>+",
  "irsltf",
  "7tzxv",
  "ceouan",
  "YZXFCJ",
  "AHKMN",
  "B8&%@",
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

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const mix = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;
const seededNoise = (value: number) => {
  const sine = Math.sin(value * 12.9898) * 43758.5453;
  return sine - Math.floor(sine);
};

function getRenderConfig(width: number, height: number): RenderConfig {
  const cellHeight = clamp(width / 68, 4.8, 7.2);
  const cellWidth = cellHeight * 0.53;
  const columns = Math.max(82, Math.floor(width / cellWidth));
  const rows = Math.max(72, Math.floor(height / cellHeight));

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
  targetRatio: number,
) {
  const sourceRatio = image.naturalWidth / image.naturalHeight;
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

  const portraitZoom = 0.96;
  sourceX += (sourceWidth * (1 - portraitZoom)) / 2;
  sourceY += sourceHeight * (1 - portraitZoom) * 0.34;
  sourceWidth *= portraitZoom;
  sourceHeight *= portraitZoom;

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

function pickCharacter(
  luminance: number,
  row: number,
  column: number,
  tick: number,
  reducedMotion: boolean,
) {
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

function getPixelLuminance(
  imageData: ImageData,
  row: number,
  column: number,
  columns: number,
  rows: number,
) {
  const clampedRow = clamp(row, 0, rows - 1);
  const clampedColumn = clamp(column, 0, columns - 1);
  const pixelIndex = (clampedRow * columns + clampedColumn) * 4;
  const red = imageData.data[pixelIndex] ?? 0;
  const green = imageData.data[pixelIndex + 1] ?? 0;
  const blue = imageData.data[pixelIndex + 2] ?? 0;

  return (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
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
    const sampleContext = sampleCanvas.getContext("2d", {
      willReadFrequently: true,
    });
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
        drawCoverImage(
          sampleContext,
          image,
          config.columns,
          config.rows,
          config.cssWidth / config.cssHeight,
        );
        imageData = sampleContext.getImageData(
          0,
          0,
          config.columns,
          config.rows,
        );
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
      const { cellHeight, cellWidth, columns, cssHeight, cssWidth, rows } =
        config;
      const pointer = pointerRef.current;
      const tick = reducedMotion ? 0 : Math.floor(now / 132);
      const pulse = reducedMotion ? 0 : (Math.sin(now * 0.0016) + 1) / 2;

      context.clearRect(0, 0, cssWidth, cssHeight);
      context.fillStyle = "oklch(0.018 0 0)";
      context.fillRect(0, 0, cssWidth, cssHeight);
      context.font = `${cellHeight * 0.9}px "Lettera Mono LL", "IBM Plex Mono", ui-monospace, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const sourceLuminance = getPixelLuminance(
            imageData,
            row,
            column,
            columns,
            rows,
          );
          const horizontalEdge = Math.abs(
            getPixelLuminance(imageData, row, column - 1, columns, rows) -
              getPixelLuminance(imageData, row, column + 1, columns, rows),
          );
          const verticalEdge = Math.abs(
            getPixelLuminance(imageData, row - 1, column, columns, rows) -
              getPixelLuminance(imageData, row + 1, column, columns, rows),
          );
          const edgeLift = clamp(
            (horizontalEdge + verticalEdge) * 3.15,
            0,
            0.72,
          );
          const contrastLuminance = clamp(
            (sourceLuminance - 0.34) * 1.34 + 0.38,
            0,
            1,
          );
          const x = (column + 0.5) * cellWidth;
          const y = (row + 0.5) * cellHeight;
          const pointerX = pointer.x * cssWidth;
          const pointerY = pointer.y * cssHeight;
          const pointerRadius = Math.min(cssWidth, cssHeight) * 0.22;
          const distance = Math.hypot(x - pointerX, y - pointerY);
          const pointerLift = pointer.active
            ? clamp(1 - distance / pointerRadius, 0, 1)
            : 0;
          const dropoutNoise = seededNoise(
            row * 17.91 + column * 29.13 + tick * 0.17,
          );
          const textureNoise = seededNoise(row * 5.37 + column * 13.71);
          const shimmer = reducedMotion
            ? 0
            : (seededNoise(row * 21.3 + column * 9.7 + tick * 0.43) - 0.5) *
              0.025;
          const glyphTone = clamp(
            contrastLuminance * 0.46 +
              edgeLift * 1.12 +
              shimmer +
              pulse * 0.006,
            0,
            1,
          );
          const portraitMask = clamp(
            contrastLuminance * 0.7 + edgeLift * 1.3,
            0,
            1,
          );
          const ink = clamp(glyphTone + pointerLift * 0.08, 0, 1);
          const threshold = mix(0.18, 0.72, dropoutNoise) - edgeLift * 0.22;
          const glyph = pickCharacter(
            glyphTone,
            row,
            column,
            tick,
            reducedMotion,
          );
          const offset = reducedMotion
            ? 0
            : Math.sin(row * 0.31 + column * 0.17 + now * 0.003) *
              pointerLift *
              1.6;

          if (
            (glyph === " " ||
              ink < 0.18 ||
              portraitMask < 0.16 ||
              ink + textureNoise * 0.12 < threshold) &&
            pointerLift < 0.2
          ) {
            continue;
          }

          context.fillStyle = "oklch(0.98 0 0)";
          context.fillText(glyph, x + offset, y - offset * 0.42);
        }
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
