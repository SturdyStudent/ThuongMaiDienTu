import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Cover from '../assets/bookCover.png'
import { Link } from 'react-router-dom'
// import ResultNotFound from '../assets/resultNotFound.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import './OrderHistory.css'

function OrderHistory() {
    const values = [
        { id: 'history-nav-1', text: "Tất cả đơn" },
        { id: 'history-nav-2', text: "Chờ thanh toán" },
        { id: 'history-nav-3', text: "Đang xử lí" },
        { id: 'history-nav-4', text: "Đang vận chuyển" },
        { id: 'history-nav-5', text: "Đã giao" },
        { id: 'history-nav-6', text: "Đã hủy" }
    ];
    const [activeId, setActiveId] = useState('history-nav-1');
    // const resultNone = <blockquote class="blockquote blockquote-custom bg-white mt-4 p-4 shadow rounded">
    //     <img src={ResultNotFound} />
    //     <div className='text-lg'>Chưa có đơn hàng</div></blockquote>
    return (
        <>
            <Header />
            <div className='parent-body-padding'>
                <blockquote class=" bg-white mt-4 shadow rounded">
                    <nav class="navbar navbar-expand-lg navbar-light" style={{ "padding": "0px" }}>
                        <div class="navbar-nav d-flex col-md-12 row order-history-nav m-0">
                            {values.map((value) => {
                                return (
                                    <div className={(value.id === activeId) ? 'nav-item-history col-md-2 pt-1 pb-1  border-bottom border-primary border-2 text-primary' : 'nav-item-history acive col-md-2 pt-1 pb-1'} onClick={() => setActiveId(value.id)}>
                                        <a class={(value.id === activeId) ? 'nav-link text-primary' : 'nav-link'} href="/#" onClick={(e) => { e.preventDefault() }}>{value.text}</a>
                                    </div>)
                            })}
                        </div>
                    </nav>
                </blockquote>
            </div>
            <div className='parent-body-padding'>
                <blockquote class="blockquote blockquote-custom bg-white mt-4 p-4 shadow rounded">
                    <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                    <h5 className='text-start' style={{ color: "#838189" }}><FontAwesomeIcon icon={faTruck} color={'#838189'} />&nbsp; Giao hàng thành công</h5>
                    <div class=" pt-4 mt-4 border-top">
                        <div className='row'>
                            <div className='col-md-2' >
                                <div id='book-detail-cover-history'>
                                    <img src={Cover} alt="..." />
                                </div>
                            </div>
                            <div className='col-md-7 text-start' >
                                <h6 className='mt-2'>THE OUTSIDER</h6>
                                <div className='mt-2'>x1</div>
                            </div>
                            <div className='col-md-3 text-end'>
                                <h5>62.000đ</h5><br />
                                <Link to={'/order/view'} style={{ "textDecoration": "none" }}>
                                    <button type='button' className=' border-0 btn btn-primary'>Xem chi tiết</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='text-end fw-bold'>
                        Tổng tiền: 49.000đ
                    </div>
                </blockquote>
            </div>
            <Footer />
        </>

    )
}

export default OrderHistory