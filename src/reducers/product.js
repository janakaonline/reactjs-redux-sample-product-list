import * as ProductActionTypes from '../action-types/product';

const initState = [];

let lastProductId = 2;

export default function Product(state = initState, action) {
    switch(action.type){
        case ProductActionTypes.ADD_PRODUCT:
            return [
                {
                    id: ++lastProductId,
                    name: action.name,
                    price: action.price,
                    description: action.description,
                    creation_date: action.creationDate,
                },
                ...state
            ];

        case ProductActionTypes.REMOVE_PRODUCT:
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];

        case ProductActionTypes.UPDATE_PRODUCT:
            return state.map((product) => {
                if(product.id === action.id){
                    return {
                        ...product,
                        name: action.name,
                        price: action.price,
                        description: action.description,
                        creation_date: action.creationDate,
                    }
                }

                return product;
            });

        default:
            return state;
    }
}