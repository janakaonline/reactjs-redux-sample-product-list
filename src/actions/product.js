import * as ProductActionTypes from '../action-types/product';
import uniqid from 'uniqid';
import {dateToString} from '../utils/string-formatters'

export const addProduct = (name, description, price, creationDate) => {

    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('products').add({
            name,
            description,
            price,
            creationDate,
            lastUpdated: dateToString()
        }).then((docDef) => {
            dispatch({
                type: ProductActionTypes.ADD_PRODUCT,
                id: docDef.id,
                name,
                description,
                price,
                creationDate
            })
        }).catch((error) => {
            dispatch({
                type: ProductActionTypes.ADD_PRODUCT_ERROR,
                error
            });
        });
    }
};

export const syncLocalToFirebase = (id, name, description, price, creationDate) => {

    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('products').doc(id).get().then(product => {
            if (product.exists) {
                firestore.collection('products').doc(id).set({
                    name,
                    description,
                    price,
                    creationDate,
                    lastUpdated: dateToString()
                }).then(() => {
                    dispatch({
                        type: ProductActionTypes.UPDATE_PRODUCT,
                        id,
                        name,
                        description,
                        price,
                        creationDate,
                        lastUpdated: dateToString(),
                        fromFirebase: true
                    })
                }).catch((error) => {
                    dispatch({
                        type: ProductActionTypes.UPDATE_PRODUCT_ERROR,
                        error
                    });
                });

            } else {
                firestore.collection('products').add({
                    name,
                    description,
                    price,
                    creationDate,
                    lastUpdated: dateToString()
                }).then((docDef) => {
                    dispatch({
                        type: ProductActionTypes.UPDATE_PRODUCT,
                        id: id,
                        name,
                        description,
                        price,
                        creationDate,
                        lastUpdated: dateToString(),
                        fromFirebase: true,
                        newId: docDef.id
                    })
                }).catch((error) => {
                    dispatch({
                        type: ProductActionTypes.UPDATE_PRODUCT_ERROR,
                        error
                    });
                });
            }
            //console.log(product);
        }).catch((error) => {
            dispatch({
                type: ProductActionTypes.UPDATE_PRODUCT_ERROR,
                error
            });
        });
    };
};

export const saveProductToLocal = (id, name, description, price, creationDate, fromFirebase = false) => {

    if (!id) {
        id = uniqid()
    }

    return {
        type: ProductActionTypes.SAVE_PRODUCT_TO_LOCAL,
        id,
        name,
        description,
        price,
        creationDate,
        lastUpdated: dateToString(),
        fromFirebase
    }
};

export const removeProduct = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('products').doc(id)
            .delete()
            .then((docDef) => {
                dispatch({
                    type: ProductActionTypes.REMOVE_PRODUCT,
                    id: docDef.id,
                })
            })
            .catch((error) => {
                dispatch({
                    type: ProductActionTypes.REMOVE_PRODUCT_ERROR,
                    error
                });
            });
    }
};


export const removeProductFromLocal = (id) => {
    return (dispatch, getState) => {
        dispatch({
            type: ProductActionTypes.REMOVE_PRODUCT_FROM_LOCAL,
            id
        })
    }
};

export const updateProduct = (id, name, description, price, creationDate) => {

    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('products').doc(id).set({
            name,
            description,
            price,
            creationDate,
            lastUpdated: dateToString()
        }).then(() => {
            dispatch({
                type: ProductActionTypes.UPDATE_PRODUCT,
                id,
                name,
                description,
                price,
                creationDate
            })
        }).catch((error) => {
            dispatch({
                type: ProductActionTypes.UPDATE_PRODUCT_ERROR,
                error
            });
        });
    }

    /*return {
        type: ProductActionTypes.UPDATE_PRODUCT,
        id,
        name,
        description,
        price,
        creationDate
    }*/
};
