import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//redux
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import RootReducer from './reducers/root';
import thunk from 'redux-thunk';

//firebase
import {reduxFirestore, getFirestore} from 'redux-firestore';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import firebaseConfig from './config/firebaseConfig';


//load state from localStorage
const storedState = {
    product: localStorage.getItem('productListReduxStorage')
        ? JSON.parse(localStorage.getItem('productListReduxStorage'))
        : [],
    storage: localStorage.getItem('productListStorageData')
        ? JSON.parse(localStorage.getItem('productListStorageData'))
        : {storageType: 'firebase'},
};

let middleware = compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig)
);

const store = createStore(RootReducer, storedState, middleware);

//setup localStorage for redux
store.subscribe(() => {
    window.localStorage.setItem('productListStorageData',  JSON.stringify(store.getState().storage));
    window.localStorage.setItem('productListReduxStorage', JSON.stringify(store.getState().product));
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
