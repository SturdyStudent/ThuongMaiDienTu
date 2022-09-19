import React from 'react'
import Cover from '../assets/bookCover.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import SuccessNotification from './SuccessNotification'

function PlaceOrder() {
    return (
        <div>
            <h4>SẮP XONG RỒI! HÃY KIỂM TRA LẠI THÔNG TIN ĐẶT HÀNG</h4><br />
            <div class="container">
                <div class="row">
                    <blockquote class="blockquote blockquote-custom bg-white p-5 shadow rounded">
                        <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                        <h5>Shipping Address</h5>
                        <div class=" pt-4 mt-4 border-top">
                            <div>101 Laurence Ave </div>
                            <div>Highland Park, New Jersey <span style={{ color: "blue", fontSize: "0.7em" }}>Thay đổi</span></div>
                        </div>
                    </blockquote>
                    <blockquote class="blockquote blockquote-custom bg-white mt-4 p-5 shadow rounded">
                        <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                        <h5>Items</h5>
                        <div class=" pt-4 mt-4 border-top">
                            <div className='row'>
                                <div className='col-md-3' >
                                    <div id='book-detail-cover'>
                                        <img src={Cover} alt="..." />
                                    </div>
                                </div>
                                <div className='offset-1 col-md-6' >
                                    <h4 className='mt-2'>THE OUTSIDER</h4>
                                    <div className='mt-2'>x1</div>
                                    <div className='mt-2'>$20.00</div>
                                    <div className='mt-2'><FontAwesomeIcon icon={faX} /> Loại bỏ</div>
                                </div>
                            </div>
                        </div>
                    </blockquote>
                    <blockquote class="blockquote blockquote-custom bg-white mt-4 p-5 shadow rounded">
                        <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                        <h5>Contact</h5>
                        <div class=" pt-4 mt-4 border-top">
                            <div>101 Laurence Ave </div>
                            <div>Highland Park, New Jersey <span style={{ color: "blue", fontSize: "0.7em" }}>Thay đổi</span></div>
                        </div>
                    </blockquote>
                    <blockquote class="blockquote blockquote-custom bg-white mt-4 p-5 shadow rounded">
                        <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                        <h5>Payment Method</h5>
                        <div class=" pt-4 mt-4 border-top">
                            <div>101 Laurence Ave </div>
                            <div>Highland Park, New Jersey <span style={{ color: "blue", fontSize: "0.7em" }}>Thay đổi</span></div>
                        </div>
                    </blockquote>
                </div>
                <SuccessNotification />
            </div>
        </div>
    )
}

export default PlaceOrder