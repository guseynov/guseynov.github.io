import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actionCreators";
import ActionIcon from "./ActionIcon";
import fontColorContrast from "font-color-contrast";
function mapStateToProps(state) {
  return {
    action: state.action,
    colors: state.colors
  };
}
const mapDispatchToProps = actions;
class ActionButton extends Component {
  constructor(props) {
    super(props);
    switch (this.props.actionName) {
      case "equals":
        this.handleClick = this.props.equals.bind(this);
        break;
      case "clear":
        this.handleClick = this.props.clear.bind(this);
        break;
      default:
        this.handleClick = this.props.setAction.bind(
          this,
          this.props.actionName
        );
        break;
    }
  }
  render() {
    return (
      <button
        style={{
          backgroundColor: this.props.colors.actions,
          color: fontColorContrast(this.props.colors.actions)
        }}
        onClick={this.handleClick}
        className={`
                    calculator-button
                    calculator-button--action
                    ${this.props.additionalClass || ""}
                    ${
                      this.props.action === this.props.actionName
                        ? "active"
                        : ""
                    }
                `}
      >
        {this.props.displayName ? (
          this.props.displayName
        ) : (
          <ActionIcon actionName={this.props.actionName} />
        )}
      </button>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
