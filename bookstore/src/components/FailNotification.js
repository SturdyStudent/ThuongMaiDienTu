import React, { useState } from 'react'
import './SuccessNotification.css'
import { Navigate } from 'react-router-dom';
import FailPayment from '../assets/failNotification.png'

export default function FailNotification() {
    const [allowAppear, setAllowAppear] = useState(true);
    const handleOpenFailModal = () => {
        setAllowAppear(false);
    }
    const preventPropagation = (event) => {
        event.stopPropagation();
    }
    let orderFailModal = <></>;
    if (allowAppear) {
        orderFailModal =
            <div className='container-out-notification row' onClick={handleOpenFailModal}>
                <div className='container-notification offset-4 col-md-4' onClick={preventPropagation}>
                    <img src={FailPayment} className='m-4' width="120px" height="100px" style={{ "border": "none" }} />
                    <h5 className='text-danger ms-5 me-5'>Mua hàng thất bại, gặp vấn đề trong lúc xử lí thanh toán</h5>
                </div>
            </div>
    }
    return (
        <>
            {orderFailModal}
        </>
    )
}