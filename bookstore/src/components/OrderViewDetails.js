import React, { useEffect, useState } from 'react'
import '../pages/OrderView.css'
import Header from './Header'
import Footer from './Footer'
import Cover from '../assets/bookCover.png'
import ReviewModal from '../components/ReviewModal'
import SuccessNotification from './SuccessNotification'
import FailNotification from './FailNotification'
import { useDispatch } from 'react-redux';
import { actOrderSetState } from '../actions/index'
import { useStripe } from '@stripe/react-stripe-js';

function OrderViewDetails() {
    const stripe = useStripe();
    const dispatch = useDispatch();
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [successNotification, setSuccessNotification] = useState(false);
    const [failureNotification, setFailureNotification] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        localStorage.setItem("secrets", clientSecret);
        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setSuccessNotification(true);
                    dispatch(actOrderSetState({
                        TenNguoiNhan: null,
                        DienThoaiNguoiNhan: null,
                        DiaChiGiao: null
                    }));
                    localStorage.setItem("CART_ITEMS", []);
                    break;
                case "requires_payment_method":
                    setFailureNotification(true);
                    dispatch(actOrderSetState({
                        TenNguoiNhan: null,
                        DienThoaiNguoiNhan: null,
                        DiaChiGiao: null
                    }));
                    break;
                default:
                    setFailureNotification(true);
                    dispatch(actOrderSetState({
                        TenNguoiNhan: null,
                        DienThoaiNguoiNhan: null,
                        DiaChiGiao: null
                    }));
                    break;
            }
        });
    }, [stripe, dispatch]);

    return (
        <div>
            <Header />
            <div className='parent-body-padding mt-4'>
                <div className='text-start card p-4 border-0 shadow-sm'>
                    <h4>Chi tiết đơn hàng #838189143</h4>
                    <div>
                        <a href='/#'>Xem hóa đơn</a>
                    </div>
                </div>
                <div className='row' style={{ height: "fit-content" }}>
                    <div className='col-md-4'>
                        <div className='text-start mt-3 mb-3' style={{ "fontWeight": "500" }}>ĐỊA CHỈ NGƯỜI NHẬN</div>
                    </div>
                    <div className='col-md-4'>
                        <div className='text-start mt-3 mb-3' style={{ "fontWeight": "500" }}>HÌNH THỨC GIAO HÀNG</div>
                    </div>
                    <div className='col-md-4'>
                        <div className='text-start mt-3 mb-3' style={{ "fontWeight": "500" }}>HÌNH THỨC THANH TOÁN</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='card text-start p-4 shadow-sm' style={{ height: "100%" }}>
                            <h6>TRẦN THÀNH ĐẠT</h6>
                            <p><b>Địa chỉ</b>: 105 đường Hai Bà Trung, Phường 10, Quận 1, Hồ Chí Minh, Việt Nam</p>
                            <div><b>Điện thoại</b>: 0552341353</div>
                        </div>
                    </div>
                    <div className='col-md-4'>

                        <div className='card text-start p-4 shadow-sm' style={{ height: "100%" }}>
                            <div>Giao tiết kiệm</div>
                            <div>Giao vào thứ năm, 14/2</div>
                            <div>Phí vận chuyển: 12.000đ</div>
                        </div>
                    </div>
                    <div className='col-md-4'>

                        <div className='card text-start p-4 shadow-sm' style={{ height: "100%" }}>
                            <div> Thanh toán tiền mặt khi nhận hàng</div>
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <div className="card mt-4 p-4 shadow rounded">
                        <div className='row'>
                            <div className='col-md-6 d-flex justify-content-center' >Sản phẩm</div>
                            <div className='col-md-1'>Giá</div>
                            <div className='col-md-1'>Só lượng</div>
                            <div className='col-md-1'>Giảm giá</div>
                            <div className='col-md-3 text-end'>Tạm tính</div>
                        </div>
                        <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                        <div className=" pt-4 mt-4 border-top">

                            <div className='row'>
                                <div className='col-md-2 d-flex justify-content-center' >
                                    <div className='book-detail-cover-view'>
                                        <img src={Cover} alt="..." />
                                    </div>
                                </div>
                                <div className='col-md-4 text-start' >
                                    <h6 className='mt-2'>THE OUTSIDER</h6>
                                    <div className='mt-2'>Cung cấp bởi: Tiki</div>
                                    <div>SKU:2457059</div>
                                    <div className='mt-3'>
                                        <button className='btn btn-danger' onClick={() => setOpenReviewModal(!openReviewModal)} type='button'>Viết đánh giá</button>
                                    </div>

                                </div>
                                <div className='col-md-1'>
                                    <div>62.000đ</div>
                                </div>
                                <div className='col-md-1'>
                                    <div>1</div>
                                </div>
                                <div className='col-md-1'>
                                    <div>0đ</div>
                                </div>
                                <div className='col-md-3 text-end'>
                                    <h6>62.000đ</h6><br />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <div className='row'>
                                <div className='col-md-10 text-end'>Tạm tính</div>
                                <div className='col-md-2'>60.200đ</div>
                            </div>
                            <div className='row'>
                                <div className='col-md-10 text-end'>Phí vận chuyển</div>
                                <div className='col-md-2'>12.000đ</div>
                            </div>
                            <div className='row'>
                                <div className='col-md-10 text-end'>Tổng cộng</div>
                                <h5 className='col-md-2 text-danger'>72.200đ</h5>
                            </div>
                        </div>
                    </div>
                </div>
                {successNotification ? <SuccessNotification /> : null}
                {failureNotification ? <FailNotification /> : null}
                {openReviewModal ? <ReviewModal /> : null}
            </div>
            <Footer />
        </div>
    )
}

export default OrderViewDetails