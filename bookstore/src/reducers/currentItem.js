import * as type from '../constants/ActionTypes'
let defaultState = 0;
export let currentCheckoutSection = (state = defaultState, action) => {
    switch (action.type) {
        case type.SHIPPING_DETAIL_SECTION:
            state = 0;
            return state;
        case type.PAYMENT_SECTION:
            state = 1;
            return state;
        case type.REVIEW_SECTION:
            state = 2;
            return state;
        default:
            return state;
    }
}

