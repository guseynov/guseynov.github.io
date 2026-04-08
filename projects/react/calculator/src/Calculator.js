import React, { useEffect } from "react";
import { BsKeyboard } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Buttons from "./components/Buttons";
import Screen from "./components/Screen";
import "./Calculator.css";
import { backspace, changeColors, clear, equals, setAction, write } from "./redux/actionCreators";

function Calculator() {
  const dispatch = useDispatch();
  const colors = useSelector(state => state.colors);

  useEffect(() => {
    function handleKeyDown(event) {
      const { key, metaKey, ctrlKey, altKey } = event;

      if (metaKey || ctrlKey || altKey) {
        return;
      }

      if (/^[0-9]$/u.test(key)) {
        event.preventDefault();
        dispatch(write(key));
        return;
      }

      if (key === ".") {
        event.preventDefault();
        dispatch(write("."));
        return;
      }

      if (key === "+") {
        event.preventDefault();
        dispatch(setAction("addition"));
        return;
      }

      if (key === "-") {
        event.preventDefault();
        dispatch(setAction("substraction"));
        return;
      }

      if (key === "*" || key.toLowerCase() === "x") {
        event.preventDefault();
        dispatch(setAction("multiplication"));
        return;
      }

      if (key === "/") {
        event.preventDefault();
        dispatch(setAction("division"));
        return;
      }

      if (key === "=" || key === "Enter") {
        event.preventDefault();
        dispatch(equals());
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        dispatch(backspace());
        return;
      }

      if (key === "Escape" || key.toLowerCase() === "c") {
        event.preventDefault();
        dispatch(clear());
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <main className="main-wrapper">
      <section className="calculator-shell" aria-labelledby="calculator-title">
        <div className="calculator-copy">
          <p className="calculator-kicker">Calculator</p>
          <h1 id="calculator-title">A minimal calculator, cleaned up for real use.</h1>
          <p className="calculator-description">
            Keyboard friendly, responsive, and predictable for quick arithmetic.
          </p>
        </div>

        <div
          style={{
            backgroundColor: colors.wrapper
          }}
          className="calculator-wrapper"
        >
          <Screen />
          <Buttons />
        </div>

        <div className="calculator-toolbar">
          <button type="button" onClick={() => dispatch(changeColors())} className="utility-btn">
            <FiRefreshCw className="calculator-icon" />
            <span>Shuffle palette</span>
          </button>
          <div className="calculator-hint" aria-label="Keyboard shortcuts">
            <BsKeyboard className="calculator-icon" />
            <div className="calculator-hint__copy">
              <span className="calculator-hint__label">Keyboard shortcuts</span>
              <span className="calculator-hint__text">0-9, +, -, *, /, Enter, Backspace, Esc</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Calculator;
