import palettes from '../palettes/100';

const defaultPalette = palettes[0];
export default {
    action: '',
    firstArgument: 0,
    secondArgument: 0,
    result: 0,
    display: 0,
    colors: {
        wrapper: defaultPalette[0],
        borders: defaultPalette[1],
        digits: defaultPalette[2],
        actions: defaultPalette[3]
    }
};