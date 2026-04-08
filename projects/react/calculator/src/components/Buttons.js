import React from "react";
import { useSelector } from "react-redux";
import { DIGIT_ROWS } from "../calculatorConfig";
import ActionButton from "./ActionButton";
import DigitButton from "./DigitButton";

const ACTIONS = ["division", "multiplication", "substraction", "addition", "equals"];

function Buttons() {
  const borderColor = useSelector(state => state.colors.borders);

  return (
    <div
      style={{
        borderColor
      }}
      className="calculator-buttons"
      role="group"
      aria-label="Calculator keypad"
    >
      <div className="calculator-buttons__digits">
        <div className="calculator-buttons__row">
          <ActionButton
            additionalClass="calculator-button--clear"
            actionName="clear"
            displayName="Clear"
          />
          <ActionButton
            additionalClass="calculator-button--backspace"
            actionName="backspace"
            displayName="Del"
          />
        </div>

        {DIGIT_ROWS.map(row => (
          <div className="calculator-buttons__row" key={row.join("-")}>
            {row.map(value => (
              <DigitButton
                key={value}
                additionalClass={value === "0" ? "calculator-button--zero" : ""}
                value={value}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="calculator-buttons__actions">
        {ACTIONS.map(actionName => (
          <ActionButton key={actionName} actionName={actionName} />
        ))}
      </div>
    </div>
  );
}

export default Buttons;
