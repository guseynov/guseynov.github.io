export function plus() {
    return {
        type: 'ADDITION'
    };
}

export function clean() {
    return {
        type: 'CLEAN'
    };
}

export function write(arg) {
    return {
        type: 'WRITE',
        payload: arg
    };
}

export function div() {
    return {
        type: 'DIVISION'
    };
}
export function times() {
    return {
        type: 'MULTIPLICATION'
    };
}

export function minus() {
    return {
        type: 'SUBSTRACTION'
    };
}

export function equals() {
    return {
        type: 'EQUALS'
    };
}

export function setAction(arg) {
    return {
        type: 'SET_ACTION',
        payload: arg
    };
}

export function changeColors() {
    return {
        type: 'CHANGE_COLORS'
    };
}
