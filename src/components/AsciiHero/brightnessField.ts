import type { AsciiHeroConfig } from "./asciiConfig";

export interface FieldDynamics {
  clickEnvelope: number;
  clickWaveFront: number;
  clickX: number;
  clickY: number;
  pointerX: number;
  pointerY: number;
  reducedMotion: boolean;
  time: number;
  velocity: number;
}

export interface MotifAnchor {
  ramp: number;
  u: number;
}

/** Reference-derived run lengths: broad punctuation trough, compressed dense tail. */
export const MOTIF_ANCHORS: readonly MotifAnchor[] = [
  { u: 0, ramp: 9 },
  { u: 0.014, ramp: 8 },
  { u: 0.036, ramp: 7 },
  { u: 0.065, ramp: 6 },
  { u: 0.1, ramp: 5 },
  { u: 0.14, ramp: 4 },
  { u: 0.19, ramp: 3 },
  { u: 0.245, ramp: 2 },
  { u: 0.36, ramp: 1.55 },
  { u: 0.43, ramp: 2 },
  { u: 0.47, ramp: 3 },
  { u: 0.5, ramp: 4 },
  { u: 0.53, ramp: 5 },
  { u: 0.555, ramp: 6 },
  { u: 0.575, ramp: 7 },
  { u: 0.595, ramp: 8 },
  { u: 0.615, ramp: 9 },
  { u: 0.64, ramp: 10 },
  { u: 0.665, ramp: 11 },
  { u: 0.69, ramp: 12 },
  { u: 0.715, ramp: 13 },
  { u: 0.742, ramp: 14 },
  { u: 0.77, ramp: 15 },
  { u: 0.798, ramp: 16 },
  { u: 0.826, ramp: 17 },
  { u: 0.854, ramp: 18 },
  { u: 0.884, ramp: 19 },
  { u: 0.922, ramp: 20 },
  { u: 0.965, ramp: 21 },
  { u: 1, ramp: 21 },
];

const MOTIF_SECTIONS = {
  left: 0.1,
  descent: 0.245,
  trough: 0.43,
  recovery: 0.53,
  transition: 0.615,
} as const;

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

function getHalfPhase(normalizedY: number) {
  return normalizedY < 0 ? 0.38 : 1.57;
}

/** Smooth, deterministic 2D variation assembled from nonparallel waves. */
function getCoherentNoise2D(x: number, y: number, phase: number) {
  const broad = Math.sin(x * 1.37 + y * 1.83 + phase);
  const crossing = Math.sin(x * -2.21 + y * 0.91 + phase * 1.71);
  const curl = Math.cos(x * 0.73 + y * -2.47 - phase * 0.64);

  return broad * 0.5 + crossing * 0.31 + curl * 0.19;
}

export function getWaistComplexity(normalizedY: number) {
  return smoothstep(0.055, 0.34, Math.abs(normalizedY));
}

export function getBaseRowHalfWidth(
  normalizedY: number,
  config: AsciiHeroConfig,
) {
  const y = clamp(normalizedY, -1, 1);
  const distanceFromWaist = Math.abs(y);
  const isUpper = y < 0;
  const rise = smoothstep(
    isUpper ? 0.028 : 0.045,
    isUpper ? 0.935 : 0.97,
    distanceFromWaist,
  );
  const lobe = Math.pow(rise, isUpper ? 0.54 : 0.68);
  const broadBulges = isUpper
    ? gaussian(distanceFromWaist, 0.82, 0.13) * 0.06 -
      gaussian(distanceFromWaist, 0.65, 0.085) * 0.046 +
      gaussian(distanceFromWaist, 0.49, 0.105) * 0.032 -
      gaussian(distanceFromWaist, 0.3, 0.07) * 0.026
    : gaussian(distanceFromWaist, 0.84, 0.13) * 0.048 -
      gaussian(distanceFromWaist, 0.68, 0.09) * 0.052 +
      gaussian(distanceFromWaist, 0.52, 0.1) * 0.038 -
      gaussian(distanceFromWaist, 0.33, 0.07) * 0.03;
  const mediumContour =
    Math.sin(y * (isUpper ? 29 : 27) + getHalfPhase(y)) * 0.03 +
    Math.sin(y * (isUpper ? 61 : 67) + (isUpper ? 1.1 : 2.4)) *
      0.013;
  const tipTaper =
    1 -
    smoothstep(isUpper ? 0.86 : 0.88, 1, distanceFromWaist) *
      (isUpper ? 0.285 : 0.27);
  const maximumWidth = isUpper ? 0.975 : 0.99;
  const contour = 1 + broadBulges + mediumContour;

  return clamp(
    config.shape.waistWidth +
      (maximumWidth - config.shape.waistWidth) *
        lobe *
        tipTaper *
        contour,
    config.shape.waistWidth,
    0.995,
  );
}

