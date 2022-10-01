import React, { useState } from 'react'
import './ReviewModal.css'
import { Rating } from 'react-simple-star-rating'
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import BookCover from '../assets/bookCover.png'

export default function ReviewModal() {
    const [rateVal, setRateVal] = useState(0);
    const [allowAppear, setAllowAppear] = useState(true);
    const handleOpenSuccessModal = () => {
        setAllowAppear(false);
    }
    const preventPropagation = (event) => {
        event.stopPropagation();
    }
    const handleRating = (val) => {
        setRateVal(val)
    }
    let orderSuccessModal = <></>;
    if (allowAppear) {
        orderSuccessModal = <div className='container-out-notification row' onClick={handleOpenSuccessModal}>
            <div className='container-notification offset-4 col-md-4 p-4' style={{ "top": "12vh" }} onClick={preventPropagation}>
                <div style={{ fontWeight: "500" }} className='text-start'>Giao hàng vào ngày 09 thg 9 2022</div>
                <div className='text-start mb-3'>Nhận xét và đánh giá sản phẩm đã mua (5 sao: Rất Tốt - 1 sao: Rất Tệ):</div>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='book-cover-review-modal' style={{ height: "110px", width: "80px" }}>
                            <img src={BookCover} style={{ height: '100%', width: "100%" }} />
                        </div>
                    </div>
                    <div className='col-md-9 text-start'>
                        <h6>The Hideout</h6>
                        <Rating ratingValue={rateVal} onClick={handleRating} />
                        <div>Đánh giá chi tiết</div>
                        <textarea className='col-md-12 mt-3' placeholder='Bạn nghĩ gì về sản phẩm này..'></textarea>
                        <input class="form-control form-control-sm mt-3" id="formFileSm" type="file" />
                    </div>
                </div>
                <div>
                    <button className='back-notification-btn' onClick={(e) => handleRedirect(e)}>Lưu dánh giá</button>
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