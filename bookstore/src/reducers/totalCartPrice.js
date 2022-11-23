import * as type from '../constants/ActionTypes'
let defaultState = 0;
export let totalCartPrice = (state = defaultState, action) => {
    switch (action.type) {
        case type.TOTAL_PRICE:
            return action.totalPrice;
        default:
            return state;
    }
}
