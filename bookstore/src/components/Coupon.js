import React from 'react'
import './Coupon.css'
import Logo from '../assets/logo.png'
import { useState } from 'react';

function Coupon() {
    const couponCode = 'STEALDEAL20';
    const [couponBtnText, setCouponBtnText] = useState('LẤY MÃ');
    const getCoupon = () => {
        navigator.clipboard.writeText(couponCode);
        setCouponBtnText('ĐÃ LẤY MÃ!');
    }

    return (
        <div>
            <div className="coupon-container">
                <div className="coupon-card self-center-div mt-5">
                    <img src={Logo} alt="" className="logo" />
                    <h5>20% off </h5>
                    <div className="coupon-row">
                        <span id='cpnCode'>{couponCode}</span>
                        <span id='cpnBtn' onClick={getCoupon}>{couponBtnText}</span>
                    </div>
                    <p>Tiêu ít nhất từ <ins>150,000đ</ins> <br />Có giá trị từ <b>12-17 thg 9, 2022</b></p>
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                </div>
            </div>
        </div>
    )
}

export default Coupon