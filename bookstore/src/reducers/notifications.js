import * as type from '../constants/ActionTypes'
let defaultState = {
    notification: "none",
};
export let notificationState = (state = defaultState, action) => {
    switch (action.type) {
        case type.NOTIFICATION_STATE:
            return action.notificationState;
        default:
            return state;
    }
}
