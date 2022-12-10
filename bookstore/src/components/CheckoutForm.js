import { PaymentElement } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { actNotificationSetState } from './../actions/index'
import { baseUrl } from '../baseUrl';
import {Navigate} from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns/esm';
import _ from 'lodash';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [userId, setUserId] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();
    const [redirect, setRedirect] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const shippingInfo = useSelector(state => state.orderState);
    let currentTotalPrice = useSelector(state => state.totalCartPrice);
    const clientInfo = JSON.parse(localStorage.getItem('LOGIN_INFORMATION'));
    const orderDetails = JSON.parse(localStorage.getItem('CART_ITEMS'));
    
    const oldItems = JSON.parse(localStorage.getItem("CART_ITEMS") || "[]");

    useEffect(() => {
        let total = 0;
        _.forEach(oldItems, (item) => {
            setTotalPrice(total += item.tongTien);
        })
    }, [oldItems, currentTotalPrice])

    useEffect(() => {
        axios.post(`${baseUrl}/user/getUserByEmail`, {
            Email: clientInfo.data.Email
        }).then(result => {
            setUserId(result.data.data[0].MaKH);
        })
    },[])

    if(redirect){
        return <Navigate to={'/order/view'} replace/>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        setIsLoading(true);
        console.log({
            "DaThanhToan": 1,
            "TinhTrangGiaoHang": 1,
            "NgayDat": format(new Date(), 'yyyy-MM-dd'),
            "MaKH": userId,
            "TenNguoiNhan": shippingInfo.TenNguoiNhan,
            "DienThoaiNguoiNhan": shippingInfo.DienThoaiNguoiNhan,
            "DiaChiGiao": shippingInfo.DiaChiGiao,
            "HinhThucThanhToan": "Thanh toán bằng thẻ",
            "HinhThucGiaoHang": "Giao thông thường",
            "IDVoucher": 1,
            "ThanhTien": totalPrice,
            "MaNV":1,
            "ChitietDH": JSON.stringify(orderDetails)
        })
        
        axios.post(`${baseUrl}/order/create`, {
            "DaThanhToan": 1,
            "TinhTrangGiaoHang": 1,
            "NgayDat": format(new Date(), 'yyyy-MM-dd'),
            "MaKH": userId,
            "TenNguoiNhan": shippingInfo.TenNguoiNhan,
            "DienThoaiNguoiNhan": shippingInfo.DienThoaiNguoiNhan,
            "DiaChiGiao": shippingInfo.DiaChiGiao,
            "HinhThucThanhToan": "Thanh toán bằng thẻ",
            "HinhThucGiaoHang": "Giao thông thường",
            "IDVoucher": 1,
            "ThanhTien": totalPrice,
            "MaNV": 1,
            "ChitietDH": JSON.stringify(orderDetails)
        }).then(result => {
            localStorage.setItem('ORDER_ID', result.data.data[0].MaDonHang);
        })

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost/order/view/"
            }
        }).then();

   
     
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
            dispatch(actNotificationSetState({
                notification: "error"
            }))
        } else {
            setMessage("Xảy ra lỗi trong lúc xử lí.");
        }

        setIsLoading(false);
    };
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} className="btn btn-primary mt-4" id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Thanh toán ngay"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}