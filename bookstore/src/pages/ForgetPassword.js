import axios from 'axios';
import React, { useState } from 'react'
import { baseUrl } from '../baseUrl';
import SuccessNotification from '../components/SuccessNotification';
import Footer from '../components/Footer'
import Header from '../components/Header'
import { HalfMalf } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'
import { Navigate } from 'react-router-dom';

function ForgetPassword() {
    const [email, setEmail] = useState();
    const [alertText, setAlertText] = useState();
    const [successNotification, setSuccessNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const retrievePasswordUrl = `${baseUrl}/clientAuth/retrieve-password`

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const sendRetrievePasswordRequest = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(retrievePasswordUrl, {
            email: email
        }).then(result => {
            setIsLoading(false);
            if(result.status === 200){
                setSuccessNotification(true);
            }
        }).catch(() => {
            setIsLoading(false);
            setAlertText("Gửi mật khẩu thất bại");
        })
    }

  return (
        <div>
            <Header />
            {isLoading && <HalfMalf center="false" width="150px" height="150px" />}
            {successNotification ? <SuccessNotification successText={'Gửi mật khẩu thành công'} callbackFunction={() => {document.location.href='/checkout-login'}} /> : null}
            <div className='parent-body-padding mt-5' style={{ "width": "100%", "minHeight":"30vh"}}>
                <h3>Cài đặt lại mật khẩu</h3>
                    <p style={{color:"#212529"}}>Mật khẩu mới sẽ được gửi về email của bạn</p>
                    <input type={"text"} style={{width:"400px"}} placeholder="Nhập địa chỉ email" value={email} onChange={e => onChangeEmail(e)} className='checkout-login-input p-2 mb-3'></input><br/>
                    <input type={"button"} onClick={e => sendRetrievePasswordRequest(e)} style={{width:"400px"}} value={"Gửi"} className='checkout-login-input p-2 mb-3 btn btn-success'></input>
            </div>
            {alertText && <p className='text-danger fw-bold'>{alertText}</p>}
            <div className='text-center fw-bold'>
                <a href='/' className='pe-auto cursor-pointer'>Bỏ qua</a>
            </div>
            <Footer/>
        </div>
    )
}

export default ForgetPassword