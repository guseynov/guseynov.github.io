export const ASCII_CONFIG = {
  characters: {
    edge: ".",
    body: "-",
    ramp: " .-:/+=><!?3I254968A0N",
  },
  shape: {
    desktopWidth: 0.34,
    tabletWidth: 0.48,
    mobileWidth: 0.72,
    height: 0.94,
    centerY: 0.5,
    waistWidth: 0.012,
  },
  animation: {
    breathSpeed: 0.12,
    breathAmount: 0.045,
    frameRate: 60,
  },
  sequence: {
    durationMs: 5400,
    expandedWidth: 0.88,
  },
  interaction: {
    smoothing: 0.07,
    parallaxX: 12,
    parallaxY: 7,
    pointerRadius: 0.36,
    pointerRowSpread: 0.31,
    clickStrength: 0.13,
    clickDurationMs: 1200,
    label: "CLICK",
  },
  ascii: {
    desktopSize: 12.5,
    laptopSize: 12.5,
    tabletSize: 12,
    mobileSize: 12,
  },
} as const;

export type AsciiHeroConfig = typeof ASCII_CONFIG;

export function getAsciiShapeWidth(width: number) {
  if (width >= 1024) {
    return ASCII_CONFIG.shape.desktopWidth;
  }

  if (width >= 640) {
    return ASCII_CONFIG.shape.tabletWidth;
  }

  return ASCII_CONFIG.shape.mobileWidth;
}

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
