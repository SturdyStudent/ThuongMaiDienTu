import * as type from '../constants/ActionTypes'
let defaultState = false;
export let allowNext = (state = defaultState, action) => {
    switch (action.type) {
        case type.ALLOW_NEXT:
            return true;
        case type.NOT_ALLOW_NEXT:
            return false;
        default:
            return state;
    }
}
