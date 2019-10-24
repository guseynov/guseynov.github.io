import { zerosChecker } from './zerosChecker';
import { firstArgHandler } from './firstArgHandler';
import { secondArgHandler } from './secondArgHandler';
import { decimal } from './decimal';

export function write(newArg, firstArg, secondArg, action, display) {
    if (!zerosChecker(newArg, firstArg, secondArg)) {
        if (newArg === '.') {
            return decimal(firstArg, secondArg, display);
        }
        if (firstArg === undefined || action === undefined) {
            return firstArgHandler(newArg, firstArg, display);
        } else {
            return secondArgHandler(newArg, secondArg, display);
        }
    } else {
        return false;
    }
}
