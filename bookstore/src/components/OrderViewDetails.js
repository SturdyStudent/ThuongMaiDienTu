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
import vi from 'date-fns/locale/vi'
import axios from 'axios'
import { baseUrl, loadImageUrl } from '../baseUrl'
import format from 'date-fns/format'
import { useLocation, useParams } from 'react-router-dom'

function OrderViewDetails() {
    const stripe = useStripe();
    const dispatch = useDispatch();

    const [bookdId, setBookId] = useState();
    const [orderId, setOrderId] = useState(0);
    const [total, setTotal] = useState(0);
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [successNotification, setSuccessNotification] = useState(false);
    const [failureNotification, setFailureNotification] = useState(false);

    const [receiverName, setReceiverName] = useState('Đang cập nhật');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [deliverMethod, setDeliverMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [deliverDate, setDeliverDate] = useState('');

    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        if (!stripe) {
            return;
        }else if(stripe){
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
                        setOrderId(localStorage.getItem('ORDER_ID'))
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
        }
    }, [stripe, dispatch]);

    const location = useLocation();
    let id = null;
    try {
        id = location.state.id;
    } catch (err) {
    }

    useEffect(() => {
        if(id){
            setOrderId(id);
        }
    }, [id])

    useEffect(() => {
        axios.get(`${baseUrl}/order/${orderId}`)
            .then(result => {
                const orderData = result.data.data[0];
                if(orderData){
                    setReceiverName(orderData.TenNguoiNhan);
                    setReceiverAddress(orderData.DiaChiGiao);
                    setReceiverPhone(orderData.DienThoaiNguoiNhan);
                    setPaymentMethod(orderData.HinhThucThanhToan);
                    setDeliverMethod(orderData.HinhThucGiaoHang);
                    setDeliverDate(format(new Date(orderData.NgayGiao), "iii, dd 'Tháng' MM yyyy",{
                        locale: vi
                    }));
                    setTotal(orderData.ThanhTien)
                }
            })

        axios.get(`${baseUrl}/orderDetail/${orderId}`)
            .then(result => {
                const orderDetailData = result.data.data;
                setBookId(orderDetailData.MaSach);
                setOrderDetails(orderDetailData);
            })
    }, [orderId])



    return (
        <div>
            <Header />
            <div className='parent-body-padding mt-4'>
                <div className='text-start card p-4 border-0 shadow-sm'>
                    <h4>Chi tiết đơn hàng #{orderId}</h4>
                    <div>
                        <a href='#'>Xem hóa đơn</a>
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
                            <h6>{String(receiverName).toUpperCase()}</h6>
                            <p><b>Địa chỉ</b>: {receiverAddress}</p>
                            <div><b>Điện thoại</b>: {receiverPhone}</div>
                        </div>
                    </div>
                    <div className='col-md-4'>

                        <div className='card text-start p-4 shadow-sm' style={{ height: "100%" }}>
                            <div>{deliverMethod}</div>
                            <div>Giao vào {deliverDate}</div>
                            <div>Phí vận chuyển: 20.000đ</div>
                        </div>
                    </div>
                    <div className='col-md-4'>

                        <div className='card text-start p-4 shadow-sm' style={{ height: "100%" }}>
                            <div> {paymentMethod}</div>
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <div className="card mt-4 p-4 shadow rounded">

                        <div className='row'>
                            <div className='col-md-6 d-flex justify-content-center' >Sản phẩm</div>
                            <div className='col-md-1'>Giá</div>
                            <div className='col-md-1'>Só lượng</div>
                            <div className='col-md-3 text-end'>Tạm tính</div>
                        </div>
                        <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                        <div className=" pt-4 mt-4 border-top">
                        {(Array(orderDetails).length !== 0) ? orderDetails.map((item, index) => {
                            return (
                                <div key={index}>
                                     <div className='row'>
                                        <div className='col-md-2 d-flex justify-content-center' >
                                            <div className='book-detail-cover-view'>
                                                <img src={`${loadImageUrl}/${item.AnhBia}`} alt="..." />
                                            </div>
                                        </div>
                                        <div className='col-md-4 text-start' >
                                            <h6 className='mt-2'>{item.TenSach}</h6>
                                            <div className='mt-2'>Thể loại: {item.TenChuDe}</div>
                                            <div>Tác giả: {item.TenTacGia}</div>
                                            <div className='mt-3'>
                                                <button className='btn btn-danger' onClick={() => setOpenReviewModal(!openReviewModal)} type='button'>Viết đánh giá</button>
                                            </div>
                                        </div>
                                        <div className='col-md-1'>
                                            <div>{Number(item.DonGia).toLocaleString()}đ</div>
                                        </div>
                                        <div className='col-md-1'>
                                            <div>{item.SoLuong}</div>
                                        </div>
                                        <div className='col-md-3 text-end'>
                                            <h6>{Number(item.DonGia).toLocaleString()}đ</h6><br />
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : null}
                           
                        </div>
                        <hr />
                        <div>
                            <div className='row'>
                                <div className='col-md-10 text-end'>Tạm tính</div>
                                <div className='col-md-2'>{Number(total - 20000)}đ</div>
                            </div>
                            <div className='row'>
                                <div className='col-md-10 text-end'>Phí vận chuyển</div>
                                <div className='col-md-2'>20.000đ</div>
                            </div>
                            <div className='row'>
                                <div className='col-md-10 text-end'>Tổng cộng</div>
                                <h5 className='col-md-2 text-danger'>{Number(total).toLocaleString()}đ</h5>
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