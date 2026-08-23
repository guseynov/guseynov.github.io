import type { AsciiHeroConfig } from "./asciiConfig";

export interface FieldDynamics {
  clickEnvelope: number;
  clickWaveFront: number;
  clickX: number;
  clickY: number;
  pointerX: number;
  pointerY: number;
  reducedMotion: boolean;
  morphAmount: number;
  sequenceProgress: number;
  time: number;
  velocity: number;
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

export function getBaseRowHalfWidth(
  normalizedY: number,
  config: AsciiHeroConfig,
) {
  const y = clamp(normalizedY, -1, 1);
  const distanceFromWaist = Math.abs(y);
  const lobe = Math.sin(distanceFromWaist * Math.PI);
  const waistTaper = smoothstep(0.025, 0.25, distanceFromWaist);
  const terminalTaper =
    1 - smoothstep(0.84, 1, distanceFromWaist) * 0.82;
  const asymmetry = y < 0 ? 0.97 : 1.03;

  return Math.max(
    config.shape.waistWidth,
    lobe * waistTaper * terminalTaper * asymmetry,
  );
}

export function getRowHalfWidth(
  normalizedY: number,
  dynamics: FieldDynamics,
  config: AsciiHeroConfig,
) {
  const baseWidth = getBaseRowHalfWidth(normalizedY, config);
  if (dynamics.reducedMotion) {
    return baseWidth;
  }

  const breath =
    Math.sin(
      dynamics.time * config.animation.breathSpeed * Math.PI * 2 +
        normalizedY * 0.7,
    ) * config.animation.breathAmount;
  const livingContour =
    Math.sin(dynamics.time * 0.31 + normalizedY * 4.2) * 0.012;
  const pointerBand = gaussian(
    normalizedY,
    dynamics.pointerY,
    config.interaction.pointerRowSpread,
  );
  const pointerResponse =
    pointerBand * (dynamics.velocity * 0.045 - dynamics.pointerX * 0.012);
  const clickDistance = Math.abs(normalizedY - dynamics.clickY) * 1.25;
  const clickRipple =
    dynamics.clickEnvelope *
    gaussian(clickDistance, dynamics.clickWaveFront, 0.14) *
    config.interaction.clickStrength;
  const sequenceContour =
    dynamics.morphAmount *
    Math.sin(
      normalizedY * 5.4 + dynamics.sequenceProgress * Math.PI * 4.5,
    ) *
    0.065;

  return Math.max(
    config.shape.waistWidth,
    baseWidth *
      (1 +
        breath +
        livingContour +
        pointerResponse +
        clickRipple +
        sequenceContour),
  );
}

export function getRowCenterX(
  normalizedY: number,
  dynamics: FieldDynamics,
) {
  const waistFade = smoothstep(0.04, 0.34, Math.abs(normalizedY));
  const staticCurve =
    Math.sin(normalizedY * 2.35) * 0.028 +
    Math.sin(normalizedY * 5.1 + 0.8) * 0.007;
  const drift = dynamics.reducedMotion
    ? 0
    : Math.sin(dynamics.time * 0.17 + normalizedY * 2.8) * 0.009;
  const pointerBend = dynamics.reducedMotion
    ? 0
    : gaussian(normalizedY, dynamics.pointerY, 0.3) *
      dynamics.pointerX *
      0.035;
  const clickBend =
    dynamics.clickEnvelope *
    gaussian(
      Math.abs(normalizedY - dynamics.clickY) * 1.25,
      dynamics.clickWaveFront,
      0.15,
    ) *
    Math.sin(normalizedY * 7 - dynamics.clickX * 2) *
    0.018;
  const sequenceBend =
    dynamics.morphAmount *
    Math.sin(
      normalizedY * 3.15 + dynamics.sequenceProgress * Math.PI * 5.2,
    ) *
    0.085;

  return (
    (staticCurve + drift + pointerBend + clickBend + sequenceBend) * waistFade
  );
}

export function getRowSideScale(
  normalizedY: number,
  side: -1 | 1,
  dynamics: FieldDynamics,
) {
  const staticVariation =
    Math.sin(normalizedY * (side < 0 ? 4.7 : 5.3) + side * 0.8) * 0.014;
  const idleVariation = dynamics.reducedMotion
    ? 0
    : Math.sin(dynamics.time * 0.21 + normalizedY * 3.5 + side) * 0.009;
  const sequenceVariation =
    dynamics.morphAmount *
    Math.sin(
      normalizedY * (side < 0 ? 6.3 : 5.7) +
        dynamics.sequenceProgress * Math.PI * 4.2 +
        side,
    ) *
    0.042;

  return 1 + staticVariation + idleVariation + sequenceVariation;
}

export function getFieldCharacter(
  normalizedX: number,
  normalizedY: number,
  dynamics: FieldDynamics,
  config: AsciiHeroConfig,
) {
  const time = dynamics.reducedMotion ? 0 : dynamics.time;
  const pointerBand = gaussian(normalizedY, dynamics.pointerY, 0.3);
  const clickDistance = Math.abs(normalizedY - dynamics.clickY) * 1.25;
  const clickBand =
    dynamics.clickEnvelope *
    gaussian(clickDistance, dynamics.clickWaveFront, 0.15);
  const edgeThreshold = clamp(
    0.7 +
      Math.sin(normalizedY * 7.2 + time * 0.34) * 0.045 +
      Math.sin(normalizedY * 17.3 - time * 0.11) * 0.018 -
      pointerBand * dynamics.velocity * 0.045 +
      clickBand * 0.08,
    0.58,
    0.82,
  );

  const simpleCharacter = Math.abs(normalizedX) > edgeThreshold
    ? config.characters.edge
    : config.characters.body;

  if (dynamics.morphAmount <= 0.001) {
    return simpleCharacter;
  }

  const ramp = config.characters.ramp;
  const simpleIndex = Math.max(1, ramp.indexOf(simpleCharacter));
  const travellingWave =
    Math.sin(
      normalizedY * 6.4 -
        dynamics.sequenceProgress * Math.PI * 10 +
        normalizedX * 2.2,
    ) *
    Math.sin(dynamics.morphAmount * Math.PI) *
    0.18;
  const localMorphAmount = clamp(
    dynamics.morphAmount + travellingWave,
    0,
    1,
  );
  const horizontalPhase = clamp(
    (normalizedX + 1) * 0.5 +
      Math.sin(
        normalizedY * 5.8 + dynamics.sequenceProgress * Math.PI * 4.5,
      ) *
        0.075 +
      Math.sin(normalizedY * 13.4 - normalizedX * 3.1) * 0.032,
    0,
    1,
  );
  const complexIndex = 1 + Math.floor(horizontalPhase * (ramp.length - 2));
  const characterIndex = Math.round(
    mix(simpleIndex, complexIndex, localMorphAmount),
  );

  return ramp[characterIndex] ?? simpleCharacter;
}
