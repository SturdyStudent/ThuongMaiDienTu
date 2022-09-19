import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './ProductFAQ.css'
import { faArrowsRotate, faHome, faTags, faTruck, faUsers, faWallet } from '@fortawesome/free-solid-svg-icons'
import FaqNav from '../components/FaqNav'

function ProductFAQ() {
    const faqObjects = [{
        icon: faHome,
        title: 'Mua sắm cùng Powell',
        subTitles: ['Chương trình khuyến mãi',
            'Người dùng mới',
            'Thao tác',
            'Khám phá',
            'Thanh toán đơn hàng',
            'Phổ biến']
    }, {
        icon: faTags,
        title: 'Khuyến mãi và ưu đãi',
        subTitles: ['Chương trình khuyến mãi',
            'Người dùng mới',
            'Thao tác',
            'Khám phá',
            'Thanh toán đơn hàng',
            'Phổ biến']
    }, {
        icon: faWallet,
        title: 'Thanh toán',
        subTitles: ['Chương trình khuyến mãi',
            'Người dùng mới',
            'Thao tác',
            'Khám phá',
            'Thanh toán đơn hàng',
            'Phổ biến']
    }, {
        icon: faTruck,
        title: 'Đơn hàng và vận chuyển',
        subTitles: ['Chương trình khuyến mãi',
            'Người dùng mới',
            'Thao tác',
            'Khám phá',
            'Thanh toán đơn hàng',
            'Phổ biến']
    }, {
        icon: faArrowsRotate,
        title: 'Trả hàng và hoàn tiền',
        subTitles: ['Chương trình khuyến mãi',
            'Người dùng mới',
            'Thao tác',
            'Khám phá',
            'Thanh toán đơn hàng',
            'Phổ biến']
    }, {
        icon: faUsers,
        title: 'Người bán và đối tác',
        subTitles: ['Chương trình khuyến mãi',
            'Người dùng mới',
            'Thao tác',
            'Khám phá',
            'Thanh toán đơn hàng',
            'Phổ biến']
    }]
    return (
        <>
            <Header />
            <div className='parent-body-padding'>
                <div className='pt-4'>
                    <h3 style={{ "color": "#da3c26" }}><b>XIN CHÀO, POWELL CÓ THỂ GIÚP GÌ CHO BẠN?</b></h3>
                </div>
                <hr style={{ "height": "4px", color: "black", 'border': "2px solid black" }} />
                <div className="d-flex row mt-4" id="wrapper">
                    <div className="border-end border-0 col-md-3" id="sidebar-wrapper">
                        <div className="list-group list-group-flush">
                            {faqObjects.map((faqObject, index) => <FaqNav key={index} faqObject={faqObject} />)}
                        </div>
                    </div>
                    <div id="page-content-wrapper" className='col-md-8'>
                        <h2>Mua sắm cùng Powell</h2>
                        <div className='faq-list'>
                            <h3 className="item___3laL-">[Chat] Hướng dẫn Chat/Nhắn tin với Người bán trên Powell?</h3>
                            <h3 className="item___3laL-">[Tài khoản ngân hàng] Hướng dẫn cập nhật/bổ sung thông tin</h3>
                            <h3 className="item___3laL-">Tại Sao Tôi Không Thể Chat/Nhắn Tin Với Shop?</h3>
                            <h3 className="item___3laL-">Hướng Dẫn Thay Đổi Mã PIN (Mật Khẩu) Số Dư TK Powell</h3>
                            <h3 className="item___3laL-">[Powell Xu] Tổng hợp về tính năng tặng/nhận Xu qua Powell Chat?</h3>
                            <h3 className="item___3laL-">[Trò chuyện với Powell] Cách kiểm tra lịch sử nhắn tin</h3>
                            <h3 className="item___3laL-">Tôi Không Muốn Nhận Tin Nhắn Quảng Cáo Của Shop</h3>
                            <h3 className="item___3laL-">[Thao tác] Tôi có thể gửi tặng/nhận Powell Xu được không?</h3>
                            <h3 className="item___3laL-">[PowellPay] Tôi cần làm gì để  kích hoạt / mở lại tài khoản Ví PowellPay đã bị tạm ngưng dịch vụ?</h3>
                            <h3 className="item___3laL-">Tôi Muốn Mua Hàng Trong Lúc Xem Livestream</h3>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default ProductFAQ