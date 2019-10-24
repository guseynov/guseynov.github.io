import Big from 'big.js';

export function addition(firstArg, secondArg) {
    if (firstArg && secondArg) {
        return new Big(firstArg).plus(secondArg).valueOf();
    } else {
        return false;
    }
}
