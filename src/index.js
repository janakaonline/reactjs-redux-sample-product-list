import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//redux
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import ProductReducer from './reducers/product';


//load state from localStorage
const storedState = localStorage.getItem('productListReduxStorage')
    ? JSON.parse(localStorage.getItem('productListReduxStorage'))
    : [
        {
            id: 1,
            price: 100,
            name: 'Magical keyboard',
            description: 'What a wonderful keyboard for your PC',
            creation_date: '2019-1-2'
        },
        {
            id: 2,
            price: 99.99,
            name: 'Rainbow unicorn',
            description: 'Pet you would wonder why you bought it  at the first place',
            creation_date: '2019-1-12'
        }
    ];

const store = createStore(ProductReducer, storedState);

//setup localStorage for redux
store.subscribe(() => {
    window.localStorage.setItem('productListReduxStorage', JSON.stringify(store.getState()))
});


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
