import React, { useState } from 'react'
import './SuccessNotification.css'
import SuccessPayment from '../assets/successPayment.jpg'

export default function SuccessNotification({callbackFunction, successText}) {
    const [allowAppear, setAllowAppear] = useState(true);
    const handleOpenSuccessModal = () => {
        setAllowAppear(false);
        callbackFunction();
    }
    const preventPropagation = (event) => {
        event.stopPropagation();
    }
    let orderSuccessModal = <></>;
    if (allowAppear) {
        orderSuccessModal =
            <div className='container-out-notification row' onClick={handleOpenSuccessModal}>
                <div className='container-notification offset-4 col-md-4' onClick={preventPropagation}>
                    <img src={SuccessPayment} alt="" width="200px" height="200px" style={{ "border": "none" }} />
                    <h5>{successText ? successText : 'Mua hàng thành công!'}</h5>
                </div>
            </div>
    }
    return (
        <>
            {orderSuccessModal}
        </>
    )
}