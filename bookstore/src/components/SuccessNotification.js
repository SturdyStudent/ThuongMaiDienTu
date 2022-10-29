import React, { useState } from 'react'
import './SuccessNotification.css'
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
            </div>
        </div>
    }
    return (
        <>
            {orderSuccessModal}
        </>
    )
}