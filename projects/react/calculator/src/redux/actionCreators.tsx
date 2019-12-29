import * as Types from './types';

export function clean(): Types.CleanAction {
    return {
        type: 'CLEAN'
    };
}

export function write(content: number): Types.WriteAction {
    return {
        type: 'WRITE',
        payload: content
    };
}

export function setAction(actionName: string): Types.SetActionAction {
    return {
        type: 'SET_ACTION',
        payload: actionName
    };
}

export function equals(): Types.EqualsAction {
    return {
        type: 'EQUALS'
    };
}

export function changeColors(): Types.ChangeColorsAction {
    return {
        type: 'CHANGE_COLORS'
    };
}
