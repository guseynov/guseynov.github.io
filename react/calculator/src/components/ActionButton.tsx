import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actionCreators';
import ActionIcon from './ActionIcon';
const fontColorContrast = require('font-color-contrast');
function mapStateToProps(state) {
    return {
        action: state.action,
        colors: state.colors
    };
}
const mapDispatchToProps = actions;
class ActionButton extends Component {
    constructor() {
        super();
        this.callAction = this.callAction.bind(this);
    }
    callAction() {
        this.props[this.props.actionName].call();
    }

    render() {
        return (
            <button
                style={{
                    backgroundColor: this.props.colors.actions,
                    color: fontColorContrast(this.props.colors.actions)
                }}
                onClick={this.callAction}
                className={`
                    calculator-button
                    calculator-button--action
                    ${this.props.additionalClass || ''}
                    ${
                        this.props.action === this.props.actionName
                            ? 'active'
                            : ''
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActionButton);
