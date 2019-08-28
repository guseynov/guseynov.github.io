import React from "react";
import Big from "big.js";
import equalImage from "./images/icons/equal.svg";
import addImage from "./images/icons/add.svg";
import substractImage from "./images/icons/substract.svg";
import multiplyImage from "./images/icons/multiply.svg";
import divideImage from "./images/icons/divide.svg";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: undefined,
      firstArg: undefined,
      secondArg: undefined,
      display: 0,
      result: undefined,
      acceptDecimals: true,
      exception: false
    };
  }

  componentDidMount() {
    this.write = input => {
      const inputStr = Big(input).toString();
      const inputNum = Number(inputStr);
      if (this.state.action === undefined) {
        // Set the first argument
        if (this.state.firstArg === undefined && inputNum === 0) {
          // Do not allow consecutive zeros in the beginning of a number
          return;
        } else {
          // Append an integer
          let firstArg =
            this.state.firstArg === undefined
              ? inputStr
              : this.state.firstArg.toString() + inputStr;
          this.setState({
            firstArg: firstArg,
            display: firstArg
          });
        }
      } else {
        // Set the second argument
        if (this.state.secondArg === 0 && inputNum === 0) {
          // Do not allow consecutive zeros in the beginning of a number
          return;
        } else if (this.state.acceptDecimals === false && input === ".") {
          // Append a dot
          this.setState({
            secondArg: this.state.secondArg + ".",
            display: this.state.secondArg,
            acceptDecimals: false
          });
        } else {
          // Append an integer
          let secondStr =
            this.state.secondArg === undefined
              ? inputStr
              : this.state.secondArg.toString() + inputStr;
          this.setState({
            secondArg: secondStr,
            display: secondStr
          });
        }
      }
    };
    this.decimal = () => {
      if (this.state.acceptDecimals === false) {
        return;
      } else {
        this.setState(
          {
            acceptDecimals: true
          },
          () => {
            if (this.state.firstArg === undefined) {
              let decimal = (this.state.firstArg || 0) + ".";
              this.setState({
                firstArg: decimal,
                display: decimal
              });
            } else {
              let decimal = (this.state.secondArg || 0) + ".";
              this.setState({
                secondArg: decimal,
                display: decimal
              });
            }
          }
        );
      }
    };

    this.clear = () => {
      this.setState({
        action: undefined,
        firstArg: undefined,
        secondArg: undefined,
        display: 0,
        result: undefined,
        acceptDecimals: true,
        exception: false
      });
    };

    this.equals = action => {
      this.setState({
        action: action
      });
      let result;
      switch (this.state.action) {
        case "div":
          if (this.state.secondArg === 0) {
            this.setState({
              exception: true,
              display: "Division by zero",
              result: undefined
            });
          } else {
            result = Big(this.state.firstArg)
              .div(this.state.secondArg)
              .toString();
          }
          break;
        case "times":
          result = Big(this.state.firstArg)
            .times(this.state.secondArg)
            .toString();
          break;
        case "minus":
          // Check if the minus button was used to enter a negative number or to perform a substraction
          if (this.state.firstArg === undefined) {
            // The first newArgument is a negative number
            this.setState({
              firstArg: "-",
              display: "-",
              exception: true
            });
          } else if (this.state.secondArg === undefined && this.state.action) {
            // The second newArgument is a negative number
            this.setState({
              secondArg: "-",
              display: "-",
              exception: true
            });
            break;
          } else {
            result = Big(this.state.firstArg)
              .minus(this.state.secondArg)
              .toString();
          }
          break;
        case "plus":
          result = Big(this.state.firstArg)
            .plus(this.state.secondArg)
            .toString();
          break;
        default:
          result = "Unknown action";
      }
      if (!this.state.exception) {
        this.setState({
          result: result,
          display: result
        });
      }
    };
  }

  render() {
    return (
      <div className="calculator-wrapper">
        <div className="calculator-screen">{this.state.display}</div>
        <div className="calculator-buttons">
          <div className="calculator-buttons__digits">
            <div className="calculator-buttons__row">
              <button
                onClick={this.clear}
                className="calculator-button calculator-button--clear"
              >
                C
              </button>
            </div>

            <div className="calculator-buttons__row">
              <button
                onClick={() => this.write(7)}
                className="calculator-button calculator-button--digit"
              >
                7
              </button>
              <button
                onClick={() => this.write(8)}
                className="calculator-button calculator-button--digit"
              >
                8
              </button>
              <button
                onClick={() => this.write(9)}
                className="calculator-button calculator-button--digit"
              >
                9
              </button>
            </div>

            <div className="calculator-buttons__row">
              <button
                onClick={() => this.write(4)}
                className="calculator-button calculator-button--digit"
              >
                4
              </button>
              <button
                onClick={() => this.write(5)}
                className="calculator-button calculator-button--digit"
              >
                5
              </button>
              <button
                onClick={() => this.write(6)}
                className="calculator-button calculator-button--digit"
              >
                6
              </button>
            </div>
            <div className="calculator-buttons__row">
              <button
                onClick={() => this.write(1)}
                className="calculator-button calculator-button--digit"
              >
                1
              </button>
              <button
                onClick={() => this.write(2)}
                className="calculator-button calculator-button--digit"
              >
                2
              </button>
              <button
                onClick={() => this.write(3)}
                className="calculator-button calculator-button--digit"
              >
                3
              </button>
            </div>
            <div className="calculator-buttons__row">
              <button
                onClick={() => this.write(0)}
                className="calculator-button calculator-button--digit calculator-button--zero"
              >
                0
              </button>
              <button
                onClick={() => this.decimal()}
                className="calculator-button calculator-button--digit"
              >
                .
              </button>
            </div>
          </div>
          <div className="calculator-buttons__actions">
            <button
              onClick={() => this.equals("div")}
              className={
                "calculator-button calculator-button--action " +
                (this.state.action === "div" ? "active" : "")
              }
            >
              <img src={divideImage} alt="" />
            </button>
            <button
              onClick={() => this.equals("times")}
              className={
                "calculator-button calculator-button--action " +
                (this.state.action === "times" ? "active" : "")
              }
            >
              <img src={multiplyImage} alt="" />
            </button>
            <button
              onClick={() => this.equals("minus")}
              className={
                "calculator-button calculator-button--action " +
                (this.state.action === "minus" ? "active" : "")
              }
            >
              <img src={substractImage} alt="" />
            </button>
            <button
              onClick={() => this.equals("plus")}
              className={
                "calculator-button calculator-button--action " +
                (this.state.action === "plus" ? "active" : "")
              }
            >
              <img src={addImage} alt="" />
            </button>
            <button
              onClick={() => this.equals()}
              className="calculator-button calculator-button--action"
            >
              <img src={equalImage} alt="" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
