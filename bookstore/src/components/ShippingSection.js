import React from 'react'

function ShippingSection() {
    return (
        <>
            <br />
            <h5>THÔNG TIN VẬN CHUYỂN</h5><br />
            <label>Họ tên</label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <label><span style={{ "color": "red" }}>*</span> Địa chỉ </label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <label>Tỉnh/Thành phố</label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <label><span style={{ "color": "red" }}>*</span> Mã bưu điện</label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <label><span style={{ "color": "red" }}>*</span> Số điện thoại</label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <div><span style={{ "color": "red" }}>Những ô có dấu * là bắt buộc</span></div>
        </>
    )
}

export default ShippingSection