import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actionCreators';
import DigitButton from './DigitButton';
import ActionButton from './ActionButton';
function mapStateToProps(state) {
    return {
        action: state.action,
        colors: state.colors
    };
}
const mapDispatchToProps = actions;
class Buttons extends Component {
    render() {
        return (
            <div
                style={{
                    borderColor: this.props.colors.borders
                }}
                className="calculator-buttons"
            >
                <div className="calculator-buttons__digits">
                    <div className="calculator-buttons__row">
                        <ActionButton
                            additionalClass="calculator-button--clear"
                            actionName="clean"
                            displayName="C"
                        />
                    </div>

                    <div className="calculator-buttons__row">
                        <DigitButton value="7" />
                        <DigitButton value="8" />
                        <DigitButton value="9" />
                    </div>

                    <div className="calculator-buttons__row">
                        <DigitButton value="4" />
                        <DigitButton value="5" />
                        <DigitButton value="6" />
                    </div>
                    <div className="calculator-buttons__row">
                        <DigitButton value="1" />
                        <DigitButton value="2" />
                        <DigitButton value="3" />
                    </div>
                    <div className="calculator-buttons__row">
                        <DigitButton
                            additionalClass="calculator-button--zero"
                            value="0"
                        />
                        <DigitButton value="." />
                    </div>
                </div>
                <div className="calculator-buttons__actions">
                    <ActionButton actionName="div" />
                    <ActionButton actionName="times" />
                    <ActionButton actionName="minus" />
                    <ActionButton actionName="plus" />
                    <ActionButton actionName="equals" />
                </div>
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buttons);
