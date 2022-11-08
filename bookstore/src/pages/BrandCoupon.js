import React from 'react'
import './BrandCoupon.css'
import BrandAvatar from '../assets/brandAvatar.png'

function BrandCoupon() {
    return (
        <div className='brand-coupon-container shadow-lg' style={{ "backgroundColor": "#fef2f4" }}>
            <div className="row">
                <div className=' col-lg-12 display-flex align-items-center'>
                    <div className='rounded-brand-avatar'>
                        <img src={BrandAvatar} width="100%" alt="" height={"100%"} />
                    </div>
                    <h5 className='ms-3'>Honda Hoàng Việt</h5>
                </div>
                <div className='col-md-7' style={{ "color": "#f51c43" }}>
                    <h3>50.000đ</h3>
                    <div><b>Đơn hàng từ 5.000.000đ</b></div>
                </div>
                <div className='col-md-5 collect-btn'>
                    <button>Thu Thập</button>
                </div>
                <div style={{ "color": "#f51c43" }}>Cho toàn gian hàng - Thời gian hiệu lực: 31 thg 8 - 30 thg 9</div>
            </div>

        </div>
    )
}

export default BrandCoupon