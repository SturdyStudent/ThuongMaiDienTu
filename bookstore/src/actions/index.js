import * as types from '../constants/ActionTypes'

export const actChangeToShippingSection = () => {
    return {
        'type': types.SHIPPING_DETAIL_SECTION
    }
}

export const actChangeToPaymentSection = () => {
    return {
        'type': types.PAYMENT_SECTION
    }
}

export const actChangeToReviewSection = () => {
    return {
        'type': types.REVIEW_SECTION
    }
}

export const actOrderSetState = (orderState) => {
    return {
        'type': types.ORDER_STATE,
        orderState
    }
}

export const actSearchTermState = (searchState) => {
    return {
        'type': types.SEARCH_TERM_STATE,
        searchState
    }
}

export const actNotificationSetState = (notificationState) => {
    return {
        'type': types.NOTIFICATION_STATE,
        notificationState
    }
}

export const actAllowNext = () => {
    return {
        'type': types.ALLOW_NEXT
    }
}

export const actNotAllowNext = () => {
    return {
        'type': types.NOT_ALLOW_NEXT
    }
}

export const actLogin = (userId) => {
    return {
        'type': types.LOGGED_IN,
        userId
    }
}

export const actLogout = () => {
    return {
        'type': types.LOGGED_OUT
    }
}

export const actCalculateTotalPrice = (totalPrice) => {
    return {
        'type': types.TOTAL_PRICE,
        totalPrice
    }
}