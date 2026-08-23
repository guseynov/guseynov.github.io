import {
  ASCII_CONFIG,
  getAsciiFontSize,
  getAsciiShapeWidth,
  type AsciiHeroConfig,
} from "./asciiConfig";
import {
  getFieldCharacter,
  getRowCenterX,
  getRowHalfWidth,
  getRowSideScale,
  type FieldDynamics,
} from "./asciiField";

interface PointerState {
  clickAt: number;
  clickX: number;
  clickY: number;
  previousEventAt: number;
  previousEventX: number;
  previousEventY: number;
  smoothX: number;
  smoothY: number;
  screenX: number;
  screenY: number;
  sequenceAt: number;
  showLabel: boolean;
  targetVelocity: number;
  targetX: number;
  targetY: number;
  velocity: number;
}

interface GridMetrics {
  characterWidth: number;
  columns: number;
  height: number;
  lineHeight: number;
  offsetX: number;
  offsetY: number;
  rows: number;
  width: number;
}

interface RendererOptions {
  config?: AsciiHeroConfig;
  onError: (error: unknown) => void;
  onReady: () => void;
  output: HTMLElement;
  reducedMotion: boolean;
  root: HTMLElement;
}

export interface AsciiRendererController {
  destroy: () => void;
  pause: () => void;
  resume: () => void;
}

interface MorphSequenceState {
  active: boolean;
  compression: number;
  expansion: number;
  morphAmount: number;
  progress: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const mix = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const amount = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return amount * amount * (3 - 2 * amount);
};

const getSegmentProgress = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start), 0, 1);

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const easeInOutCubic = (value: number) =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) * 0.5;

const easeOutQuint = (value: number) => 1 - Math.pow(1 - value, 5);

const easeOutSpring = (value: number) =>
  1 - Math.exp(-8 * value) * Math.cos(value * Math.PI * 4.5);

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

function getMorphSequenceState(
  now: number,
  state: PointerState,
  config: AsciiHeroConfig,
): MorphSequenceState {
  if (state.sequenceAt < 0) {
    return {
      active: false,
      compression: 0,
      expansion: 0,
      morphAmount: 0,
      progress: 0,
    };
  }

  const age = now - state.sequenceAt;
  if (age >= config.sequence.durationMs) {
    state.sequenceAt = -1;
    return {
      active: false,
      compression: 0,
      expansion: 0,
      morphAmount: 0,
      progress: 0,
    };
  }

  const progress = clamp(age / config.sequence.durationMs, 0, 1);
  const compression =
    Math.sin(
      easeOutCubic(getSegmentProgress(progress, 0, 0.085)) * Math.PI,
    ) * 0.18;
  const expandIn = easeOutSpring(getSegmentProgress(progress, 0.035, 0.31));
  const expandOut =
    1 - easeInOutCubic(getSegmentProgress(progress, 0.69, 0.98));
  const expansion = expandIn * expandOut;
  const morphIn = easeOutQuint(getSegmentProgress(progress, 0.16, 0.39));
  const morphOut =
    1 - easeInOutCubic(getSegmentProgress(progress, 0.63, 0.91));
  const morphAmount = clamp(morphIn * morphOut, 0, 1);

  return {
    active: true,
    compression,
    expansion,
    morphAmount,
    progress,
  };
}

function measureGrid(
  root: HTMLElement,
  output: HTMLElement,
  config: AsciiHeroConfig,
): GridMetrics {
  const bounds = root.getBoundingClientRect();
  const width = Math.max(1, bounds.width);
  const height = Math.max(1, bounds.height);
  const fontSize = getAsciiFontSize(width);

  output.style.fontSize = `${fontSize}px`;
  output.style.width = "auto";
  output.style.height = "auto";
  output.textContent = "0".repeat(100);

  const range = document.createRange();
  range.selectNodeContents(output);
  const measuredWidth = range.getBoundingClientRect().width / 100;
  range.detach();

  const computed = getComputedStyle(output);
  const characterWidth = Math.max(
    1,
    Number.isFinite(measuredWidth) && measuredWidth > 0
      ? measuredWidth
      : fontSize * 0.6,
  );
  const parsedLineHeight = Number.parseFloat(computed.lineHeight);
  const lineHeight = Number.isFinite(parsedLineHeight)
    ? parsedLineHeight
    : fontSize * 1.28;
  const columns = Math.max(1, Math.floor(width / characterWidth));
  const rows = Math.max(1, Math.floor(height / lineHeight));
  const gridWidth = columns * characterWidth;
  const gridHeight = rows * lineHeight;
  const offsetX = (width - gridWidth) * 0.5;
  const offsetY = (height - gridHeight) * 0.5;

  output.style.left = `${offsetX}px`;
  output.style.top = `${offsetY}px`;
  output.style.width = `${gridWidth}px`;
  output.style.height = `${gridHeight}px`;

  return {
    characterWidth,
    columns,
    height,
    lineHeight,
    offsetX,
    offsetY,
    rows,
    width,
  };
}

