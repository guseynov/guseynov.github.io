export function addition() {
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

export function division() {
    return {
        type: 'DIVISION'
    };
}
export function multiplication() {
    return {
        type: 'MULTIPLICATION'
    };
}

export function substraction() {
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
