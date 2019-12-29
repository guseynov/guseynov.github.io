import initialStore from '../initialStore';
import { CalculatorStore } from '../types';
import Big from 'big.js';

export default function equalsReducer(store = initialStore): CalculatorStore {
    let result: number;
    switch (store.action) {
        case 'addition':
            result = parseFloat(
                new Big(store.firstArgument)
                    .plus(store.secondArgument)
                    .valueOf()
            );
            break;
        case 'division':
            if (store.secondArgument === 0) {
                result = 0;
            } else {
                result = parseFloat(
                    new Big(store.firstArgument)
                        .div(store.secondArgument)
                        .valueOf()
                );
            }
            break;
        case 'multiplication':
            result = parseFloat(
                new Big(store.firstArgument)
                    .times(store.secondArgument)
                    .valueOf()
            );
            break;
        case 'substraction':
            result = parseFloat(
                new Big(store.firstArgument)
                    .minus(store.secondArgument)
                    .valueOf()
            );
            break;
        default:
            return { ...store };
    }
    const storeUpdate = {
        result: result,
        action: undefined,
        firstArgument: result,
        secondArgument: undefined
    };
    return { ...store, ...storeUpdate };
}
