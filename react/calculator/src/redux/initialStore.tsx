import palettes from '../palettes/100';

const defaultPalette: Array<string> = palettes[2];
export default {
    action: '',
    firstArgument: 0,
    secondArgument: 0,
    result: 0,
    colors: {
        background: defaultPalette[0],
        wrapper: defaultPalette[1],
        borders: defaultPalette[2],
        digits: defaultPalette[3],
        actions: defaultPalette[4]
    }
};
