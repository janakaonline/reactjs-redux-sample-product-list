import * as StorageActionTypes from "../action-types/storage";

export const toggleStorage = () => {
    return {
        type: StorageActionTypes.TOGGLE_STORAGE
    }
};