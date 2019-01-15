import * as ProductActionTypes from '../action-types/product';

export const addProduct = (name, description, price, creationDate) => {
    return {
        type: ProductActionTypes.ADD_PRODUCT,
        name,
        description,
        price,
        creationDate
    }
};

export const removeProduct = (index) => {
    return {
        type: ProductActionTypes.REMOVE_PRODUCT,
        index
    }
};

export const updateProduct = (id, name, description, price, creationDate) => {
    return {
        type: ProductActionTypes.UPDATE_PRODUCT,
        id,
        name,
        description,
        price,
        creationDate
    }
};
