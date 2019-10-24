export function zerosChecker(newArg, firstArg, secondArg) {
    let result = false;
    const zeroInthestore = firstArg === 0 || secondArg === 0;
    if (newArg === 0 && zeroInthestore) {
        result = true;
    }
    return result;
}
