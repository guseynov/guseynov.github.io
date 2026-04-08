import palettes from "../palettes/100";

const defaultPalette = palettes[0];

export default {
  operator: null,
  previousValue: null,
  currentValue: "0",
  expression: "",
  justEvaluated: false,
  error: null,
  display: "0",
  colors: {
    wrapper: defaultPalette[0],
    borders: defaultPalette[1],
    digits: defaultPalette[2],
    actions: defaultPalette[3]
  }
};
