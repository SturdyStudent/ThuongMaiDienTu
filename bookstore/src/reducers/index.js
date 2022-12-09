import { currentCheckoutSection } from './currentSection';
import { orderState } from './orderState';
import { allowNext } from './allowNext';
import { notificationState } from './notifications';
import { totalCartPrice } from './totalCartPrice';
import { logginState } from './isLoggedIn';
import { searchTerm } from './searchTerm';

import { combineReducers } from 'redux'

const appReducers = combineReducers({
    currentCheckoutSection,
    orderState,
    allowNext,
    notificationState,
    totalCartPrice,
    logginState,
    searchTerm
});

export default appReducers