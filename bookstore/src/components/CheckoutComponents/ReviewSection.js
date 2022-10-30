import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { loadImageUrl } from '../../baseUrl'

function ReviewSection() {
    const shippingInfo = useSelector(state => state.orderState);
    const [items, setItems] = useState();
    useEffect(() => {
        let oldItems = JSON.parse(localStorage.getItem("CART_ITEMS") || "[]");
        setItems(oldItems);
    }, [])

    return (
        <div>
            <h4>SẮP XONG RỒI! HÃY KIỂM TRA LẠI THÔNG TIN ĐẶT HÀNG</h4><br />
            <div className="container">
                <div className="row">
                    <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
                        <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                        <h5>Địa chỉ giao hàng</h5>
                        <div className=" pt-4 mt-4 border-top">
                            <div>{shippingInfo.DiaChiGiao}<span style={{ color: "blue", fontSize: "0.7em" }}></span></div>
                        </div>
                    </blockquote>
                    <blockquote className="blockquote blockquote-custom bg-white mt-4 p-5 shadow rounded">
                        <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                        <h5>Giỏ hàng</h5>
                        <div className=" pt-4 mt-4 border-top">
                            {items && items.map(item =>
                                <div className='row mb-5'>
                                    <div className='col-md-3' >
                                        <div id='book-detail-cover'>
                                            <img src={`${loadImageUrl}/${item.anhBia}`} alt="..." />
                                        </div>
                                    </div>
                                    <div className='offset-1 col-md-6' >
                                        <h4 className='mt-2 fw-bold'>{item.tenSach}</h4>
                                        <div className='mt-2'>x{item.soLuong} cuốn</div>
                                        <div className='mt-2'>{Number(item.tongTien).toLocaleString()} VNĐ</div>
                                        <div className='mt-2'><FontAwesomeIcon icon={faX} /> Loại bỏ</div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </blockquote>
                    <blockquote className="blockquote blockquote-custom bg-white mt-4 p-5 shadow rounded">
                        <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                        <h5>Thông tin liên lạc</h5>
                        <div className=" pt-4 mt-4 border-top">
                            <div>Tên người nhận: <span style={{ color: "blue", fontSize: "1em" }}>{shippingInfo.TenNguoiNhan}</span></div>
                            <div>Số diện thoại người nhận: <span style={{ color: "blue", fontSize: "1em" }}>{shippingInfo.DienThoaiNguoiNhan}</span></div>
                        </div>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default ReviewSection