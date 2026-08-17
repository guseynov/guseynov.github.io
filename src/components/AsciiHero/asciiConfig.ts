export const REFERENCE_RAMP = " .-:/+=><!?3I254968A0N";
export const DEBUG_SHOW_SOURCE = false;
export const DEBUG_FREEZE_TIME = false;
export const DEBUG_SHOW_MOTIF = false;

export const ASCII_CONFIG = {
  characters: REFERENCE_RAMP,
  edgeCharacters: "-/|\\-/|\\",
  colors: {
    background: "#202020",
    foreground: "#dedede",
  },
  shape: {
    width: 0.84,
    height: 0.75,
    centerY: 0.46,
    waistWidth: 0.0095,
    fieldRows: 72,
    fieldSegments: 96,
  },
  animation: {
    breathSpeed: 0.28,
    breathAmount: 0.005,
    rotationDegrees: 0.18,
  },
  interaction: {
    smoothing: 0.07,
    parallaxX: 12,
    parallaxY: 7,
    pointerRadius: 0.36,
    pointerRowSpread: 0.31,
    pointerStrength: 0.085,
    velocityStrength: 0.1,
    clickStrength: 0.13,
    clickDurationMs: 1200,
  },
  ascii: {
    desktopSize: 14,
    laptopSize: 14,
    tabletSize: 16,
    mobileSize: 18,
    lineHeight: 1.18,
    edgeEnabled: false,
  },
  performance: {
    frameRate: 50,
    pixelDensity: 1,
  },
} as const;

export type AsciiHeroConfig = typeof ASCII_CONFIG;

export function getAsciiFontSize(width: number) {
  if (width >= 1440) {
    return ASCII_CONFIG.ascii.desktopSize;
  }

  if (width >= 1024) {
    return ASCII_CONFIG.ascii.laptopSize;
  }

  if (width >= 768) {
    return ASCII_CONFIG.ascii.tabletSize;
  }

  return ASCII_CONFIG.ascii.mobileSize;
}
