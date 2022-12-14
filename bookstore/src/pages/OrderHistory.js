import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import ResultNotFound from '../assets/resultNotFound.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import './OrderHistory.css'
import { baseUrl } from '../baseUrl'
import OrderComponent from '../components/OrderComponent'
import auth from '../auth'

function OrderHistory() {
    const [userId, setUserId] = useState();
    const [orders, setOrders] = useState([]);
    const [isEmptyOrder, setIsEmptyOrder] = useState(false);

    const values = [
        { id: 5, text: "Tất cả đơn" },
        { id: 0, text: "Đã hủy" },
        { id: 1, text: "Đã thanh toán" },
        { id: 2, text: "Đã xét duyệt" },
        { id: 3, text: "Đang giao" },
        { id: 4, text: "Giao thành công" }
    ];

    const [activeId, setActiveId] = useState(5);
    const handleEmptyOder = (isEmptyOrder) => {
        setIsEmptyOrder(isEmptyOrder);
    }

    let loginToken = localStorage.getItem("TOKEN");

    useEffect(() => {
        if(loginToken){
            axios.get(`${baseUrl}/clientAuth/isAdminAuth`, {
                headers: {
                    "x-access-token": loginToken
                }
            }).then((res) => {
                if (res.data.auth === true) {
                    setUserId(res.data.id);
                }else{
                    localStorage.removeItem("TOKEN");
                    auth.logout();
                    return <Navigate to={'/'} replace/>;

                }
            })
        }
    }, [loginToken])

    useEffect(() => {
        if(userId !== undefined){
            axios.get(`${baseUrl}/order/user/${userId}`)
            .then((result) => {
                setOrders(result.data.data);
            })
        }
    }, [userId])

    return (
        <>
            <Header />
                <div style={{minHeight:"40vh"}}>
                    <div className='order-body-padding'>
                        <blockquote className=" bg-white mt-4 shadow rounded">
                            <nav className="navbar navbar-expand-lg navbar-light" style={{ "padding": "0px" }}>
                                <div className="navbar-nav d-flex col-md-12 row order-history-nav m-0">
                                    {values.map((value) => {
                                        return (
                                            <div key={value.id} className={(value.id === activeId) ? 'nav-item-history col-md-2 pt-1 pb-1  border-bottom border-primary border-2 text-primary' : 'nav-item-history acive col-md-2 pt-1 pb-1'} onClick={() => {setActiveId(value.id); handleEmptyOder(true);}}>
                                                <a className={(value.id === activeId) ? 'nav-link text-primary' : 'nav-link'} href="/#" onClick={(e) => { e.preventDefault() }}>{value.text}</a>
                                            </div>)
                                    })}
                                </div>
                            </nav>
                        </blockquote>
                    </div>
                    <div className='order-body-padding'>
                        <blockquote className="blockquote blockquote-custom bg-white mt-4 p-4 shadow rounded">
                            <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                            <h5 className='text-start' style={{ color: "#838189" }}><FontAwesomeIcon icon={faTruck} color={'#838189'} />&nbsp; {
                                (activeId === 5) ? 'Tất cả đơn hàng' :
                                (activeId === 0) ? 'Đơn hàng bị hủy' :
                                (activeId === 1) ? 'Đơn hàng đã thanh toán' :
                                (activeId === 2) ? 'Đơn hàng đã duyệt' :
                                (activeId === 3) ? 'Đơn hàng đang giao' :
                                (activeId === 4) ? 'Đơn hàng giao thành công' : null
                            }</h5>
                        </blockquote>
                    </div>
                    <div className='order-body-padding'>
                    
                        {
                            ((orders).length !== 0) ? 
                            orders.map((item, index) => {
                                return (
                                    <OrderComponent orderItem={item} key={index} handleEmptyOder={handleEmptyOder} currentDeliveryState={activeId} />
                                )
                            })
                            : 
                            null
                        }
                        {
                            <blockquote hidden={!isEmptyOrder} className="blockquote blockquote-custom bg-white mt-4 p-4 shadow rounded">
                                <img src={ResultNotFound} />
                                <div className='text-lg'>Chưa có đơn hàng</div>
                            </blockquote>
                        }
                    </div>
                </div>
            <Footer />
        </>

    )
}

export default OrderHistory