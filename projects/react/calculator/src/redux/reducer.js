import Big from "big.js";
import { OPERATOR_SYMBOLS } from "../calculatorConfig";
import palettes from "../palettes/100";
import initialState from "./initialState";

const MAX_INPUT_LENGTH = 16;

function getPaletteColors(palette) {
  return {
    wrapper: palette[0],
    borders: palette[1],
    digits: palette[2],
    actions: palette[3]
  };
}

function formatValue(value) {
  const stringValue = value.toString();

  if (stringValue === "-0") {
    return "0";
  }

  if (stringValue.length <= 12) {
    return stringValue;
  }

  return new Big(value)
    .toPrecision(10)
    .replace(/(\.\d*?[1-9])0+$/u, "$1")
    .replace(/\.0+$|(\.\d*?)0+(e.*)?$/u, "$1$2");
}

function buildExpression(previousValue, operator, currentValue, isComplete = false) {
  if (!previousValue) {
    return "";
  }

  const symbol = OPERATOR_SYMBOLS[operator];

  if (!symbol) {
    return isComplete ? `${previousValue} =` : previousValue;
  }

  if (currentValue === null || currentValue === undefined || currentValue === "") {
    return `${previousValue} ${symbol}`;
  }

  return `${previousValue} ${symbol} ${currentValue}${isComplete ? " =" : ""}`;
}

function calculateResult(previousValue, currentValue, operator) {
  const left = new Big(previousValue);
  const right = new Big(currentValue);

  switch (operator) {
    case "addition":
      return left.plus(right);
    case "substraction":
      return left.minus(right);
    case "multiplication":
      return left.times(right);
    case "division":
      if (right.eq(0)) {
        throw new Error("Cannot divide by zero");
      }

      return left.div(right);
    default:
      return null;
  }
}

function resetCalculatorState(state) {
  return {
    ...state,
    operator: null,
    previousValue: null,
    currentValue: "0",
    expression: "",
    justEvaluated: false,
    error: null,
    display: "0"
  };
}

function getRandomPaletteIndex(currentColors) {
  if (palettes.length <= 1) {
    return 0;
  }

  let nextIndex = Math.floor(Math.random() * palettes.length);
  const currentIndex = palettes.findIndex(
    palette =>
      palette[0] === currentColors.wrapper &&
      palette[1] === currentColors.borders &&
      palette[2] === currentColors.digits &&
      palette[3] === currentColors.actions
  );

  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * palettes.length);
  }

  return nextIndex;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_COLORS": {
      const randomPalette = palettes[getRandomPaletteIndex(state.colors)];

      return {
        ...state,
        colors: getPaletteColors(randomPalette)
      };
    }
    case "CLEAR":
      return resetCalculatorState(state);
    case "BACKSPACE": {
      if (state.error) {
        return resetCalculatorState(state);
      }

      if (state.justEvaluated || state.currentValue === "0") {
        return state;
      }

      const nextValue = state.currentValue.length > 1 ? state.currentValue.slice(0, -1) : "0";

      return {
        ...state,
        currentValue: nextValue,
        display: nextValue,
        expression:
          state.operator && state.previousValue
            ? buildExpression(state.previousValue, state.operator, nextValue)
            : ""
      };
    }
    case "WRITE": {
      const input = action.payload;

      if (state.error) {
        const nextValue = input === "." ? "0." : input;

        return {
          ...state,
          currentValue: nextValue,
          display: nextValue,
          error: null,
          justEvaluated: false,
          expression: "",
          operator: null,
          previousValue: null
        };
      }

      const shouldResetValue = state.justEvaluated && !state.operator;
      const baseValue = state.currentValue;

      let nextValue;

      if (shouldResetValue) {
        nextValue = input === "." ? "0." : input;
      } else if (input === "." && baseValue.includes(".")) {
        return state;
      } else if (baseValue === "0" && input !== ".") {
        nextValue = input;
      } else if (baseValue.length >= MAX_INPUT_LENGTH) {
        return state;
      } else {
        nextValue = `${baseValue}${input}`;
      }

      if (state.operator && state.justEvaluated) {
        nextValue = input === "." ? "0." : input;
      }

      return {
        ...state,
        currentValue: nextValue,
        display: nextValue,
        error: null,
        justEvaluated: false,
        expression:
          state.operator && state.previousValue
            ? buildExpression(state.previousValue, state.operator, nextValue)
            : ""
      };
    }
    case "SET_ACTION": {
      if (state.error) {
        return state;
      }

      const nextOperator = action.payload;

      if (state.operator && state.justEvaluated) {
        return {
          ...state,
          operator: nextOperator,
          expression: buildExpression(state.previousValue || state.currentValue, nextOperator, "")
        };
      }

      if (!state.operator) {
        return {
          ...state,
          operator: nextOperator,
          previousValue: state.currentValue,
          justEvaluated: true,
          expression: buildExpression(state.currentValue, nextOperator, "")
        };
      }

      if (state.justEvaluated) {
        return {
          ...state,
          operator: nextOperator,
          expression: buildExpression(state.previousValue, nextOperator, "")
        };
      }

      try {
        const result = calculateResult(state.previousValue, state.currentValue, state.operator);
        const formattedResult = formatValue(result);

        return {
          ...state,
          operator: nextOperator,
          previousValue: formattedResult,
          currentValue: formattedResult,
          display: formattedResult,
          justEvaluated: true,
          expression: buildExpression(formattedResult, nextOperator, "")
        };
      } catch (error) {
        return {
          ...state,
          operator: null,
          previousValue: null,
          currentValue: "0",
          display: error.message,
          expression: buildExpression(state.previousValue, state.operator, state.currentValue, true),
          justEvaluated: false,
          error: error.message
        };
      }
    }
    case "EQUALS": {
      if (state.error || !state.operator || state.justEvaluated) {
        return state;
      }

      try {
        const result = calculateResult(state.previousValue, state.currentValue, state.operator);
        const formattedResult = formatValue(result);

        return {
          ...state,
          operator: null,
          previousValue: formattedResult,
          currentValue: formattedResult,
          display: formattedResult,
          expression: buildExpression(state.previousValue, state.operator, state.currentValue, true),
          justEvaluated: true,
          error: null
        };
      } catch (error) {
        return {
          ...state,
          operator: null,
          previousValue: null,
          currentValue: "0",
          display: error.message,
          expression: buildExpression(state.previousValue, state.operator, state.currentValue, true),
          justEvaluated: false,
          error: error.message
        };
      }
    }
    default:
      return state;
  }
}
