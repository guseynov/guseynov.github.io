import 'normalize.css';
import '../node_modules/@glidejs/glide/dist/css/glide.core.min.css';
import '../node_modules/@glidejs/glide/dist/css/glide.theme.min.css';
import './main.styl';
import Glide from '@glidejs/glide';

document.querySelector('body').classList.remove('no-js');
const preloader = document.querySelector('.preloader');

const fullyLoaded = () => {
	preloader.classList.add('loaded');
};

window.addEventListener('load', fullyLoaded);

new Glide('.portfolio-slider', {
	startAt: 0,
	perView: 2,
	breakpoints: {
		767: {
			perView: 1
		}
	}
}).mount();

const ready = fn => {
	if (
		document.attachEvent
			? document.readyState === 'complete'
			: document.readyState !== 'loading'
	) {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
};

const falling = () => {
	const mainEl = document.querySelector('body');
	setInterval(() => {
		if (document.visibilityState === 'visible') {
			let choice = Math.floor(Math.random() * Math.floor(2));
			let position = Math.floor(Math.random() * Math.floor(100));
			let el = document.createElement('span');
			el.addEventListener('animationend', () => {
				el.remove();
			});
			el.style.left = position + '%';
			mainEl.appendChild(el);
			switch (choice) {
				case 0:
					el.classList.add('box');
					break;
				case 1:
					el.classList.add('sm-circle');
					break;
			}
		}
	}, 3000);
};

ready(falling);
