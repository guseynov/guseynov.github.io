import React from "react";
import fontColorContrast from "font-color-contrast";
import { useSelector } from "react-redux";

function Screen() {
  const { borderColor, displayColor, expression, display, error } = useSelector(state => ({
    borderColor: state.colors.borders,
    displayColor: fontColorContrast(state.colors.wrapper),
    expression: state.expression,
    display: state.display,
    error: state.error
  }));

  return (
    <section
      style={{
        borderColor,
        color: displayColor
      }}
      className={`calculator-screen ${error ? "calculator-screen--error" : ""}`}
      aria-live="polite"
      aria-atomic="true"
      aria-label="Calculator display"
    >
      <div className="calculator-screen__history">{expression || "Ready"}</div>
      <output className="calculator-screen__value">{display}</output>
    </section>
  );
}

export default Screen;
