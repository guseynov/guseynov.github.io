import Big from 'big.js';
export function multiplication(firstArg, secondArg) {
    if (firstArg && secondArg) {
        return new Big(firstArg).times(secondArg).valueOf();
    } else {
        return false;
    }
}
