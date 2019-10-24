export function firstArgHandler(newArg, firstArg, display) {
    if (display.length >= 5) {
        return false;
    }
    if (firstArg) {
        firstArg = firstArg.toString() + newArg.toString();
    } else {
        firstArg = newArg;
    }
    return { value: firstArg, argumentIndex: 1 };
}
