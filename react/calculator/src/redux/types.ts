export const CLEAN = 'CLEAN';
export const WRITE = 'WRITE';
export const EQUALS = 'EQUALS';
export const SET_ACTION = 'SET_ACTION';
export const CHANGE_COLORS = 'CHANGE_COLORS';

export interface CleanAction {
    type: typeof CLEAN;
}

export interface WriteAction {
    type: typeof WRITE;
    payload: number;
}

export interface SetActionAction {
    type: typeof SET_ACTION;
    payload: string;
}

export interface EqualsAction {
    type: typeof EQUALS;
}

export interface ChangeColorsAction {
    type: typeof CHANGE_COLORS;
}

export interface CalculatorStore {
    action?: string;
    firstArgument?: number;
    secondArgument?: number;
    result?: number;
    colors: {
        background: string;
        wrapper: string;
        borders: string;
        digits: string;
        actions: string;
    };
}