export function getRowHalfWidth(
  normalizedY: number,
  dynamics: FieldDynamics,
  config: AsciiHeroConfig,
) {
  const phase = getHalfPhase(normalizedY);
  const complexity = getWaistComplexity(normalizedY);
  const idleContour = dynamics.reducedMotion
    ? 0
    : (Math.sin(
        dynamics.time * config.animation.breathSpeed +
          normalizedY * 3.1 +
          phase,
      ) *
        config.animation.breathAmount +
      getCoherentNoise2D(
        normalizedY * 0.8,
        dynamics.time * 0.025,
        phase,
      ) *
        0.0035) *
      complexity;
  const pointerBand = gaussian(
    normalizedY,
    dynamics.pointerY,
    config.interaction.pointerRowSpread,
  );
  const pointerCompression = dynamics.reducedMotion
    ? 0
    : pointerBand *
      (-dynamics.pointerX * 0.006 + dynamics.velocity * 0.014) *
      complexity;
  const clickDistance = Math.abs(normalizedY - dynamics.clickY) * 1.25;
  const clickBand =
    dynamics.clickEnvelope *
    gaussian(clickDistance, dynamics.clickWaveFront, 0.16) *
    config.interaction.clickStrength *
    0.24 *
    complexity;

  return (
    getBaseRowHalfWidth(normalizedY, config) *
    (1 + idleContour + pointerCompression + clickBand)
  );
}

export function getRowSideScale(
  normalizedY: number,
  side: -1 | 1,
  dynamics: FieldDynamics,
) {
  const phase = getHalfPhase(normalizedY);
  const complexity = getWaistComplexity(normalizedY);
  const broad =
    side < 0
      ? Math.sin(normalizedY * 6.2 + phase * 0.7) * 0.043
      : Math.sin(normalizedY * 5.1 + phase * 1.8) * 0.038;
  const medium =
    side < 0
      ? Math.sin(normalizedY * 19.7 + 0.9) * 0.014
      : Math.sin(normalizedY * 17.3 + 2.1) * 0.016;
  const idle = dynamics.reducedMotion
    ? 0
    : Math.sin(
        dynamics.time * (side < 0 ? 0.075 : 0.064) +
          normalizedY * 4.3 +
          phase,
      ) * 0.005;

  return clamp(1 + (broad + medium + idle) * complexity, 0.92, 1.08);
}

