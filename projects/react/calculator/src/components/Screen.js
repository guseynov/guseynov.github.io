import React, { Component } from "react";
import { connect } from "react-redux";
import fontColorContrast from "font-color-contrast";
function mapStateToProps(state) {
  return {
    display: state.display,
    colors: state.colors
  };
}
class Screen extends Component {
  render() {
    return (
      <div
        style={{
          borderColor: this.props.colors.borders,
          color: fontColorContrast(this.props.colors.wrapper)
        }}
        className="calculator-screen"
      >
        {this.props.display}
      </div>
    );
  }
}
export default connect(mapStateToProps)(Screen);
