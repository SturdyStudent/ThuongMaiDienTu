import { currentCheckoutSection } from './currentSection';
import { orderState } from './orderState';
import { allowNext } from './allowNext';
import { notificationState } from './notifications';
import { totalCartPrice } from './totalCartPrice';
import { logginState } from './isLoggedIn';

import { combineReducers } from 'redux'

const appReducers = combineReducers({
    currentCheckoutSection,
    orderState,
    allowNext,
    notificationState,
    totalCartPrice,
    logginState
});

export default appReducers