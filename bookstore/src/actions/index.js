import * as types from '../constants/ActionTypes'

export const actCloseForm = () => {
    return {
        'type': types.CLOSE_FORM
    }
}
export const actOpenForm = () => {
    return {
        'type': types.OPEN_FORM
    }
}
export const actToggleForm = () => {
    return {
        'type': types.TOGGLE_FORM
    }
}
export const actSort = (orderBy, orderDir) => {
    return {
        'type': types.SORT_ITEM,
        orderBy,
        orderDir
    }
}
export const actSearch = (search) => {
    return {
        'type': types.CHANGE_SEARCH,
        search
    }
}
export const actDelete = (id) => {
    return {
        'type': types.DELETE_ITEM,
        id
    }
}
export const actSubmit = (item) => {
    return {
        'type': types.SUBMIT_FORM,
        item
    }
}

export const actSelect = (item) => {
    return {
        'type': types.SELECTED_ITEM,
        item
    }
}

export const actUnSelect = () => {
    return {
        'type': types.UNSELECT_ITEM,
    }
}
