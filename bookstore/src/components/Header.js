import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/logo.png'
import { Navigate } from 'react-router-dom'

function Header() {
    const isSupportPage = true;
    const isLoggedIn = true;
    let onSelected = true;
    let userNav = <>Đăng nhập</>;
    const [navigate, setNavigate] = useState();
    const [userNavItems, setUserNavItems] = useState('');
    if (isLoggedIn) {
        userNav = <span onMouseOver={() => handleNavModal()}>Tài khoản <br /><span style={{ "color": "red", textDecoration: "underline" }}>Trần Thành Đạt</span></span>;
    }
    if (navigate) {
        return <Navigate to="/results" />
    }
    const handleNavModal = () => {

        setUserNavItems(<div style={{ "position": "absolute" }} className='shadow bg-white mt-5 nav-header-modal' onMouseOver={() => { handleNavModal(); onselect = true }} onMouseLeave={() => { onSelected = false; handleRemoveNavModal(); }}>
            <Link to={'/order/history'} style={{ "textDecoration": "none" }}>
                <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Đơn hàng của tôi</div>
            </Link>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Quản lí đổi trả</div>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Thông báo của tôi</div>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Tài khoản của tôi</div>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Đánh giá sản phẩm</div>
        </div>)
    }
    const handleRemoveNavModal = () => {
        console.log(onSelected);
        if (!onSelected) {
            setTimeout(() => setUserNavItems(''), 1000);
        }
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark static-top" id="header-bg">
                <div class="container">
                    <Link class="navbar-brand lg-4" href="#">
                        <img src={Logo} alt="..." height="60" />
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className='col-lg-8' id='header-search-container'>
                        <div class="search">
                            <input type="text" class="form-control" placeholder="Tìm kiếm sách..." />
                            <button class="btn" onClick={() => setNavigate(true)}> <FontAwesomeIcon icon={faSearch} color="white" /></button>
                        </div>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item nav-header-menu" onMouseOver={() => handleNavModal()} onMouseMove={() => handleNavModal()} onMouseLeave={() => handleRemoveNavModal()}>
                                <FontAwesomeIcon icon={faUser} color="red" />
                                <a class="nav-link active" aria-current="page" href="/#" style={{ "fontWeight": "bold", "color": "black" }}>{userNav}</a>
                            </li>
                            {userNavItems}
                            <li class="nav-item nav-header-menu">
                                <FontAwesomeIcon icon={faHeart} color="red" />
                                <a class="nav-link active" aria-current="page" href="/#" style={{ "fontWeight": "bold", "color": "black" }}>Whishlist</a>
                            </li>
                            <li class="nav-item nav-header-menu">
                                <FontAwesomeIcon icon={faCartShopping} color="red" />
                                <a class="nav-link active" aria-current="page" href="/#" style={{ "fontWeight": "bold", "color": "black" }}>Giỏ hàng</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {isSupportPage && <nav class="navbar navbar-expand-lg navbar-light " id='navbar-container'>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <nav class="navbar navbar-expand" style={{ "width": "100%" }}>
                    <div class="container">
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul id="menu-main-nav" class="navbar-nav nav-fill w-100">
                                <li id="menu-item-42" class="nav-item  menu-item-42"><a href="XXX" class="nav-link">TRANG CHỦ</a></li>
                                <li id="menu-item-963" class="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-963"><a href="XXX" class="nav-link">THỂ LOẠI</a></li>
                                <li id="menu-item-40" class="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-40"><a href="XXX" class="nav-link">MÃ GIẢM GIÁ</a></li>
                                <li id="menu-item-40" class="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-40"><a href="XXX" class="nav-link">THANH TOÁN</a></li>
                                <li id="menu-item-42" class="nav-item  menu-item-42"><a href="XXX" class="nav-link">HỎI ĐÁP SẢN PHẨM</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </nav>}
        </div>
    )
}

export default Header