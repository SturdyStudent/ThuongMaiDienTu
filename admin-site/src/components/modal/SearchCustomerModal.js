import React, { useState } from 'react'
import './ReviewModal.css'
import { Navigate } from 'react-router-dom';
import Cover from '../../assets/images/bookCover.png'

export default function SearchModal() {
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
            <div className='container-notification offset-4 col-md-4 p-4' style={{ "top": "12vh" }} onClick={preventPropagation}>
                <div className='text-start'>Thêm khách hàng</div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Nhập tên khách hàng" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                        <span class="input-group-text bg-primary text-white" id="basic-addon2">Tìm kiếm</span>
                    </div>
                </div>
                <hr />
                <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                <div class=" pt-4 border-bottom pb-3">
                    <div className='row col-md-12'>
                        <div className='col-md-3 d-flex justify-content-center' >
                            <div className='book-detail-cover-view rounded-circle' style={{ width: "50px", height: "50px" }}>
                                <img src={Cover} className='rounded-circle' alt="..." />
                            </div>
                        </div>
                        <div className='col-md-4 text-start'>
                            Tên Khách hàng
                        </div>
                        <div className='col-md-4 text-start' >
                            thanhdat5101@gmail.com
                        </div>
                    </div>
                </div>

                <div>
                    <button className='back-notification-btn' onClick={(e) => handleRedirect(e)}>Lưu</button>
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