import Big from 'big.js';
export function substraction(firstArg, secondArg) {
    if (firstArg && secondArg) {
        return new Big(firstArg).minus(secondArg).valueOf();
    } else {
        return false;
    }
}
