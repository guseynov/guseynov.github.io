import initialStore from '../initialStore';
import { CalculatorStore, WriteAction } from '../types';

export default function writeReducer(
    store = initialStore,
    input: WriteAction
): CalculatorStore {
    let storeUpdate: object;
    if (store.action) {
        storeUpdate = {
            secondArgument:
                (store.secondArgument.toString() || '') + input.toString()
        };
    } else {
        storeUpdate = {
            firstArgument:
                (store.firstArgument.toString() || '') + input.toString()
        };
    }

    return { ...store, ...storeUpdate };
}
