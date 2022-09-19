import * as type from '../constants/ActionTypes'
let defaultState = [];
export let currentItem = (state = defaultState, action) => {
    switch (action.type) {
        case type.SELECT_PAGE:
            state = false;
            return state;
        default:
            return state;
    }
}

