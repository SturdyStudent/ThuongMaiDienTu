import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CartDisplay from '../components/CartDisplay'
import SortResult from '../components/SortResult'
import { Link } from 'react-router-dom'
import './ShopingCart.css'
import _ from 'lodash'

function ShopingCart() {
    const [items, setItems] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [nune, setNune] = useState();

    let callBackHandler = (val) => {
        setNune(val);
    }

    useEffect(() => {
        let oldItems = JSON.parse(localStorage.getItem("CART_ITEMS") || "[]");
        setItems(oldItems);
        let total = 0;
        _.forEach(oldItems, (item) => {
            setTotalPrice(total += item.tongTien);
        })
    }, [nune])

    return (
        <div>
            <Header />
            <div style={{ minHeight: "30vh" }}>
                {
                    (!_.isEqual(items, [])) ?
                        <>
                            <div style={{ "minHeight": "60vh" }} className="row justify-content-center">
                                <SortResult isListingPage={false} />
                                {
                                    items && items.map((item) => {
                                        return (
                                            <CartDisplay callback={callBackHandler} key={item.idSach} item={item} />
                                        )
                                    })
                                }
                            </div>
                            <div id='proceed-checkout-parent'>
                                <div id='proceed-checkout-container'>
                                    <h5 style={{ fontWeight: "500" }}>Tổng cộng &nbsp; <b>{totalPrice ? Number(totalPrice).toLocaleString() : 0} VNĐ</b></h5>
                                    <br />
                                    <div hidden="true">{nune}</div>
                                    <Link to={"/checkout"}>
                                        <button id='checkout-btn' ><b>CHUYỂN ĐẾN trang CHECKOUT</b> </button>
                                    </Link>

                                </div>
                            </div>
                        </> : <h3 className='mt-4'>Hiện không có hàng hóa nào trong giỏ</h3>
                }
            </div>
            <Footer />
        </div>
    )
}

export default ShopingCart