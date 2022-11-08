import * as type from '../constants/ActionTypes'
let defaultState = {
    TenNguoiNhan: '',
    DienThoaiNguoiNhan: '',
    DiaChiGiao: ''
};
export let orderState = (state = defaultState, action) => {
    switch (action.type) {
        case type.ORDER_STATE:
            return action.orderState;
        default:
            return state;
    }
}
