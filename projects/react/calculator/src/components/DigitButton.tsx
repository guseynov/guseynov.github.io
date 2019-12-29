import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actionCreators';
const fontColorContrast = require('font-color-contrast');
function mapStateToProps(state) {
    return {
        action: state.action,
        colors: state.colors
    };
}
const mapDispatchToProps = actions;
class DigitButton extends Component {
    render() {
        return (
            <button
                style={{
                    backgroundColor: this.props.colors.digits,
                    color: fontColorContrast(this.props.colors.digits)
                }}
                onClick={() => this.props.write(this.props.value)}
                className={`
                    calculator-button
                    calculator-button--digit
                    ${this.props.additionalClass}
                `}
            >
                {this.props.value}
            </button>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DigitButton);
