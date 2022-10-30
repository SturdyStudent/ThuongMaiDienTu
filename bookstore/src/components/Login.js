import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='col-md-5' id='register-section'>
            <h3>KHÁCH HÀNG ĐÃ CÓ TÀI KHOẢN</h3>
            <hr />
            <label>Email</label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <label>Password</label><br />
            <input type={"text"} className='checkout-login-input'></input><br /><br />
            <div className='center-child-div'>
                <button id='checkout-btn' style={{ width: "20vw", borderRadius: "30px" }}><b>ĐĂNG NHẬP</b> </button>
            </div>
            <div className='text-center fw-bold col-md-9 mt-3'>
                <Link to={'/'} style={{ textDecoration: "none" }}>
                    Quên mật khẩu?
                </Link>
            </div>
        </div>
    )
}

export default Login