export function getRowCenterX(
  normalizedY: number,
  dynamics: FieldDynamics,
) {
  const phase = getHalfPhase(normalizedY);
  const complexity = getWaistComplexity(normalizedY);
  const slowCurve =
    Math.sin(normalizedY * 3.8 + phase) * 0.01 +
    Math.sin(normalizedY * (normalizedY < 0 ? 11.5 : 10.1) + phase * 1.7) *
      0.005;
  const rowStagger =
    Math.sin(normalizedY * (normalizedY < 0 ? 53 : 59) + phase) * 0.0042;
  const idleDrift = dynamics.reducedMotion
    ? 0
    : Math.sin(dynamics.time * 0.11 + normalizedY * 5.2 + phase) * 0.002;
  const pointerBand = gaussian(normalizedY, dynamics.pointerY, 0.34);
  const pointerBend = dynamics.reducedMotion
    ? 0
    : pointerBand * dynamics.pointerX * 0.012;
  const velocityWarp = dynamics.reducedMotion
    ? 0
    : Math.sin(normalizedY * 31 + dynamics.time * 0.9 + phase) *
      dynamics.velocity *
      0.003;
  const clickDistance = Math.abs(normalizedY - dynamics.clickY) * 1.25;
  const clickWarp =
    Math.sin(normalizedY * 18 - dynamics.clickX * 3) *
    dynamics.clickEnvelope *
    gaussian(clickDistance, dynamics.clickWaveFront, 0.17) *
    0.005;

  return (
    (slowCurve + rowStagger + idleDrift + pointerBend + velocityWarp +
      clickWarp) *
    complexity
  );
}

export function getTerminalEdgeInset(
  normalizedX: number,
  normalizedY: number,
) {
  const distanceFromWaist = Math.abs(normalizedY);
  const tipInfluence = smoothstep(0.84, 1, distanceFromWaist);
  if (tipInfluence <= 0) {
    return 0;
  }

  const isUpper = normalizedY < 0;
  const phase = getHalfPhase(normalizedY);
  const contour =
    0.5 +
    getCoherentNoise2D(
      normalizedX * (isUpper ? 1.7 : 2.05),
      normalizedY * 3.2,
      phase,
    ) *
      0.42;
  const edgeAccent = 0.72 + Math.abs(normalizedX) * 0.28;

  return (
    tipInfluence *
    (isUpper ? 0.024 : 0.044) *
    clamp(contour, 0.08, 0.92) *
    edgeAccent
  );
}

function mapSection(
  value: number,
  sourceStart: number,
  sourceEnd: number,
  targetStart: number,
  targetEnd: number,
) {
  const progress = clamp(
    (value - sourceStart) / (sourceEnd - sourceStart),
    0,
    1,
  );
  return mix(targetStart, targetEnd, progress);
}

