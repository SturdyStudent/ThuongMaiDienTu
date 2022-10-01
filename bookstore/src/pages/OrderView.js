import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import './OrderView.css'
import Cover from '../assets/bookCover.png'
import ReviewModal from '../components/ReviewModal'

function OrderView() {
    return (
        <>
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
                    <div class="card mt-4 p-4 shadow rounded">
                        <div className='row'>
                            <div className='col-md-6 d-flex justify-content-center' >Sản phẩm</div>
                            <div className='col-md-1'>Giá</div>
                            <div className='col-md-1'>Só lượng</div>
                            <div className='col-md-1'>Giảm giá</div>
                            <div className='col-md-3 text-end'>Tạm tính</div>
                        </div>
                        <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                        <div class=" pt-4 mt-4 border-top">

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
                                        <button className='btn btn-danger' type='button'>Viết đánh giá</button>
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

            </div>
            <ReviewModal />
            <Footer />
        </>
    )
}

export default OrderView