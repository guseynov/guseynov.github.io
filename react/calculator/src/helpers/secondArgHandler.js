export function secondArgHandler(newArg, secondArg, display) {
    if (display.length >= 5 && secondArg) {
        return false;
    }
    if (secondArg) {
        secondArg = secondArg.toString() + newArg.toString();
    } else {
        secondArg = newArg;
    }
    return { value: secondArg, argumentIndex: 2 };
}