function getMotifCoordinate(
  rowU: number,
  normalizedY: number,
  dynamics: FieldDynamics,
) {
  const phase = getHalfPhase(normalizedY);
  const time = dynamics.reducedMotion ? 0 : dynamics.time;
  const rowNoise = getCoherentNoise2D(
    0.31,
    normalizedY * 1.85 + time * 0.012,
    phase,
  );
  const rowShift =
    Math.sin(normalizedY * 2.1 + phase) * 0.052 +
    Math.sin(normalizedY * 5.7 + phase * 1.3) * 0.027 +
    Math.sin(normalizedY * 11.5 - phase * 0.8) * 0.015 +
    rowNoise * 0.027 +
    (dynamics.reducedMotion
      ? 0
      : Math.sin(time * 0.07 + normalizedY * 2.3) * 0.011);
  const pointerBand = gaussian(normalizedY, dynamics.pointerY, 0.34);
  const pointerShift = dynamics.reducedMotion
    ? 0
    : dynamics.pointerX * pointerBand * 0.028;
  const clickDistance = Math.abs(normalizedY - dynamics.clickY) * 1.2;
  const clickShift =
    dynamics.clickEnvelope *
    gaussian(clickDistance, dynamics.clickWaveFront, 0.18) *
    Math.sin(normalizedY * 8 + rowU * 2.7) *
    0.035;
  const localWarp =
    Math.sin(rowU * Math.PI * 2.1 + normalizedY * 7.4 + phase) * 0.012 +
    getCoherentNoise2D(
      rowU * 1.35 + time * 0.01,
      normalizedY * 2.6,
      phase,
    ) *
      0.013 +
    Math.sin(normalizedY * 17 - rowU * 4 + time * 0.5) *
      dynamics.velocity *
      0.018;
  const endpointWindow = Math.sin(clamp(rowU, 0, 1) * Math.PI);
  const transformedU = clamp(
    rowU +
      (rowShift + pointerShift + clickShift + localWarp) * endpointWindow,
    0,
    1,
  );

  const leftEnd = clamp(
    MOTIF_SECTIONS.left +
      Math.sin(normalizedY * 3.3 + phase) * 0.026 +
      Math.sin(normalizedY * 13.1 - phase) * 0.012 +
      rowNoise * 0.014,
    0.06,
    0.145,
  );
  const descentEnd = clamp(
    MOTIF_SECTIONS.descent +
      Math.sin(normalizedY * 5.2 + phase * 1.4) * 0.041 +
      Math.sin(normalizedY * 11.3 + phase * 0.6) * 0.018 -
      rowNoise * 0.018,
    leftEnd + 0.09,
    0.31,
  );
  const troughEnd = clamp(
    MOTIF_SECTIONS.trough +
      Math.sin(normalizedY * 4.4 - phase) * 0.057 +
      Math.sin(normalizedY * 9.7 + phase * 1.2) * 0.022 +
      rowNoise * 0.022 +
      pointerBand * dynamics.pointerX * 0.012,
    descentEnd + 0.12,
    0.52,
  );
  const recoveryEnd = clamp(
    MOTIF_SECTIONS.recovery +
      Math.sin(normalizedY * 6.1 + phase * 0.8) * 0.035 +
      Math.sin(normalizedY * 12.1 - phase * 0.5) * 0.016 -
      rowNoise * 0.015,
    troughEnd + 0.05,
    0.61,
  );
  const transitionEnd = clamp(
    MOTIF_SECTIONS.transition +
      Math.sin(normalizedY * 5.55 + phase * 1.9) * 0.044 +
      Math.sin(normalizedY * 10.6 + phase * 0.4) * 0.022 +
      rowNoise * 0.019 -
      dynamics.velocity * 0.008,
    recoveryEnd + 0.045,
    0.71,
  );

  if (transformedU <= leftEnd) {
    return mapSection(
      transformedU,
      0,
      leftEnd,
      0,
      MOTIF_SECTIONS.left,
    );
  }
  if (transformedU <= descentEnd) {
    return mapSection(
      transformedU,
      leftEnd,
      descentEnd,
      MOTIF_SECTIONS.left,
      MOTIF_SECTIONS.descent,
    );
  }
  if (transformedU <= troughEnd) {
    return mapSection(
      transformedU,
      descentEnd,
      troughEnd,
      MOTIF_SECTIONS.descent,
      MOTIF_SECTIONS.trough,
    );
  }
  if (transformedU <= recoveryEnd) {
    return mapSection(
      transformedU,
      troughEnd,
      recoveryEnd,
      MOTIF_SECTIONS.trough,
      MOTIF_SECTIONS.recovery,
    );
  }
  if (transformedU <= transitionEnd) {
    return mapSection(
      transformedU,
      recoveryEnd,
      transitionEnd,
      MOTIF_SECTIONS.recovery,
      MOTIF_SECTIONS.transition,
    );
  }

  return mapSection(
    transformedU,
    transitionEnd,
    1,
    MOTIF_SECTIONS.transition,
    1,
  );
}

function interpolateMotif(motifU: number) {
  const value = clamp(motifU, 0, 1);

  for (let index = 0; index < MOTIF_ANCHORS.length - 1; index += 1) {
    const current = MOTIF_ANCHORS[index];
    const next = MOTIF_ANCHORS[index + 1];
    if (!current || !next || value > next.u) {
      continue;
    }

    const progress = smoothstep(current.u, next.u, value);
    return mix(current.ramp, next.ramp, progress);
  }

  return MOTIF_ANCHORS.at(-1)?.ramp ?? 0;
}