export function createAsciiRenderer({
  config = ASCII_CONFIG,
  onError,
  onReady,
  output,
  reducedMotion,
  root,
}: RendererOptions): AsciiRendererController {
  let animationFrame = 0;
  let destroyed = false;
  let metrics = measureGrid(root, output, config);
  let playing = true;
  let ready = false;
  let resizeObserver: ResizeObserver | null = null;
  let lastFrameAt = 0;

  const pointer: PointerState = {
    clickAt: -1,
    clickX: 0,
    clickY: 0,
    previousEventAt: 0,
    previousEventX: 0,
    previousEventY: 0,
    smoothX: 0,
    smoothY: 0,
    screenX: 0,
    screenY: 0,
    sequenceAt: -1,
    showLabel: false,
    targetVelocity: 0,
    targetX: 0,
    targetY: 0,
    velocity: 0,
  };

  const dynamics: FieldDynamics = {
    clickEnvelope: 0,
    clickWaveFront: 0,
    clickX: 0,
    clickY: 0,
    pointerX: 0,
    pointerY: 0,
    reducedMotion,
    morphAmount: 0,
    sequenceProgress: 0,
    time: 0,
    velocity: 0,
  };

  const updatePointerFromEvent = (event: PointerEvent) => {
    const bounds = root.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0) {
      return;
    }

    const artHeight = bounds.height * config.shape.height;
    const artTop = bounds.height * config.shape.centerY - artHeight * 0.5;
    const artWidth = bounds.width * getAsciiShapeWidth(bounds.width);
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
    pointer.screenX = (event.clientX - bounds.left) / bounds.width;
    pointer.screenY = (event.clientY - bounds.top) / bounds.height;
    pointer.showLabel = event.pointerType !== "touch";
    pointer.targetX = clamp(nextX, -1.25, 1.25);
    pointer.targetY = clamp(nextY, -1.25, 1.25);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!reducedMotion && event.pointerType !== "touch") {
      updatePointerFromEvent(event);
    }
  };

  const handlePointerLeave = () => {
    pointer.targetX = 0;
    pointer.targetY = 0;
    pointer.previousEventAt = 0;
    pointer.showLabel = false;
  };

  const handlePointerDown = (event: PointerEvent) => {
    if (reducedMotion) {
      return;
    }

    updatePointerFromEvent(event);
    const now = performance.now();
    pointer.clickAt = now;
    pointer.clickX = pointer.targetX;
    pointer.clickY = pointer.targetY;
    if (pointer.sequenceAt < 0) {
      pointer.sequenceAt = now;
    }

    if (event.pointerType === "touch") {
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.previousEventAt = 0;
    }
  };

  const render = (now: number) => {
    const clickAge = pointer.clickAt < 0 ? 0 : now - pointer.clickAt;
    const sequence = getMorphSequenceState(now, pointer, config);
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

    dynamics.clickEnvelope = reducedMotion
      ? 0
      : getClickEnvelope(now, pointer, config);
    dynamics.clickWaveFront =
      (clickAge / config.interaction.clickDurationMs) * 2.15;
    dynamics.clickX = pointer.clickX;
    dynamics.clickY = pointer.clickY;
    dynamics.pointerX = pointer.smoothX;
    dynamics.pointerY = pointer.smoothY;
    dynamics.morphAmount = sequence.morphAmount;
    dynamics.sequenceProgress = sequence.progress;
    dynamics.time = reducedMotion ? 1.75 : now / 1000;
    dynamics.velocity = pointer.velocity;

    const artHeight = metrics.height * config.shape.height;
    const restingShapeWidth = getAsciiShapeWidth(metrics.width);
    const sequenceShapeWidth = mix(
      restingShapeWidth,
      config.sequence.expandedWidth,
      sequence.expansion,
    );
    const artHalfWidth =
      metrics.width * sequenceShapeWidth * (1 - sequence.compression) * 0.5;
    const artCenterY = metrics.height * config.shape.centerY;
    const shiftX = pointer.smoothX * config.interaction.parallaxX;
    const shiftY = pointer.smoothY * config.interaction.parallaxY;
    const lines = new Array<string>(metrics.rows);
    for (let row = 0; row < metrics.rows; row += 1) {
      const pixelY = metrics.offsetY + (row + 0.5) * metrics.lineHeight;
      const normalizedY = (pixelY - artCenterY - shiftY) / (artHeight * 0.5);
      const characters = new Array<string>(metrics.columns).fill(" ");

      if (Math.abs(normalizedY) <= 1.03) {
        const halfWidth = getRowHalfWidth(normalizedY, dynamics, config);
        const centerX = getRowCenterX(normalizedY, dynamics);
        const leftWidth = halfWidth * getRowSideScale(normalizedY, -1, dynamics);
        const rightWidth = halfWidth * getRowSideScale(normalizedY, 1, dynamics);

        for (let column = 0; column < metrics.columns; column += 1) {
          const pixelX =
            metrics.offsetX + (column + 0.5) * metrics.characterWidth;
          const fieldX = (pixelX - metrics.width * 0.5 - shiftX) / artHalfWidth;
          const sideWidth = fieldX < centerX ? leftWidth : rightWidth;
          const normalizedX = (fieldX - centerX) / sideWidth;

          if (Math.abs(normalizedX) > 1) {
            continue;
          }

          characters[column] = getFieldCharacter(
            normalizedX,
            normalizedY,
            dynamics,
            config,
          );
        }
      }

      lines[row] = characters.join("");
    }

    if (pointer.showLabel && !reducedMotion && !sequence.active) {
      const labelRow = Math.floor(
        (pointer.screenY * metrics.height - metrics.offsetY) /
          metrics.lineHeight,
      );
      const labelColumn = Math.floor(
        (pointer.screenX * metrics.width - metrics.offsetX) /
          metrics.characterWidth,
      ) + 2;

      if (labelRow >= 0 && labelRow < lines.length) {
        const characters = (lines[labelRow] ?? "").split("");
        for (
          let index = 0;
          index < config.interaction.label.length;
          index += 1
        ) {
          const column = labelColumn + index;
          if (column >= 0 && column < characters.length) {
            characters[column] = config.interaction.label[index] ?? "";
          }
        }
        lines[labelRow] = characters.join("");
      }
    }

    output.textContent = lines.join("\n");
    if (!ready) {
      ready = true;
      onReady();
    }
  };

  const tick = (now: number) => {
    if (destroyed || !playing) {
      return;
    }

    const frameInterval = 1000 / config.animation.frameRate;
    if (lastFrameAt === 0 || now - lastFrameAt >= frameInterval - 1) {
      lastFrameAt = now;
      try {
        render(now);
      } catch (error) {
        playing = false;
        onError(error);
        return;
      }
    }

    animationFrame = requestAnimationFrame(tick);
  };

  const resize = () => {
    try {
      metrics = measureGrid(root, output, config);
      lastFrameAt = 0;
      render(performance.now());
    } catch (error) {
      playing = false;
      onError(error);
    }
  };

  root.addEventListener("pointermove", handlePointerMove);
  root.addEventListener("pointerleave", handlePointerLeave);
  root.addEventListener("pointerdown", handlePointerDown);
  resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);

  const fontsReady = document.fonts?.ready;
  if (fontsReady) {
    void fontsReady.then(() => {
      if (!destroyed) {
        resize();
      }
    });
  }

  render(performance.now());
  if (!reducedMotion) {
    animationFrame = requestAnimationFrame(tick);
  }

  return {
    destroy: () => {
      destroyed = true;
      playing = false;
      cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", handlePointerLeave);
      root.removeEventListener("pointerdown", handlePointerDown);
      output.textContent = "";
    },
    pause: () => {
      if (!playing) {
        return;
      }
      playing = false;
      cancelAnimationFrame(animationFrame);
    },
    resume: () => {
      if (destroyed || playing || reducedMotion) {
        return;
      }
      playing = true;
      lastFrameAt = 0;
      animationFrame = requestAnimationFrame(tick);
    },
  };
}
