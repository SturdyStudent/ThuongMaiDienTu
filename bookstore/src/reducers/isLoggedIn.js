import * as type from '../constants/ActionTypes'
let defaultState = { auth: false, id: null };
export let logginState = (state = defaultState, action) => {
    switch (action.type) {
        case type.LOGGED_IN:
            return { auth: true, id: action.userId };
        case type.LOGGED_OUT:
            return { auth: false, id: null };
        default:
            return state;
    }
}
