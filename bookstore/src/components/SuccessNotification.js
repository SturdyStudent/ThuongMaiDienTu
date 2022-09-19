import React, { useState } from 'react'
import './SuccessNotification.css'
import { Navigate } from 'react-router-dom';
import SuccessPayment from '../assets/successPayment.jpg'

export default function SuccessNotification() {
    const [allowAppear, setAllowAppear] = useState(true);
    const handleOpenSuccessModal = () => {
        setAllowAppear(false);
    }
    const preventPropagation = (event) => {
        event.stopPropagation();
    }
    let orderSuccessModal = <></>;
    if (allowAppear) {
        orderSuccessModal = <div className='container-out-notification row' onClick={handleOpenSuccessModal}>
            <div className='container-notification offset-4 col-md-4' onClick={preventPropagation}>
                <img src={SuccessPayment} width="470px" height="200px" style={{ "border": "none" }} />
                <div>
                    <button className='back-notification-btn' onClick={(e) => handleRedirect(e)}>Quay về trang chủ</button>
                </div>
            </div>
        </div>
    }
    const [redirect, setRedirect] = useState(false);
    function handleRedirect(e) {
        e.preventDefault();
        setRedirect(true);
    }
    if (redirect) {
        return <Navigate to={"/"} replace />
    }
    return (
        <>
            {orderSuccessModal}
        </>
    )
}