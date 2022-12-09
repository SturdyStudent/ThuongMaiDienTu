import axios from 'axios';
import React, { useState } from 'react'
import { baseUrl } from '../baseUrl';
import SuccessNotification from '../components/SuccessNotification';
import Footer from '../components/Footer'
import Header from '../components/Header'
import { HalfMalf } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

function ChangePassword() {
    const [oldPass, setOldPass] = useState();
    const [newPass, setNewPass] = useState();
    const [confirmNewPass, setConfirmNewPass] = useState();

    const [alertText, setAlertText] = useState();
    const [successNotification, setSuccessNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const retrievePasswordUrl = `${baseUrl}/clientAuth/change-password`;
    const data = localStorage.getItem("LOGIN_INFORMATION");
    console.log(JSON.parse(data).data.Email);
    const sendChangePasswordRequest = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(retrievePasswordUrl, {
            email: JSON.parse(data).data.Email,
            MatKhauCu: oldPass,
            MatKhauMoi: newPass,
            XacNhanMatKhauMoi: confirmNewPass
        }).then(result => {
            setIsLoading(false);
            if(result.status === 200){
                setSuccessNotification(true);
            }
        }).catch((err) => {
            setIsLoading(false);
            console.log(err);
            setAlertText("Gửi mật khẩu thất bại");
        })
    }

    return (
        <div>
            <Header />
                <div className='parent-body-padding mt-5' style={{ "width": "100%", "minHeight":"30vh"}}>
                    {isLoading && <HalfMalf center="false" width="150px" height="150px" />}
                    {successNotification ? <SuccessNotification successText={'Gửi mật khẩu thành công'} callbackFunction={() => {document.location.href='/checkout-login'}} /> : null}
                    <div className='parent-body-padding mt-5 text-center' style={{ "width": "100%", "minHeight":"30vh"}}>
                        <form className="d-flex justify-content-center flex-column" onSubmit={e => sendChangePasswordRequest(e)}>
                            <h3 className='mb-5 text-center'>Đổi mật khẩu</h3>
                            <div className='fit-content text-start center-child'>
                                <p style={{color:"#212529", fontSize:"1.1em", fontWeight:"500"}} >Nhập mật khẩu cũ</p>
                                <input type={"password"} style={{width:"400px"}} placeholder="Nhập mật khẩu cũ" value={oldPass} onChange={e => setOldPass(e.target.value)} className='checkout-login-input p-2 mb-3'></input><br/>
                                <p style={{color:"#212529", fontSize:"1.1em", fontWeight:"500"}} >Nhập mật khẩu mới</p>
                                <input type={"password"} style={{width:"400px"}} placeholder="Nhập mật khẩu mới" value={newPass} onChange={e => setNewPass(e.target.value)} className='checkout-login-input p-2 mb-3'></input><br/>
                                <p style={{color:"#212529", fontSize:"1.1em", fontWeight:"500"}} >Nhập lại mật khẩu mới</p>
                                <input type={"password"} style={{width:"400px"}} placeholder="Nhập lại mật khẩu mới" value={confirmNewPass} onChange={e => setConfirmNewPass(e.target.value)} className='checkout-login-input p-2 mb-3'></input><br/>
                                
                                <input type={"submit"} style={{width:"400px"}} value={"Gửi"} className='checkout-login-input p-2 mb-3 btn btn-success'></input>
                            </div>
                        </form>
                    </div>
                    {alertText && <p className='text-danger fw-bold'>{alertText}</p>}
                    <div className='text-center fw-bold'>
                        <a href='/' className='pe-auto cursor-pointer'>Bỏ qua</a>
                    </div>
                </div>
            <Footer/>
        </div>
  )
}

export default ChangePassword