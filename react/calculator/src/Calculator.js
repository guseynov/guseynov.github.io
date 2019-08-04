import React from 'react';
import equalImage from './images/icons/equal.svg';
import addImage from './images/icons/add.svg';
import substractImage from './images/icons/substract.svg';
import multiplyImage from './images/icons/multiply.svg';
import divideImage from './images/icons/divide.svg';

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentAction: undefined,
			firstArg: '',
			secondArg: '',
			round: (num) => {
				return Math.round((num + 0.00001) * 100) / 100
			},
			display: '0'
		};
	}
	componentDidMount() {
		this.writeFunc = (arg) => {
			let display;
			if (!this.state.currentAction) {
				if (this.state.firstArg === '0' && arg === 0) {
					return;
				} else if (this.state.firstArg === '' && arg === '.') {
					display = '0' + arg;
					this.setState({
						firstArg: display,
						display: display
					});
				} else {
					display = this.state.firstArg + '' + arg;
					this.setState({
						firstArg: display,
						display: display
					});
				}
			} else {
				if (this.state.secondArg === '0' && arg === 0) {
					return;
				} else if (this.state.secondArg === '' && arg === '.') {
					display = 0 + '' + arg;
					this.setState({
						secondArg: display,
						display: display
					});
				} else {
					display = this.state.secondArg + '' + arg;
					this.setState({
						secondArg: display,
						display: display
					});
				}
			}
		}
		this.result = () => {
			this.setState({
				currentAction: undefined
			});
			let result;
			switch (this.state.currentAction) {
				case 'division':
					if (this.state.secondArg === '0') {
						result = 0;
					} else {
						result = this.state.round(Number(this.state.firstArg) / Number(this.state.secondArg));
						this.setState({
							display: result,
							firstArg: result,
							secondArg: ''
						});
					}
					break;
				case 'multiplication':
					result = this.state.round(Number(this.state.firstArg) * Number(this.state.secondArg));
					this.setState({
						display: result,
						firstArg: result,
						secondArg: ''
					});
					break;
				case 'substraction':
					result = this.state.round(Number(this.state.firstArg) - Number(this.state.secondArg));
					this.setState({
						display: result,
						firstArg: result,
						secondArg: ''
					});
					break;
				case 'addition':
					result = this.state.round(Number(this.state.firstArg) + Number(this.state.secondArg));
					this.setState({
						display: result,
						firstArg: result,
						secondArg: ''
					});
					break;
			}
			if (result === 0) {
				this.setState({
					display: 0,
					firstArg: '',
					secondArg: ''
				});
			}
		}
		this.clear = () => {
			this.setState({
				firstArg: '',
				secondArg: '',
				currentAction: undefined,
				display: '0'
			});
		}
		this.setAction = (action) => {
			if (action === 'substraction') {
				if (this.state.firstArg === '') {
					this.setState({
						firstArg: '-',
						display: '-'
					});
				} else if (this.state.secondArg === '' && this.state.currentAction !== undefined) {
					this.setState({
						secondArg: '-',
						display: '-'
					});
				} else {
					this.setState({
						currentAction: action
					});
				}
			} else {
				this.setState({
					currentAction: action
				});
			}
		}
	}
	render() {
		return (
			<div className="calculator-wrapper">
				<div className="calculator-screen">
					{this.state.display}
				</div>
				<div className="calculator-buttons">
					<div className="calculator-buttons__digits">
						<div className="calculator-buttons__row">
							<button onClick={this.clear} className="calculator-button calculator-button--clear">C</button>
						</div>
						<div className="calculator-buttons__row">
							<button onClick={() => this.writeFunc(7)} className="calculator-button calculator-button--digit">7</button>
							<button onClick={() => this.writeFunc(8)} className="calculator-button calculator-button--digit">8</button>
							<button onClick={() => this.writeFunc(9)} className="calculator-button calculator-button--digit">9</button>
						</div>

						<div className="calculator-buttons__row">
							<button onClick={() => this.writeFunc(4)} className="calculator-button calculator-button--digit">4</button>
							<button onClick={() => this.writeFunc(5)} className="calculator-button calculator-button--digit">5</button>
							<button onClick={() => this.writeFunc(6)} className="calculator-button calculator-button--digit">6</button>
						</div>
						<div className="calculator-buttons__row">
							<button onClick={() => this.writeFunc(1)} className="calculator-button calculator-button--digit">1</button>
							<button onClick={() => this.writeFunc(2)} className="calculator-button calculator-button--digit">2</button>
							<button onClick={() => this.writeFunc(3)} className="calculator-button calculator-button--digit">3</button>
						</div>
						<div className="calculator-buttons__row">
							<button onClick={() => this.writeFunc(0)} className="calculator-button calculator-button--digit calculator-button--zero">0</button>
							<button onClick={() => this.writeFunc('.')} className="calculator-button calculator-button--digit">.</button>
						</div>
					</div>
					<div className="calculator-buttons__actions">
						<button onClick={() => this.setAction('division')} className={"calculator-button calculator-button--action " + ((this.state.currentAction === 'division') ? 'active' : '')}><img src={divideImage} alt="" /></button>
						<button onClick={() => this.setAction('multiplication')} className={"calculator-button calculator-button--action " + ((this.state.currentAction === 'multiplication') ? 'active' : '')}><img src={multiplyImage} alt="" /></button>
						<button onClick={() => this.setAction('substraction')} className={"calculator-button calculator-button--action " + ((this.state.currentAction === 'substraction') ? 'active' : '')}><img src={substractImage} alt="" /></button>
						<button onClick={() => this.setAction('addition')} className={"calculator-button calculator-button--action " + ((this.state.currentAction === 'addition') ? 'active' : '')}><img src={addImage} alt="" /></button>
						<button onClick={() => this.result()} className="calculator-button calculator-button--action"><img src={equalImage} alt="" /></button>
					</div>
				</div>
			</div>
		);
	}
}

export default Calculator;