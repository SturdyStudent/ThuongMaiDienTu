import * as type from '../constants/ActionTypes'
let defaultState = '';
export let searchTerm = (state = defaultState, action) => {
    switch (action.type) {
        case type.SEARCH_TERM_STATE:
            return action.searchState;
        default:
            return state;
    }
}
