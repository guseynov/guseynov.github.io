/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import dotenv from 'dotenv';
import * as actions from './redux/actionCreators';
import './Calculator.css';
dotenv.config();

const mapDispatchToProps = actions;

function mapStateToProps(state) {
    return {
        display: state.display,
        action: state.action,
        colors: state.colors
    };
}

class Calculator extends React.Component {
    componentDidMount() {
        this.props.changeColors();
    }
    render() {
        return (
            <div className="main-wrapper">
                <header className="header">
                    <h1>simple calculator powered by React + Redux stack</h1>
                </header>
                <div
                    style={{
                        backgroundColor: this.props.colors.wrapper
                    }}
                    className="calculator-wrapper"
                >
                    <div
                        style={{
                            borderColor: this.props.colors.borders
                        }}
                        className="calculator-screen"
                    >
                        {this.props.display}
                    </div>
                    <div
                        style={{
                            borderColor: this.props.colors.borders
                        }}
                        className="calculator-buttons"
                    >
                        <div className="calculator-buttons__digits">
                            <div className="calculator-buttons__row">
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .actions
                                    }}
                                    onClick={() => this.props.clean()}
                                    className="calculator-button calculator-button--clear"
                                >
                                    C
                                </button>
                            </div>

                            <div className="calculator-buttons__row">
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write(7)}
                                    className="calculator-button calculator-button--digit"
                                >
                                    7
                                </button>
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write(8)}
                                    className="calculator-button calculator-button--digit"
                                >
                                    8
                                </button>
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write(9)}
                                    className="calculator-button calculator-button--digit"
                                >
                                    9
                                </button>
                            </div>

                            <div className="calculator-buttons__row">
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write(4)}
                                    className="calculator-button calculator-button--digit"
                                >
                                    4
                                </button>
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write(5)}
                                    className="calculator-button calculator-button--digit"
                                >
                                    5
                                </button>
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write(6)}
                                    className="calculator-button calculator-button--digit"
                                >
                                    6
                                </button>
                            </div>
                            <div className="calculator-buttons__row">
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write(1)}
                                    className="calculator-button calculator-button--digit"
                                >
                                    1
                                </button>
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write(2)}
                                    className="calculator-button calculator-button--digit"
                                >
                                    2
                                </button>
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write(3)}
                                    className="calculator-button calculator-button--digit"
                                >
                                    3
                                </button>
                            </div>
                            <div className="calculator-buttons__row">
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write(0)}
                                    className="calculator-button calculator-button--digit calculator-button--zero"
                                >
                                    0
                                </button>
                                <button
                                    style={{
                                        backgroundColor: this.props.colors
                                            .digits
                                    }}
                                    onClick={() => this.props.write('.')}
                                    className="calculator-button calculator-button--digit"
                                >
                                    .
                                </button>
                            </div>
                        </div>
                        <div className="calculator-buttons__actions">
                            <button
                                style={{
                                    backgroundColor: this.props.colors.actions
                                }}
                                onClick={() => this.props.division()}
                                className={
                                    'calculator-button calculator-button--action ' +
                                    (this.props.action === 'div'
                                        ? 'active'
                                        : '')
                                }
                            >
                                <img src={'divide.svg'} alt="" />
                            </button>
                            <button
                                style={{
                                    backgroundColor: this.props.colors.actions
                                }}
                                onClick={() => this.props.multiplication()}
                                className={
                                    'calculator-button calculator-button--action ' +
                                    (this.props.action === 'times'
                                        ? 'active'
                                        : '')
                                }
                            >
                                <img src={'multiply.svg'} alt="" />
                            </button>
                            <button
                                style={{
                                    backgroundColor: this.props.colors.actions
                                }}
                                onClick={() => this.props.substraction()}
                                className={
                                    'calculator-button calculator-button--action ' +
                                    (this.props.action === 'minus'
                                        ? 'active'
                                        : '')
                                }
                            >
                                <img src={'substract.svg'} alt="" />
                            </button>
                            <button
                                style={{
                                    backgroundColor: this.props.colors.actions
                                }}
                                onClick={() => this.props.addition()}
                                className={
                                    'calculator-button calculator-button--action ' +
                                    (this.props.action === 'plus'
                                        ? 'active'
                                        : '')
                                }
                            >
                                <img src={'add.svg'} alt="" />
                            </button>
                            <button
                                style={{
                                    backgroundColor: this.props.colors.actions
                                }}
                                onClick={() => this.props.equals()}
                                className="calculator-button calculator-button--action"
                            >
                                <img src={'equal.svg'} alt="" />
                            </button>
                        </div>
                    </div>
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
