import React from 'react'

function register() {
    return (
        <div className='col-md-5' id='register-section'>
            <h3>TẠO TÀI KHOẢN MỚI</h3>
            <hr />
            <label>Email</label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <label>First Name</label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <label>Mật khẩu</label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <label>Xác nhận mật khẩu</label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <div className='center-child-div'>
                <button id='checkout-btn' style={{ width: "20vw", borderRadius: "30px" }}><b>TẠO TÀI KHOẢN</b> </button>
            </div>
        </div>
    )
}

export default register