import React from "react";
import fontColorContrast from "font-color-contrast";
import { FiDelete } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { OPERATOR_LABELS, OPERATOR_SYMBOLS } from "../calculatorConfig";
import { backspace, clear, equals, setAction } from "../redux/actionCreators";

const ACTION_HANDLERS = {
  equals,
  clear,
  backspace
};

function ActionButton({ actionName, additionalClass = "", displayName }) {
  const dispatch = useDispatch();
  const { colors, operator } = useSelector(state => ({
    colors: state.colors,
    operator: state.operator
  }));

  function handleClick() {
    const actionCreator = ACTION_HANDLERS[actionName];

    if (actionCreator) {
      dispatch(actionCreator());
      return;
    }

    dispatch(setAction(actionName));
  }

  const isActive = operator === actionName;
  const backgroundColor = colors.actions;
  const content =
    actionName === "backspace" ? (
      <FiDelete className="calculator-icon calculator-icon--backspace" />
    ) : (
      displayName || OPERATOR_SYMBOLS[actionName] || "="
    );

  return (
    <button
      type="button"
      style={{
        backgroundColor,
        color: fontColorContrast(backgroundColor)
      }}
      onClick={handleClick}
      className={`calculator-button calculator-button--action ${additionalClass} ${
        isActive ? "active" : ""
      }`}
      aria-label={OPERATOR_LABELS[actionName] || displayName || actionName}
    >
      {content}
    </button>
  );
}

export default ActionButton;
