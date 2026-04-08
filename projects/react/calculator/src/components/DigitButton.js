import React from "react";
import fontColorContrast from "font-color-contrast";
import { useDispatch, useSelector } from "react-redux";
import { write } from "../redux/actionCreators";

function DigitButton({ value, additionalClass = "" }) {
  const dispatch = useDispatch();
  const digitColor = useSelector(state => state.colors.digits);

  return (
    <button
      type="button"
      style={{
        backgroundColor: digitColor,
        color: fontColorContrast(digitColor)
      }}
      onClick={() => dispatch(write(value))}
      className={`calculator-button calculator-button--digit ${additionalClass}`}
      aria-label={value === "." ? "Decimal point" : `Digit ${value}`}
    >
      {value}
    </button>
  );
}

export default DigitButton;
