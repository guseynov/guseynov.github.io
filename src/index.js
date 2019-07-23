import 'normalize.css';
import '../node_modules/@glidejs/glide/dist/css/glide.core.min.css';
import '../node_modules/@glidejs/glide/dist/css/glide.theme.min.css';
import './main.styl';
import Glide from '@glidejs/glide';
new Glide('.portfolio-slider', {
    startAt: 1,
    perView: 3,
    focusAt: 'center'
}).mount();


function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function falling() {
    const mainEl = document.querySelector('.main');
    setInterval(() => {
        let choice = Math.floor(Math.random() * Math.floor(3));
        let position = Math.floor(Math.random() * Math.floor(95));
        switch (choice) {
            case 0:
                let el = document.createElement('span');
                el.classList.add('box');
                el.style.left = position + '%';
                mainEl.appendChild(el);
                break;
            case 1:
                let el = document.createElement('span');
                el.classList.add('sm-circle');
                el.style.left = position + '%';
                mainEl.appendChild(el);
                break;
            case 2:
                let el = document.createElement('span');
                let innerEl = document.createElement('span');
                el.classList.add('sm-circle');
                el.style.left = position + '%';
                el.appendChild(innerEl);
                mainEl.appendChild(el);
                break;
        }
    }, 1000)
}

ready(falling);