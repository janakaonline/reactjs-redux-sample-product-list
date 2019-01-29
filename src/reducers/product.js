import * as ProductActionTypes from '../action-types/product';

const initState = [];

let lastProductId = 2;

export default function Product(state = initState, action) {
    switch (action.type) {
        case ProductActionTypes.ADD_PRODUCT:
            /*return [
                {
                    id: action.id,
                    name: action.name,
                    price: action.price,
                    description: action.description,
                    creationDate: action.creationDate,
                },
                ...state
            ];*/
            return state;

        case ProductActionTypes.SAVE_PRODUCT_TO_LOCAL: {

            const existingProduct = state.find(obj => {
                return obj.id === action.id;
            });

            if (existingProduct !== undefined) {
                //update the current product
                const productIndex = state.indexOf(existingProduct);

                return [
                    ...state.slice(0, productIndex),
                    {
                        ...existingProduct,
                        name: action.name,
                        price: action.price,
                        description: action.description,
                        creationDate: action.creationDate,
                        lastUpdated: action.lastUpdated,
                        fromFirebase: action.fromFirebase,
                    },
                    ...state.slice(productIndex + 1)
                ];
            } else {
                //add new
                return [
                    {
                        id: action.id,
                        name: action.name,
                        price: action.price,
                        description: action.description,
                        creationDate: action.creationDate,
                        lastUpdated: action.lastUpdated,
                        fromFirebase: action.fromFirebase,
                    },
                    ...state
                ];
            }
        }
        case ProductActionTypes.REMOVE_PRODUCT:
            return state;

        case ProductActionTypes.REMOVE_PRODUCT_FROM_LOCAL: {

            return state.filter((product) => {
                return product.id !== action.id;
            });

            /*const existingProduct = state.find(obj => {
                return obj.id === action.id;
            });

            if (existingProduct !== undefined) {
                //update the current product
                const productIndex = state.indexOf(existingProduct);
                return [
                    ...state.slice(0, productIndex),
                    ...state.slice(productIndex + 1)
                ];
            }*/
        }

        case ProductActionTypes.UPDATE_PRODUCT:
            return state.map((product) => {
                if (product.id === action.id) {
                    return {
                        ...product,
                        id: action.newId ? action.newId : action.id,
                        name: action.name,
                        price: action.price,
                        description: action.description,
                        creationDate: action.creationDate,
                        lastUpdated: action.lastUpdated,
                        fromFirebase: action.fromFirebase,
                    }
                }

                return product;
            });

        case ProductActionTypes.ADD_PRODUCT_ERROR:
            console.log(action.type, action.error);
            return state;

        case ProductActionTypes.UPDATE_PRODUCT_ERROR:
            console.log(action.type, action.error);
            return state;

        default:
            return state;
    }
}