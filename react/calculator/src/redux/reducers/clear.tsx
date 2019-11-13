import initialStore from '../initialStore';
import { CalculatorStore } from '../types';

export default function clearReducer(store = initialStore): CalculatorStore {
    return { ...store, ...initialStore };
}
