import { combineReducers } from 'redux';
import changeColorsReducer from './reducers/changeColors';
import clearReducer from './reducers/clear';
import equalsReducer from './reducers/equals';
import setActionReducer from './reducers/setAction';
import writeReducer from './reducers/write';

const rootReducer = combineReducers({
    changeColors: changeColorsReducer,
    clear: clearReducer,
    equals: equalsReducer,
    setAction: setActionReducer,
    write: writeReducer
} as any);

export default rootReducer;
