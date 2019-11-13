import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Calculator from './Calculator';
import '@/typeface-inter/inter.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Calculator />
    </Provider>,
    rootElement
);
