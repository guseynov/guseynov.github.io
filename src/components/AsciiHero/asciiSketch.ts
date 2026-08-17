import type p5 from "p5";
import {
  ASCII_CONFIG,
  DEBUG_FREEZE_TIME,
  DEBUG_SHOW_MOTIF,
  DEBUG_SHOW_SOURCE,
  getAsciiFontSize,
  type AsciiHeroConfig,
} from "./asciiConfig";
import {
  getBaseRowHalfWidth,
  getRowCenterX,
  getRowHalfWidth,
  getRowSideScale,
  getRampIndexBrightness,
  getReferencePhase,
  getSourceBrightness,
  getTerminalEdgeInset,
  getWaistComplexity,
  type FieldDynamics,
} from "./brightnessField";

interface AsciiOptions {
  common?: {
    fontSize?: number;
  };
  brightness?: {
    enabled?: boolean;
    characters?: string;
    characterColor?: string;
    characterColorMode?: number;
    backgroundColor?: string;
    backgroundColorMode?: number;
    invertMode?: boolean;
  };
  edge?: {
    enabled?: boolean;
    characters?: string;
    characterColor?: string;
    characterColorMode?: number;
    backgroundColor?: string;
    backgroundColorMode?: number;
    invertMode?: boolean;
    sobelThreshold?: number;
    sampleThreshold?: number;
  };
}

export interface AsciifyP5 extends p5 {
  setAsciiOptions: (options: AsciiOptions) => void;
}

interface AsciiGlyphDimensions {
  height: number;
  width: number;
}

interface AsciiCharacterTexture {
  begin: () => void;
  end: () => void;
  resize: (width: number, height: number) => void;
}

interface AsciiCharacterSet {
  characters: readonly string[];
  charsetCols: number;
  charsetRows: number;
  font: p5.Font;
  getMaxGlyphDimensions: (fontSize: number) => AsciiGlyphDimensions;
  texture: AsciiCharacterTexture;
}

export interface Asciifier {
  brightnessCharacterSet?: AsciiCharacterSet;
  edgeCharacterSet?: AsciiCharacterSet;
  instance: (sketch: AsciifyP5) => void;
}

interface PointerState {
  clickAt: number;
  clickX: number;
  clickY: number;
  previousEventAt: number;
  previousEventX: number;
  previousEventY: number;
  smoothX: number;
  smoothY: number;
  targetVelocity: number;
  targetX: number;
  targetY: number;
  velocity: number;
}

interface SketchOptions {
  P5Constructor: typeof p5;
  asciifier: Asciifier;
  config?: AsciiHeroConfig;
  mount: HTMLElement;
  onError: (error: unknown) => void;
  onReady: () => void;
  reducedMotion: boolean;
}

export interface AsciiSketchController {
  destroy: () => void;
  pause: () => void;
  resume: () => void;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const mix = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const amount = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return amount * amount * (3 - 2 * amount);
};

const gaussian = (value: number, center: number, spread: number) => {
  const normalized = (value - center) / spread;
  return Math.exp(-(normalized * normalized));
};

function getClickEnvelope(
  now: number,
  state: PointerState,
  config: AsciiHeroConfig,
) {
  if (
    state.clickAt < 0 ||
    now - state.clickAt > config.interaction.clickDurationMs
  ) {
    return 0;
  }

  const age = now - state.clickAt;
  if (age <= 150) {
    return Math.sin((age / 150) * Math.PI * 0.5);
  }

  return Math.exp(-((age - 150) / 360));
}

function isPointInsideOrganism(
  x: number,
  y: number,
  config: AsciiHeroConfig,
) {
  if (Math.abs(y) > 1.02) {
    return false;
  }

  return Math.abs(x) <= getBaseRowHalfWidth(y, config) + 0.08;
}

function getMountSize(mount: HTMLElement) {
  const bounds = mount.getBoundingClientRect();
  return {
    height: Math.max(1, Math.round(bounds.height)),
    width: Math.max(1, Math.round(bounds.width)),
  };
}

