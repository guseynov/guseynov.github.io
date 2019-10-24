import Big from 'big.js';
export function division(firstArg, secondArg) {
    if (firstArg && secondArg) {
        return new Big(firstArg).div(secondArg).valueOf();
    } else {
        return false;
    }
}
