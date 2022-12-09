import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { baseUrl } from '../baseUrl';
import { Navigate } from 'react-router-dom';
import auth from '../auth';
import axios from 'axios';
import { actLogin } from '../actions';
import { useDispatch } from 'react-redux';
import { HalfMalf } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

function Login({ callbackChangeRegisterPage }) {
    const loginUrl = `${baseUrl}/clientAuth/login`;
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState();

    const [displayError, setDisplayError] = useState('');
    const [redirect, setRedirect] = useState(false);

    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    if (redirect) {
        return <Navigate to={"/"} replace />
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        handleLogin();
    }

    const adminAuthenticated = () => {
        axios.get(`${baseUrl}/clientAuth/isAdminAuth`, {
            headers: {
                "x-access-token": Cookies.get("token")
            }
        }).then((res) => {
            if (res.data.auth === true) {
                dispatch(actLogin(res.data.id));
                
                auth.login(() => {
                    setTimeout(() => {
                        setRedirect(true);
                        setIsLoading(false)
                    }, 800);
                })
            }
        })
    }

    const handleLogin = () => {
        axios.post(loginUrl, {
            Email: email,
            MatKhau: password
        }).then((res) => {
            localStorage.setItem('LOGIN_INFORMATION', JSON.stringify(res.data));
            if (res.status === 200) {
                setIsLoading(false);
                document.cookie = `token=${res.data.data.token};SameSite=strict;Secure`;
                localStorage.setItem("TOKEN", res.data.data.token);
                adminAuthenticated();
            } else {
                setDisplayError("Nhập sai tên đăng nhập hoặc mật khẩu");
            }
        }).catch(err => {
            setIsLoading(false);
            if ((String)(err.response.data.message) === "Lỗi xác thực") {
                setDisplayError(err.response.data.data[0].msg);
            } else {
                setDisplayError(err.response.data.message);
            }
        })
    }

    return (
        <div id='register-section'>
            <form onSubmit={e => handleSubmit(e)}>
                {isLoading && <HalfMalf center="false" width="150px" height="150px" />}
                <h3>KHÁCH HÀNG ĐÃ CÓ TÀI KHOẢN</h3>
                <hr />
                <p className='fw-bold'>Email:</p>
                <input type={"text"} placeholder="Nhập địa chỉ email" value={email} onChange={e => onChangeEmail(e)} className='checkout-login-input p-2 mb-3'></input>
                <p className='fw-bold'>Mật khẩu:</p>
                <input type={"password"} placeholder="Nhập mật khẩu" value={password} onChange={e => onChangePassword(e)} className='checkout-login-input p-2 mb-3'></input>
                <div className='center-child-div'>
                    <button type={'submit'} id='checkout-btn' style={{ width: "20vw", borderRadius: "30px" }}><b>ĐĂNG NHẬP</b> </button>
                </div>
                {<p className='text-danger fw-bold mt-2'>{String(displayError)}</p>}
                <div className='text-center fw-bold col-md-9 mt-3'>
                    <Link to={'/forgot-password'} style={{ textDecoration: "none" }}>
                        Quên mật khẩu?
                    </Link>
                </div>
                <div className='text-center fw-bold col-md-9 mt-3'>
                    <a href='/#' className='pe-auto cursor-pointer' onClick={(e) => callbackChangeRegisterPage(e)}>Chuyển sang trang đăng kí</a>
                </div>
            </form>
        </div>
    )
}

export default Login