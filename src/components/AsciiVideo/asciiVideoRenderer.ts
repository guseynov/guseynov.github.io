const characters = " .,:;i1tfLCG08@";
const maxColumns = 300;

export type AsciiVideoOptions = {
  fontSize?: number;
  blackPoint?: number;
  whitePoint?: number;
  inverted?: boolean;
};

export function createAsciiVideoRenderer(
  root: HTMLDivElement,
  output: HTMLPreElement,
  video: HTMLVideoElement,
  { fontSize: fixedFontSize, blackPoint = 0, whitePoint = 255, inverted = false }: AsciiVideoOptions,
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;

  // Tune the tonal range for each source while sharing the same glyph ramp.
  const characterByLuminance = Array.from({ length: 256 }, (_, luminance) => {
    const brightness = Math.max(0, Math.min(1, (luminance - blackPoint) / (whitePoint - blackPoint)));
    const density = inverted ? 1 - brightness : brightness;
    return characters[Math.round(Math.pow(density, 0.9) * (characters.length - 1))];
  });

  let width = 0;
  let height = 0;
  let columns = 0;
  let rows = 0;

  const resize = () => {
    width = root.clientWidth;
    height = root.clientHeight;
    if (!width || !height) return;

    const minimumFontSize = fixedFontSize ?? (window.matchMedia("(min-width: 768px)").matches ? 9 : 7);
    const fontSize = Math.max(minimumFontSize, width / (maxColumns * 0.6));
    const lineHeight = fontSize * 1.2;
    output.style.fontSize = `${fontSize}px`;
    output.style.lineHeight = `${lineHeight}px`;

    const style = window.getComputedStyle(output);
    context.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
    const characterWidth = context.measureText("M").width;
    columns = Math.ceil(width / characterWidth);
    rows = Math.ceil(height / lineHeight);
    canvas.width = columns;
    canvas.height = rows;
  };

  const render = () => {
    if (!columns || !rows || video.readyState < 2 || !video.videoWidth) return false;

    // Match object-fit: cover using CSS dimensions, before sampling the
    // non-square character grid. This preserves the video's proportions.
    const scale = Math.max(width / video.videoWidth, height / video.videoHeight);
    const sourceWidth = width / scale;
    const sourceHeight = height / scale;
    context.drawImage(
      video,
      (video.videoWidth - sourceWidth) / 2,
      (video.videoHeight - sourceHeight) / 2,
      sourceWidth,
      sourceHeight,
      0,
      0,
      columns,
      rows,
    );

    const { data } = context.getImageData(0, 0, columns, rows);
    const lines = new Array<string>(rows);
    let pixel = 0;

    for (let row = 0; row < rows; row += 1) {
      let line = "";
      for (let column = 0; column < columns; column += 1) {
        const luminance = Math.round(
          data[pixel] * 0.2126 + data[pixel + 1] * 0.7152 + data[pixel + 2] * 0.0722,
        );
        line += characterByLuminance[luminance];
        pixel += 4;
      }
      lines[row] = line;
    }

    // One text node keeps the glyphs sharp without thousands of React updates.
    output.textContent = lines.join("\n");
    return true;
  };

  return { resize, render };
}
