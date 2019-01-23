import * as StorageActionTypes from "../action-types/storage";

const initState = {
    storageType: 'firebase'
};

export default function Storage(state = initState, action) {
    switch (action.type) {
        case StorageActionTypes.TOGGLE_STORAGE:
            return {storageType: state.storageType === 'firebase' ? 'local' : 'firebase'}

        default:
            return state;
    }
}