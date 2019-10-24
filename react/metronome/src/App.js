import React from 'react';
import './App.css';
import click1 from './sounds/click1.wav';
import click2 from './sounds/click2.wav';

class Metronome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			bpm: 100,
			beatsPerMeasure: 4,
			beat: undefined
		};
		this.click1 = new Audio(click1);
		this.click2 = new Audio(click2);
	}
	playClick = () => {
		if (this.state.count % this.state.beatsPerMeasure === 0) {
			this.setState(
				{
					beat: 'main'
				},
				() => {
					this.click2.play();
				}
			);
		} else {
			this.setState(
				{
					beat: 'regular'
				},
				() => {
					this.click1.play();
				}
			);
		}

		this.setState({
			count: (this.state.count + 1) % this.state.beatsPerMeasure
		});
	};
	handleBpmChange = event => {
		const bpm = event.target.value;
		if (this.state.playing) {
			clearInterval(this.timer);
			this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
			this.setState({
				count: 0,
				bpm: bpm
			});
		} else {
			this.setState({
				bpm: bpm
			});
		}
	};
	startStop = () => {
		if (this.state.playing) {
			clearInterval(this.timer);
			this.setState({
				playing: false
			});
		} else {
			this.timer = setInterval(
				this.playClick,
				(60 / this.state.bpm) * 1000
			);
			this.setState(
				{
					count: 0,
					playing: true
				},
				this.playClick
			);
		}
	};
	render() {
		return (
			<div className='metronome'>
				<div className='metronome__title'>React Metronome</div>
				<div className='metronome__screen metronome-screen'>
					<div className='metronome-screen__value'>
						{this.state.bpm} BPM
					</div>
				</div>
				<div className='metronome__controls metronome-controls'>
					<input
						className='metronome-controls__input'
						type='text'
						value={this.state.bpm}
						onChange={this.handleBpmChange}
					/>
					<span
						className={
							'metronome-controls__indicator ' +
							(this.state.playing
								? this.state.beat === 'main'
									? 'metronome-controls__indicator--main'
									: ''
								: '')
						}
					></span>
					<div className='metronome-controls__speaker metronome-speaker'>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<button
						className={
							'metronome-controls__button ' +
							(this.state.playing ? 'active' : '')
						}
						onClick={this.startStop}
					></button>
				</div>
			</div>
		);
	}
}

export default Metronome;
