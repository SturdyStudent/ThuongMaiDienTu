import React, { useState } from 'react'
import './ReviewModal.css'
import SuccessLogo from '../../assets/images/SuccessNotificationLogo.png'

export default function SuccessModal({ successNotification }) {
    const [allowAppear, setAllowAppear] = useState(true);
    const handleCloseSuccessModal = () => {
        setAllowAppear(false);
    }
    const preventPropagation = (event) => {
        event.stopPropagation();
    }
    let orderSuccessModal = <></>;
    if (allowAppear) {
        orderSuccessModal = <div className='container-out-notification row' onClick={handleCloseSuccessModal}>
            <div className='container-notification offset-4 col-md-4 p-4' style={{ "top": "12vh" }} onClick={preventPropagation}>
                <img src={SuccessLogo} alt=".." width="100rem" />
                <h4 className='fw-bold mt-5 mb-3'>{successNotification}</h4>
            </div>
        </div>
    }
    return (
        <>
            {orderSuccessModal}
        </>
    )
}