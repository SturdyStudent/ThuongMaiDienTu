import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BookSaleBanner from '../assets/BookSale.png'
import CouponComponent from '../components/CouponComponent'
import BrandSale from '../assets/BrandSales.png'
import './CouponPage.css'
import BrandCoupon from './BrandCoupon'

function CouponPage() {
    return (
        <div>
            <Header />
            <div className='parent-body-padding mt-5' style={{ "width": "100%" }}>
                <div>
                    <img src={BookSaleBanner} width='100%' />
                </div>
                <CouponComponent title={"VOUCHER ZALO PAY"} />
                <CouponComponent title={"VOUCHER SHOPPEE SALES"} />
                <div style={{ width: "70%", marginTop: "5vh" }}>
                    <img src={BrandSale} width='100%' />
                </div>
                <div className='coupon-result-holder mt-5'>
                    <BrandCoupon />
                    <BrandCoupon />
                    <BrandCoupon />
                    <BrandCoupon />
                    <BrandCoupon />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CouponPage