import React from 'react';
import { connect } from 'react-redux';
import store from './redux/store';
import * as actions from './redux/actionCreators';
import './Calculator.css';
import Screen from './components/Screen';
import Buttons from './components/Buttons';
import fontColorContrast from 'font-color-contrast';

const mapStateToProps = store => ({
    action: store.action,
    colors: store.colors
});

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
