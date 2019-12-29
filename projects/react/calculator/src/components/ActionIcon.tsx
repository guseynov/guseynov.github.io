import React, { Component } from 'react';
import { connect } from 'react-redux';
const fontColorContrast = require('font-color-contrast');
function mapStateToProps(state) {
    return {
        colors: state.colors
    };
}
class ActionIcon extends Component {
    render() {
        return fontColorContrast(this.props.colors.actions) === '#ffffff' ? (
            <img src={this.props.actionName + '--white.svg'} alt="" />
        ) : (
            <img src={this.props.actionName + '--black.svg'} alt="" />
        );
    }
}
export default connect(mapStateToProps)(ActionIcon);
