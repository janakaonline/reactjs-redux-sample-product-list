import ProductReducer from './product';
import StorageReducer from './storage';
import {combineReducers} from 'redux';
import {firestoreReducer} from 'redux-firestore';

const Root = combineReducers({
   storage: StorageReducer,
   product: ProductReducer,
   firestore: firestoreReducer
});

export default Root;