export function createAsciiSketch({
  P5Constructor,
  asciifier,
  config = ASCII_CONFIG,
  mount,
  onError,
  onReady,
  reducedMotion,
}: SketchOptions): AsciiSketchController {
  let destroyed = false;
  let ready = false;
  let resizeObserver: ResizeObserver | null = null;
  let instance: p5 | null = null;
  let currentFontSize = getAsciiFontSize(getMountSize(mount).width);
  let lineHeightApplied = false;

  const applyAsciiLineHeight = (asciiSketch: AsciifyP5) => {
    if (lineHeightApplied) {
      return;
    }

    const atlasFontSize = 128;
    const characterSets = [
      asciifier.brightnessCharacterSet,
      asciifier.edgeCharacterSet,
    ].filter((characterSet): characterSet is AsciiCharacterSet =>
      Boolean(characterSet?.texture),
    );

    if (characterSets.length === 0) {
      return;
    }

    for (const characterSet of characterSets) {
      const glyph = characterSet.getMaxGlyphDimensions(atlasFontSize);
      const cellHeight = Math.max(
        glyph.height,
        Math.round(glyph.height * config.ascii.lineHeight),
      );
      const textureWidth = glyph.width * characterSet.charsetCols;
      const textureHeight = cellHeight * characterSet.charsetRows;
      const paddingTop = (cellHeight - glyph.height) * 0.5;

      characterSet.texture.resize(textureWidth, textureHeight);
      characterSet.texture.begin();
      asciiSketch.push();
      asciiSketch.clear();
      asciiSketch.textFont(characterSet.font);
      asciiSketch.fill(255);
      asciiSketch.textSize(atlasFontSize);
      asciiSketch.textAlign(asciiSketch.LEFT, asciiSketch.TOP);
      asciiSketch.noStroke();

      for (let index = 0; index < characterSet.characters.length; index += 1) {
        const col = index % characterSet.charsetCols;
        const row = Math.floor(index / characterSet.charsetCols);
        const x = col * glyph.width - textureWidth * 0.5;
        const y = row * cellHeight - textureHeight * 0.5 + paddingTop;
        asciiSketch.text(characterSet.characters[index] ?? "", x, y);
      }

      asciiSketch.pop();
      characterSet.texture.end();
    }

    lineHeightApplied = true;
  };

  const pointer: PointerState = {
    clickAt: -1,
    clickX: 0,
    clickY: 0,
    previousEventAt: 0,
    previousEventX: 0,
    previousEventY: 0,
    smoothX: 0,
    smoothY: 0,
    targetVelocity: 0,
    targetX: 0,
    targetY: 0,
    velocity: 0,
  };

  const updatePointerFromEvent = (event: globalThis.PointerEvent) => {
    const bounds = mount.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0) {
      return;
    }

    const artHeight = bounds.height * config.shape.height;
    const artTop = bounds.height * config.shape.centerY - artHeight * 0.5;
    const artWidth = bounds.width * config.shape.width;
    const artLeft = (bounds.width - artWidth) * 0.5;
    const nextX = ((event.clientX - bounds.left - artLeft) / artWidth) * 2 - 1;
    const nextY = ((event.clientY - bounds.top - artTop) / artHeight) * 2 - 1;
    const now = performance.now();

    if (pointer.previousEventAt > 0 && !reducedMotion) {
      const frameDuration = clamp(now - pointer.previousEventAt, 8, 80);
      const distance = Math.hypot(
        nextX - pointer.previousEventX,
        nextY - pointer.previousEventY,
      );
      pointer.targetVelocity = clamp((distance / frameDuration) * 28, 0, 1);
    }

    pointer.previousEventAt = now;
    pointer.previousEventX = nextX;
    pointer.previousEventY = nextY;
    pointer.targetX = clamp(nextX, -1.25, 1.25);
    pointer.targetY = clamp(nextY, -1.25, 1.25);
  };

  const handlePointerMove = (event: globalThis.PointerEvent) => {
    if (reducedMotion || event.pointerType === "touch") {
      return;
    }
    updatePointerFromEvent(event);
  };

  const handlePointerLeave = () => {
    pointer.targetX = 0;
    pointer.targetY = 0;
    pointer.previousEventAt = 0;
  };

  const handlePointerDown = (event: globalThis.PointerEvent) => {
    if (reducedMotion) {
      return;
    }

    updatePointerFromEvent(event);
    if (!isPointInsideOrganism(pointer.targetX, pointer.targetY, config)) {
      return;
    }

    pointer.clickAt = performance.now();
    pointer.clickX = pointer.targetX;
    pointer.clickY = pointer.targetY;

    if (event.pointerType === "touch") {
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.previousEventAt = 0;
    }
  };

  const sketchFactory = (sketch: p5) => {
    const asciiSketch = sketch as AsciifyP5;
    const rowY = new Float32Array(config.shape.fieldRows + 1);
    const rowCenterX = new Float32Array(config.shape.fieldRows + 1);
    const rowLeftWidth = new Float32Array(config.shape.fieldRows + 1);
    const rowRightWidth = new Float32Array(config.shape.fieldRows + 1);
    const dynamics: FieldDynamics = {
      clickEnvelope: 0,
      clickWaveFront: 0,
      clickX: 0,
      clickY: 0,
      pointerX: 0,
      pointerY: 0,
      reducedMotion,
      time: 0,
      velocity: 0,
    };

    asciifier.instance(asciiSketch);

    const updateRows = () => {
      for (let row = 0; row <= config.shape.fieldRows; row += 1) {
        const normalizedY = mix(-1, 1, row / config.shape.fieldRows);
        const halfWidth = getRowHalfWidth(normalizedY, dynamics, config);
        rowY[row] = normalizedY;
        rowCenterX[row] = getRowCenterX(normalizedY, dynamics);
        rowLeftWidth[row] =
          halfWidth * getRowSideScale(normalizedY, -1, dynamics);
        rowRightWidth[row] =
          halfWidth * getRowSideScale(normalizedY, 1, dynamics);
      }
    };

    const emitFieldVertex = (
      normalizedX: number,
      row: number,
      artHeight: number,
      halfArtWidth: number,
    ) => {
      const normalizedY = rowY[row] ?? 0;
      const halfWidth =
        normalizedX < 0
          ? (rowLeftWidth[row] ?? config.shape.waistWidth)
          : (rowRightWidth[row] ?? config.shape.waistWidth);
      const centerX = rowCenterX[row] ?? 0;
      const sourceX = centerX + normalizedX * halfWidth;
      let x = sourceX;
      let y =
        normalizedY -
        Math.sign(normalizedY) *
          getTerminalEdgeInset(normalizedX, normalizedY);

      if (!reducedMotion) {
        const complexity = getWaistComplexity(normalizedY);
        const pointerDistance = Math.hypot(
          (sourceX - dynamics.pointerX) * 0.82,
          (normalizedY - dynamics.pointerY) * 1.28,
        );
        const pointerInfluence =
          1 -
          smoothstep(
            0,
            config.interaction.pointerRadius,
            pointerDistance,
          );
        x +=
          (dynamics.pointerX - sourceX) *
          pointerInfluence *
          config.interaction.pointerStrength *
          0.1 *
          complexity;
        y +=
          (dynamics.pointerY - normalizedY) *
          pointerInfluence *
          config.interaction.pointerStrength *
          0.055 *
          complexity;

        const clickDistance = Math.hypot(
          (sourceX - dynamics.clickX) * 0.82,
          (normalizedY - dynamics.clickY) * 1.28,
        );
        const shockwave =
          dynamics.clickEnvelope *
          gaussian(clickDistance, dynamics.clickWaveFront, 0.14) *
          config.interaction.clickStrength;
        if (shockwave > 0) {
          x +=
            (Math.sign(sourceX - dynamics.clickX) || 1) *
            shockwave *
            0.085 *
            complexity;
          y +=
            (Math.sign(normalizedY - dynamics.clickY) || 1) *
            shockwave *
            0.13 *
            complexity;
        }

        y +=
          Math.sin(
            normalizedY * 42 +
              normalizedX * 5.6 +
              dynamics.time * 1.1,
          ) *
          dynamics.velocity *
          config.interaction.velocityStrength *
          0.055 *
          complexity;
      }

      const brightness = getSourceBrightness(
        normalizedX,
        sourceX,
        normalizedY,
        dynamics,
        config,
      );

      asciiSketch.fill(brightness);
      asciiSketch.vertex(
        x * halfArtWidth,
        y * artHeight * 0.5,
        -1,
      );
    };

    const drawContinuousField = () => {
      const artHeight = asciiSketch.height * config.shape.height;
      const halfArtWidth = asciiSketch.width * config.shape.width * 0.5;

      updateRows();

      for (let row = 0; row < config.shape.fieldRows; row += 1) {
        asciiSketch.beginShape(asciiSketch.TRIANGLE_STRIP);

        for (
          let segment = 0;
          segment <= config.shape.fieldSegments;
          segment += 1
        ) {
          const normalizedX = mix(
            -1,
            1,
            segment / config.shape.fieldSegments,
          );
          emitFieldVertex(normalizedX, row, artHeight, halfArtWidth);
          emitFieldVertex(normalizedX, row + 1, artHeight, halfArtWidth);
        }

        asciiSketch.endShape();
      }
    };

    const drawDebugStrip = (
      top: number,
      bottom: number,
      getBrightness: (progress: number) => number,
    ) => {
      const stripWidth = asciiSketch.width * 0.86;
      const segments = Math.max(96, config.shape.fieldSegments * 2);
      asciiSketch.beginShape(asciiSketch.TRIANGLE_STRIP);

      for (let segment = 0; segment <= segments; segment += 1) {
        const progress = segment / segments;
        asciiSketch.fill(getBrightness(progress));
        const x = mix(-stripWidth * 0.5, stripWidth * 0.5, progress);
        asciiSketch.vertex(x, top, -1);
        asciiSketch.vertex(x, bottom, -1);
      }

      asciiSketch.endShape();
    };

    const drawMotifDebug = () => {
      const motifY = -0.58;
      drawDebugStrip(-54, 2, (progress) =>
        getRampIndexBrightness(
          getReferencePhase(progress, motifY, dynamics),
          config.characters.length,
        ),
      );
      // This production-hidden strip runs a literal 0 → 255 ramp through asciify.
      drawDebugStrip(34, 70, (progress) => progress * 255);
    };

    asciiSketch.setup = () => {
      try {
        const size = getMountSize(mount);
        const canvas = asciiSketch.createCanvas(
          size.width,
          size.height,
          asciiSketch.WEBGL,
        );
        canvas.parent(mount);
        asciiSketch.pixelDensity(config.performance.pixelDensity);
        asciiSketch.frameRate(config.performance.frameRate);
        asciiSketch.colorMode(asciiSketch.RGB, 255);
        asciiSketch.noStroke();
        asciiSketch.setAsciiOptions({
          common: {
            fontSize: currentFontSize,
          },
          brightness: {
            enabled: !DEBUG_SHOW_SOURCE,
            characters: config.characters,
            characterColor: config.colors.foreground,
            characterColorMode: 1,
            backgroundColor: config.colors.background,
            backgroundColorMode: 1,
            invertMode: false,
          },
          edge: {
            enabled: !DEBUG_SHOW_SOURCE && config.ascii.edgeEnabled,
            characters: config.edgeCharacters,
            characterColor: config.colors.foreground,
            characterColorMode: 1,
            backgroundColor: config.colors.background,
            backgroundColorMode: 1,
            invertMode: false,
            sobelThreshold: 0.72,
            sampleThreshold: 18,
          },
        });
        queueMicrotask(() => {
          if (!destroyed) {
            try {
              applyAsciiLineHeight(asciiSketch);
            } catch (error) {
              ready = false;
              asciiSketch.noLoop();
              onError(error);
            }
          }
        });
        ready = true;
        onReady();
      } catch (error) {
        asciiSketch.noLoop();
        onError(error);
      }
    };

    asciiSketch.draw = () => {
      if (!ready || destroyed) {
        return;
      }

      try {
        const now = performance.now();
        const clickEnvelope = reducedMotion
          ? 0
          : getClickEnvelope(now, pointer, config);
        const clickAge = pointer.clickAt < 0 ? 0 : now - pointer.clickAt;

        pointer.smoothX = mix(
          pointer.smoothX,
          pointer.targetX,
          reducedMotion ? 1 : config.interaction.smoothing,
        );
        pointer.smoothY = mix(
          pointer.smoothY,
          pointer.targetY,
          reducedMotion ? 1 : config.interaction.smoothing,
        );
        pointer.targetVelocity *= 0.82;
        pointer.velocity = mix(
          pointer.velocity,
          reducedMotion ? 0 : pointer.targetVelocity,
          0.16,
        );

        dynamics.clickEnvelope = clickEnvelope;
        dynamics.clickWaveFront =
          (clickAge / config.interaction.clickDurationMs) * 2.15;
        dynamics.clickX = pointer.clickX;
        dynamics.clickY = pointer.clickY;
        dynamics.pointerX = pointer.smoothX;
        dynamics.pointerY = pointer.smoothY;
        dynamics.time =
          reducedMotion || DEBUG_FREEZE_TIME || DEBUG_SHOW_MOTIF
            ? 1.75
            : now / 1000;
        dynamics.velocity = pointer.velocity;

        asciiSketch.background(0);
        if (DEBUG_SHOW_MOTIF) {
          drawMotifDebug();
        } else {
          asciiSketch.push();
          asciiSketch.translate(
            pointer.smoothX * config.interaction.parallaxX,
            (config.shape.centerY - 0.5) * asciiSketch.height +
              pointer.smoothY * config.interaction.parallaxY,
          );
          asciiSketch.rotate(
            reducedMotion
              ? 0
              : asciiSketch.radians(
                  Math.sin(dynamics.time * 0.13) *
                    config.animation.rotationDegrees,
                ),
          );

          drawContinuousField();
          asciiSketch.pop();
        }

        if (reducedMotion) {
          asciiSketch.noLoop();
        }
      } catch (error) {
        ready = false;
        asciiSketch.noLoop();
        onError(error);
      }
    };

    resizeObserver = new ResizeObserver(() => {
      if (!ready || destroyed) {
        return;
      }

      const size = getMountSize(mount);
      asciiSketch.resizeCanvas(size.width, size.height);
      const nextFontSize = getAsciiFontSize(size.width);

      if (nextFontSize !== currentFontSize) {
        currentFontSize = nextFontSize;
        asciiSketch.setAsciiOptions({
          common: { fontSize: currentFontSize },
        });
      }
    });
    resizeObserver.observe(mount);
  };

  mount.addEventListener("pointermove", handlePointerMove, { passive: true });
  mount.addEventListener("pointerleave", handlePointerLeave);
  mount.addEventListener("pointerdown", handlePointerDown, { passive: true });

  try {
    instance = new P5Constructor(sketchFactory, mount);
  } catch (error) {
    (resizeObserver as ResizeObserver | null)?.disconnect();
    mount.removeEventListener("pointermove", handlePointerMove);
    mount.removeEventListener("pointerleave", handlePointerLeave);
    mount.removeEventListener("pointerdown", handlePointerDown);
    onError(error);
  }

  return {
    destroy: () => {
      destroyed = true;
      resizeObserver?.disconnect();
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerleave", handlePointerLeave);
      mount.removeEventListener("pointerdown", handlePointerDown);
      instance?.remove();
      instance = null;
    },
    pause: () => instance?.noLoop(),
    resume: () => {
      if (!destroyed && ready) {
        instance?.loop();
      }
    },
  };
}
