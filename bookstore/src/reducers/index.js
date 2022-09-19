import { currentItem } from './currentItem';

import { combineReducers } from 'redux'

const appReducers = combineReducers({
    currentItem,
});

export default appReducers