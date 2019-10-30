/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actionCreators';
import dotenv from 'dotenv';
import './Calculator.css';
import Screen from './components/Screen';
import Buttons from './components/Buttons';
const fontColorContrast = require('font-color-contrast');
dotenv.config();

function mapStateToProps(state) {
    return {
        action: state.action,
        colors: state.colors
    };
}

const mapDispatchToProps = actions;
class Calculator extends React.Component {
    componentDidMount() {
        document.title = 'Calculator';
    }
    render() {
        return (
            <div className="main-wrapper">
                <header className="header">
                    <h1
                        style={{
                            color: fontColorContrast(
                                this.props.colors.background
                            )
                        }}
                    >
                        simple calculator powered by React + Redux stack
                    </h1>
                </header>
                <div
                    style={{
                        backgroundColor: this.props.colors.wrapper
                    }}
                    className="calculator-wrapper"
                >
                    <Screen />
                    <Buttons />
                </div>
                <button
                    onClick={() => this.props.changeColors()}
                    className="color-btn"
                >
                    Change the colors!
                </button>
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calculator);
