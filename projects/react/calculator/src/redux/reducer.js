import initialState from "./initialState";
import palettes from "../palettes/100";
import Big from "big.js";

export default function changeColors(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_COLORS":
      const randomNumber = Math.floor(Math.random() * 100);
      const randomPalette = palettes[randomNumber];
      return {
        ...state,
        colors: {
          wrapper: randomPalette[0],
          borders: randomPalette[1],
          digits: randomPalette[2],
          actions: randomPalette[3]
        }
      };
    case "CLEAR":
      return {
        ...state,
        result: undefined,
        action: undefined,
        firstArgument: undefined,
        secondArgument: undefined,
        display: 0
      }
    case "EQUALS":
      let result;
      switch (state.action) {
        case "addition":
          result = parseFloat(
            new Big(state.firstArgument)
              .plus(state.secondArgument)
              .toPrecision(5)
              .valueOf()
          );
          break;
        case "division":
          if (state.secondArgument === 0) {
            result = 0;
          } else {
            result = parseFloat(
              new Big(state.firstArgument)
                .div(state.secondArgument)
                .toPrecision(5)
                .valueOf()
            );
          }
          break;
        case "multiplication":
          result = parseFloat(
            new Big(state.firstArgument)
              .times(state.secondArgument)
              .toPrecision(5)
              .valueOf()
          );
          break;
        case "substraction":
          result = parseFloat(
            new Big(state.firstArgument)
              .minus(state.secondArgument)
              .toPrecision(5)
              .valueOf()
          );
          break;
        default:
          return { ...state };
      }
      return {
        ...state,
        result: result,
        action: undefined,
        firstArgument: result,
        secondArgument: undefined,
        display: result
      };
    case "SET_ACTION":
      return { ...state, action: action.payload };
    case "WRITE":
      if (state.action) {
        const newString =
          (state.secondArgument || "") + action.payload.toString();
        return {
          ...state,
          secondArgument: newString,
          display: newString
        };
      } else {
        const newString =
          (state.firstArgument || "") + action.payload.toString();
        return {
          ...state,
          firstArgument: newString,
          display: newString
        };
      }
    default:
      return state;
  }
}
