import React, { useState } from 'react'
import { axiosConfig } from '../../axiosConfig';
import { Navigate } from 'react-router-dom';
import { HalfMalf } from 'react-spinner-animated';
import Cookies from 'js-cookie'
import 'react-spinner-animated/dist/index.css'
import Logo from '../../assets/images/logo.png';
import axios from 'axios'
import auth from '../../auth';
import './PartnerLoginPage.css'
import DelayLink from '../../helpers/delayLink';

function PartnerLoginPage() {
  const loginUrl = `${axiosConfig.url}login`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState();

  const [displayError, setDisplayError] = useState();
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
    axios.get(`${axiosConfig.url}/isAdminAuth`, {
      headers: {
        "x-access-token": Cookies.get("token")
      }
    }).then((res) => {
      if (res.data.auth === true) {
        auth.login(() => {
          localStorage.setItem("loggedIn", true);
          setTimeout(() => { setRedirect(true); setIsLoading(false) }, 800);
        })
      }
    })
  }

  const handleLogin = () => {
    axios.post(loginUrl, {
      email: email,
      password: password
    }).then((res) => {
      localStorage.setItem('LOGIN_INFORMATION', JSON.stringify(res.data));
      if (res.status === 200) {
        document.cookie = `token=${res.data.data.token};SameSite=strict;Secure`;
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
    <div className="row login-bg" style={{ "margin": "0", maxHeight: "100vh" }}>
      <div className=' d-flex justify-content-center align-items-center card-parent'>
        {isLoading && <HalfMalf center="false" width="150px" height="150px" />}
        <div className="card p-4 shadow-lg" style={{ width: '25rem', borderRadius: "20px" }}>
          <div className="card-body">
            <div className='justify-content-center mb-3 text-center'>
              <img src={Logo} alt="..." height="40px"></img>
            </div>
            <h5 className="card-title fw-bold">Chào mừng đã quay lại!</h5>
            <p className="card-text">Đăng nhập để quản lí kho sách của bạn từ việc kiểm
              tra lợi nhuận cho đến quản lí khách hàng</p>
            <form id='form' onSubmit={e => handleSubmit(e)}>
              <p className='fw-bold'>Email</p>
              <input type="email" name="user" className='col-md-12 p-2 mb-3' placeholder='Nhập email' value={email} onChange={onChangeEmail}></input>
              <p className='fw-bold'>Mật khẩu</p>
              <input type="password" name='pass' className='col-md-12 p-2 mb-3' placeholder='Nhập mật khẩu' value={password} onChange={onChangePassword}></input><br />
              <input type="submit" className='border-0 p-2 text-white col-md-12' id="btn-login" value="Đăng nhập" name='submit'></input>
              {<p className='text-danger fw-bold mt-2'>{displayError}</p>}
              <div className='text-center mt-3'> <b>Chưa có mật khẩu?</b> &nbsp;
                <DelayLink to={'/register'}>
                  <span style={{ textDecoration: "none", fontWeight: "500" }}>Đăng kí ngay!</span>
                </DelayLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerLoginPage
