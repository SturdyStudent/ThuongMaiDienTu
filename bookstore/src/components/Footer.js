import React from 'react'
import './Footer.css'
import Share from '../assets/share.png'
import Logo from '../assets/logo.png'

function Footer() {
    return (
        <div>
            <div id='added-transparent'></div>
            <div id='footer-container'>
                <div>
                    <img src={Logo} alt='...' /> <br />
                    <img src={Share} alt='...' style={{ "marginTop": "2vh" }} />
                </div>
                <div>
                    <ul>
                        <li><h4>TRỢ GIÚP</h4></li>
                        <li>Contact Us</li>
                        <li>Diễn đàn</li>
                        <li>Bảo đảm</li>
                        <li>Vận chuyển</li>
                        <li>Store Pickup</li>
                        <li>Điều khoản</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li><h4>KHÁM PHÁ</h4></li>
                        <li>Về chúng tôi</li>
                        <li>Tuyển dụng</li>
                        <li>Địa điểm cửa hàng</li>
                        <li>Sự kiện</li>
                        <li>Thẻ quà tặng</li>
                        <li>Sitemap</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li><h4>TÀI KHOẢN</h4></li>
                        <li>Tài khoản của tôi</li>
                        <li>Sách cũ</li>
                        <li>Thông báo</li>
                        <li>Wish List</li>
                        <li>Đối tác</li>
                        <li>Bảo mật</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer