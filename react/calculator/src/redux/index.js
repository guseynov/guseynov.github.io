import { initialStore } from './initialStore';
import { addition } from '../helpers/addition';
import { division } from '../helpers/division';
import { multiplication } from '../helpers/multiplication';
import { substraction } from '../helpers/substraction';
import { write } from '../helpers/write';
import * as palettes from '../palettes/100.json';

export default function rootReducer(store = initialStore, action) {
    let newStore = {};
    let result = undefined;
    switch (action.type) {
        case 'CHANGE_COLORS': {
            const randomNumber = Math.floor(Math.random() * 100);
            const randomPalette = palettes.default[randomNumber];
            newStore = {
                colors: {
                    background: randomPalette[0],
                    wrapper: randomPalette[1],
                    borders: randomPalette[2],
                    digits: randomPalette[3],
                    actions: randomPalette[4]
                }
            };

            document.body.style.backgroundColor = newStore.colors.background;
            return { ...store, ...newStore };
        }
        case 'ADDITION':
            newStore = {
                action: 'add'
            };
            return { ...store, ...newStore };
        case 'DIVISION':
            newStore = {
                action: 'div'
            };
            return { ...store, ...newStore };
        case 'MULTIPLICATION':
            newStore = {
                action: 'times'
            };
            return { ...store, ...newStore };
        case 'SUBSTRACTION':
            newStore = {
                action: 'minus'
            };
            return { ...store, ...newStore };
        case 'EQUALS':
            switch (store.action) {
                case 'add':
                    result = addition(store.firstArg, store.secondArg);
                    newStore = {
                        result: result,
                        display: result,
                        action: undefined,
                        firstArg: result,
                        secondArg: undefined
                    };
                    return { ...store, ...newStore };
                case 'div':
                    if (store.secondArg === 0) {
                        result = 'Error';
                    } else {
                        result = division(store.firstArg, store.secondArg);
                    }
                    newStore = {
                        result: result,
                        display: result,
                        action: undefined,
                        firstArg: result,
                        secondArg: undefined
                    };
                    return { ...store, ...newStore };
                case 'times':
                    result = multiplication(store.firstArg, store.secondArg);
                    newStore = {
                        result: result,
                        display: result,
                        action: undefined,
                        firstArg: result,
                        secondArg: undefined
                    };
                    return { ...store, ...newStore };
                case 'minus':
                    result = substraction(store.firstArg, store.secondArg);
                    newStore = {
                        result: result,
                        display: result,
                        action: undefined,
                        firstArg: result,
                        secondArg: undefined
                    };
                    return { ...store, ...newStore };
                default:
                    return initialStore;
            }
        case 'CLEAN':
            newStore = initialStore;
            return { ...store, ...newStore };
        case 'WRITE':
            result = write(
                action.payload,
                store.firstArg,
                store.secondArg,
                store.action,
                store.display
            );
            if (result) {
                switch (result.argumentIndex) {
                    case 1:
                        newStore = {
                            firstArg: result.value,
                            display: result.value
                        };
                        break;
                    case 2:
                        newStore = {
                            secondArg: result.value,
                            display: result.value
                        };
                        break;
                    default:
                        break;
                }
            }
            return { ...store, ...newStore };
        case 'SET_ACTION':
            newStore = {
                action: action.payload
            };
            return { ...store, ...newStore };
        default:
            return store;
    }
}
