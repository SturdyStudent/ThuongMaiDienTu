import { currentCheckoutSection } from './currentSection';
import { orderState } from './orderState';
import { allowNext } from './allowNext';
import { notificationState } from './notifications';

import { combineReducers } from 'redux'

const appReducers = combineReducers({
    currentCheckoutSection,
    orderState,
    allowNext,
    notificationState
});

export default appReducers