export function getWarpedHorizontalCoordinate(
  normalizedX: number,
  normalizedY: number,
  dynamics: FieldDynamics,
) {
  const rowU = clamp((normalizedX + 1) * 0.5, 0, 1);
  return getMotifCoordinate(rowU, normalizedY, dynamics) * 2 - 1;
}

export function getReferencePhase(
  rowU: number,
  normalizedY: number,
  dynamics: FieldDynamics,
) {
  const motifU = getMotifCoordinate(rowU, normalizedY, dynamics);
  const phase = getHalfPhase(normalizedY);
  const time = dynamics.reducedMotion ? 0 : dynamics.time;
  const rowDensityBias =
    Math.sin(normalizedY * 5.7 + phase) * 0.27 +
    getCoherentNoise2D(
      motifU * 1.8,
      normalizedY * 3.4 + time * 0.01,
      phase,
    ) *
      0.18;
  const contourVariation =
    Math.sin(normalizedY * 24 + motifU * 4.6 + phase + time * 0.08) *
      0.16 *
      getWaistComplexity(normalizedY);
  const lowerLobe = smoothstep(0.12, 0.78, normalizedY);
  const lowerLeftFalloff =
    1 - smoothstep(0.15, 0.58, motifU);
  const lowerLeftBias =
    lowerLobe *
    lowerLeftFalloff *
    (2.15 + Math.sin(normalizedY * 8.2 + phase) * 0.45);
  const rightTailVariation =
    smoothstep(0.78, 0.98, motifU) *
    (Math.sin(normalizedY * 7.1 + phase * 1.4) * 0.72 - 0.16);

  return clamp(
    interpolateMotif(motifU) +
      rowDensityBias +
      contourVariation +
      lowerLeftBias +
      rightTailVariation,
    0,
    MOTIF_ANCHORS.at(-1)?.ramp ?? 21,
  );
}

/** Targets the center of the exact bin used by p5.asciify's fragment shader. */
export function getRampIndexBrightness(
  rampIndex: number,
  rampLength: number,
) {
  const safeLength = Math.max(1, rampLength);
  const clampedIndex = clamp(rampIndex, 0, safeLength - 1);
  return ((clampedIndex + 0.5) / safeLength) * 255;
}

function getInteractionRampOffset(
  sourceX: number,
  normalizedY: number,
  dynamics: FieldDynamics,
  config: AsciiHeroConfig,
) {
  if (dynamics.reducedMotion) {
    return 0;
  }

  const pointerDistance = Math.hypot(
    (sourceX - dynamics.pointerX) * 0.82,
    (normalizedY - dynamics.pointerY) * 1.28,
  );
  const pointerInfluence =
    1 - smoothstep(0, config.interaction.pointerRadius, pointerDistance);
  const clickDistance = Math.hypot(
    (sourceX - dynamics.clickX) * 0.82,
    (normalizedY - dynamics.clickY) * 1.28,
  );
  const clickInfluence =
    dynamics.clickEnvelope *
    gaussian(clickDistance, dynamics.clickWaveFront, 0.14);

  return (
    pointerInfluence * (dynamics.pointerX - sourceX) * 0.42 +
    clickInfluence * Math.sin(normalizedY * 11 + sourceX * 5) * 0.58 +
    Math.sin(normalizedY * 31 + sourceX * 7 + dynamics.time) *
      dynamics.velocity *
      0.24
  );
}

export function getSourceBrightness(
  normalizedX: number,
  sourceX: number,
  normalizedY: number,
  dynamics: FieldDynamics,
  config: AsciiHeroConfig,
) {
  const rowU = clamp((normalizedX + 1) * 0.5, 0, 1);
  const motifIndex = getReferencePhase(rowU, normalizedY, dynamics);
  const interactionOffset = getInteractionRampOffset(
    sourceX,
    normalizedY,
    dynamics,
    config,
  );

  return getRampIndexBrightness(
    motifIndex + interactionOffset,
    config.characters.length,
  );
}
