import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CartDisplay from '../components/CartDisplay'
import SortResult from '../components/SortResult'
import './ShopingCart.css'

function ShopingCart() {
    return (
        <div>
            <Header />
            <div style={{ "minHeight": "60vh" }} className="row justify-content-center">
                <SortResult isListingPage={false} />
                <CartDisplay />
                <hr className='col-md-6' style={{ "marginTop": "5vh" }} />

            </div>
            <div id='proceed-checkout-parent'>
                <div id='proceed-checkout-container'>
                    <h5 style={{ fontWeight: "500" }}>Tổng cộng &nbsp; <b>$20.00</b></h5>
                    <br />
                    <button id='checkout-btn'><b>CHUYỂN ĐẾN trang CHECKOUT</b> </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ShopingCart