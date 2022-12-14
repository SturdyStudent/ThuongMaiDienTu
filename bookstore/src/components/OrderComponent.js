import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { loadImageUrl, baseUrl } from '../baseUrl'
import format from 'date-fns/format'
import vi from 'date-fns/esm/locale/vi/index.js'

function OrderComponent({orderItem, currentDeliveryState, handleEmptyOder}) {
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        if(Number(orderItem.TinhTrangGiaoHang) === currentDeliveryState || Number(currentDeliveryState) === 5){
            axios.get(`${baseUrl}/orderDetail/${orderItem.MaDonHang}`)
            .then(results => {
                setOrderDetails(results.data.data);
            })
            handleEmptyOder(false);
        }
    }, [orderItem, currentDeliveryState, handleEmptyOder]);


    return (
        <div>
            {(Number(orderItem.TinhTrangGiaoHang) === currentDeliveryState || Number(currentDeliveryState) === 5) 
            ?
            <blockquote className="blockquote blockquote-custom bg-white mt-4 p-4 shadow rounded">
                <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                <h5 className='text-start' style={{ color: "#838189" }}> Đơn hàng #{orderItem.MaDonHang} ( Giao vào {format(new Date(orderItem.NgayGiao), "iii, dd 'Tháng' MM yyyy",{
                    locale: vi
                })} )</h5>
                {orderDetails ? orderDetails.map((item, index) => {
                    return (
                        <div className=" pt-4 mt-4 border-top" key={index}>
                            <div className='row'>
                                <div className='col-md-2' >
                                    <div id='book-detail-cover-history'>
                                        <img src={`${loadImageUrl}/${item.AnhBia}`} alt="..." />
                                    </div>
                                </div>
                                <div className='col-md-4 text-start' >
                                    <h6 className='mt-2'>{item.TenSach} ({item.TenTacGia})</h6>
                                </div>
                                <div className='col-md-3 text-start' >
                                    <h6 className='mt-2'>Số lượng: {item.SoLuong}</h6>
                                </div>
                                <div className='col-md-3 text-end'>
                                    <h5>{Number(item.DonGia).toLocaleString()}đ</h5><br />
                                    <Link to={'/order/view/'} state={{id: orderItem.MaDonHang}} style={{ "textDecoration": "none" }}>
                                        <button type='button' className=' border-0 btn btn-primary'>Xem chi tiết</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }) 
                :     
                null}
                <hr />
                <div className='text-end fw-bold'>
                    Tổng tiền: {Number(orderItem.ThanhTien).toLocaleString()}đ
                </div>
            </blockquote> 
            :  
            null
        }
        </div>   
    )
}

export default OrderComponent