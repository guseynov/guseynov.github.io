import initialStore from '../initialStore';
import * as Types from '../types';
import palettes from '../../palettes/100';

export default function changeColorsReducer(
    store = initialStore
): Types.CalculatorStore {
    const randomNumber: number = Math.floor(Math.random() * 100);
    const randomPalette: Array<string> = palettes[randomNumber];
    const storeUpdate: object = {
        colors: {
            background: randomPalette[0],
            wrapper: randomPalette[1],
            borders: randomPalette[2],
            digits: randomPalette[3],
            actions: randomPalette[4]
        }
    };
    return { ...store, ...storeUpdate };
}
