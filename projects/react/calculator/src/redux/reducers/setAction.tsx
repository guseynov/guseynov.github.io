import initialStore from '../initialStore';
import { CalculatorStore, SetActionAction } from '../types';

export default function setActionReducer(
    store = initialStore,
    action: SetActionAction
): CalculatorStore {
    const storeUpdate: object = {
        action: action.payload
    };
    return { ...store, ...storeUpdate };
}
