import * as palettes from '../palettes/100.json';
const defaultPalette = palettes.default[2];
export const initialStore = {
    action: undefined,
    firstArg: undefined,
    secondArg: undefined,
    display: 0,
    result: undefined,
    colors: {
        background: defaultPalette[0],
        wrapper: defaultPalette[1],
        borders: defaultPalette[2],
        digits: defaultPalette[3],
        actions: defaultPalette[4]
    }
};
