import React, { useState } from 'react'
import '../login/PartnerLoginPage.css'
import OtpInput from 'react-otp-input-rc-17'
import axios from 'axios'
import { HalfMalf } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'
import { Navigate } from 'react-router-dom';
import { axiosConfig } from '../../axiosConfig';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [displayError, setDisplayError] = useState();

  const verifyUrl = `${axiosConfig.url}/verify-otp`;
  const resendOtpUrl = `${axiosConfig.url}/resend-verify-otp`;

  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // const [timeoutResend, setTimeoutResend] = useState(false);

  if (redirect) {
    return <Navigate to={"/login"} replace />
  }

  const handleChangeOtp = (otp) => setOtp(otp)
  const userEmail = localStorage.getItem("USER_LOGIN_INFORMATION");
  const handleVerify = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(verifyUrl, {
      email: userEmail,
      otp: otp
    }).then((res) => {
      if (res.status === 200) {
        setTimeout(() => { setRedirect(true); setIsLoading(false); }, 800);
      }
    }).catch(err => {
      setIsLoading(false);
      if ((String)(err.response.data.message).match("Lỗi xác thực")) {
        setDisplayError(err.response.data.data[0].msg);
      } else {
        setDisplayError(err.response.data.message);
      }
    })
  }

  const resendOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(resendOtpUrl, { email: userEmail })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
        }
      }).catch(
        err => {
          console.log(err);
          console.log(err.response.data);
          if ((String)(err.response.data.message).match("Lỗi xác thực")) {
            console.log("vô nè đĩ");
            setDisplayError(err.response.data.data[0].msg);
          } else {
            setDisplayError(err.response.data.message);
          }
          setIsLoading(false)
        });
  }

  return (
    <div className="row login-bg" style={{ "margin": "0px" }}>
      <div className='card-parent d-flex justify-content-center' >
        {isLoading && <HalfMalf center="false" width="150px" height="150px" />}
        <div class="card p-4 shadow-lg m-5" style={{ width: '35rem', borderRadius: "20px" }}>
          <div class="card-body">
            <form onSubmit={e => handleVerify(e)}>
              <h3 className='text-center'>Nhập mã xác thực</h3>
              <h5>Vui lòng nhập mã xác thực được gửi đến email <span className='text-primary'>{userEmail}</span></h5>
              <OtpInput
                value={otp}
                onChange={handleChangeOtp}
                numInputs={4}
                containerStyle={{ "display": "flex", "justifyContent": "center" }}
                inputStyle={{ width: "60px", height: "12vh", textAlign: "center", margin: "15px", fontSize: "40px", color: "orange", fontStyle: "bold" }}
              />
              <div className='text-center mt-4'>
                <input className='bg-success text-white border-0 pt-2 pb-2 p-5 rounded ' type='submit' value="Xác nhận"></input>
              </div>
            </form>
            {<p className='text-danger fw-bold mt-2 text-center'>{displayError}</p>}
            <p className='text-center mt-3'>Chưa nhận được mã otp? <span className='text-primary' onClick={e => resendOtp(e)} id="resend-otp-link">Gửi lại</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp