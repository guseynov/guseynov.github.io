export function decimal(firstArg, secondArg, acceptDecimals) {
    if (acceptDecimals === false) {
        return false;
    }
    if (firstArg === undefined || firstArg == 0) {
        return { value: (firstArg || 0) + '.', argumentIndex: 1 };
    } else {
        return { value: (secondArg || 0) + '.', argumentIndex: 2 };
    }
}
