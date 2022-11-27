import React, { useState, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import {Container, Row, Col} from 'react-bootstrap'
import Logo from '../assets/logo.png'
import _ from 'lodash'
import Categories from "./Categories"
import {IoCaretUpOutline} from "react-icons/io5"

function Header() {
    const isSupportPage = true;
    const isLoggedIn = true;
    let onSelected = true;
    let userNav = <>Đăng nhập</>;
    const [showCate,setStateCate]=useState(false);
    const cartItemFromLocalStore = localStorage.getItem("CART_ITEMS");
    const [cartItems, setCartItems] = useState();
    const [userNavItems, setUserNavItems] = useState('');

    useEffect(() => {
        let oldItems = JSON.parse(cartItemFromLocalStore || "[]");
        if (!_.isEqual(oldItems, [])) {
            setCartItems(oldItems.length);
        } else {
            setCartItems();
        }
    }, [cartItemFromLocalStore])

    if (isLoggedIn) {
        userNav = <span onMouseOver={() => handleNavModal()}>Tài khoản <br /><span style={{ "color": "red", textDecoration: "underline" }}>Trần Thành Đạt</span></span>;
    }
    const handleNavModal = () => {

        setUserNavItems(<div style={{ "position": "absolute", zIndex: "100" }} className='shadow bg-white mt-5 nav-header-modal' onMouseOver={() => { handleNavModal(); onselect = true }} onMouseLeave={() => { onSelected = false; handleRemoveNavModal(); }}>
            <Link to={'/order/history'} style={{ "textDecoration": "none", color: "black" }}>
                <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Đơn hàng của tôi</div>
            </Link>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Quản lí đổi trả</div>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Thông báo của tôi</div>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Tài khoản của tôi</div>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Đánh giá sản phẩm</div>
        </div>)
    }
    const handleRemoveNavModal = () => {
        if (!onSelected) {
            setTimeout(() => setUserNavItems(''), 0);
        }
    }
    return (
        // <div>
        //     <nav className="navbar navbar-expand-lg navbar-dark static-top" id="header-bg">
        //         <div className="container">
        //             <Link className="navbar-brand lg-4" href="/">
        //                 <img src={Logo} alt="..." height="60" />
        //             </Link>
        //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //                 <span className="navbar-toggler-icon"></span>
        //             </button>
        //             <div className='col-lg-8' id='header-search-container'>
        //                 <div className="search">
        //                     <input type="text" className="form-control" placeholder="Tìm kiếm sách..." />
        //                     <Link to={"/results"}>
        //                         <button className="btn"> <FontAwesomeIcon icon={faSearch} color="white" /></button>
        //                     </Link>
        //                 </div>
        //             </div>
        //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //                 <ul className="navbar-nav ms-auto">
        //                     <li className="nav-item nav-header-menu" onMouseOver={() => handleNavModal()} onMouseMove={() => handleNavModal()} onMouseLeave={() => handleRemoveNavModal()}>
        //                         <FontAwesomeIcon icon={faUser} color="red" />
        //                         <a className="nav-link active" aria-current="page" href="/#" style={{ "fontWeight": "bold", "color": "black" }}>{userNav}</a>
        //                     </li>
        //                     {userNavItems}
        //                     <li className="nav-item nav-header-menu">
        //                         <FontAwesomeIcon icon={faHeart} color="red" />
        //                         <a className="nav-link active" aria-current="page" href="/#" style={{ "fontWeight": "bold", "color": "black" }}>Whishlist</a>
        //                     </li>
        //                     <Link to={"/cart"} style={{ textDecoration: "none" }}>
        //                         <li className="nav-item nav-header-menu position-relative" >
        //                             {cartItems && <div className='rounded-circle bg-success position-absolute fw-bold text-white' style={{ width: "30px", height: "30px", top: -10, right: 0 }}>
        //                                 {cartItems}
        //                             </div>}
        //                             <FontAwesomeIcon icon={faCartShopping} color="red" />
        //                             <div className="nav-link active mt-0 pt-0" aria-current="page" href="/cart" style={{ "fontWeight": "bold", "color": "black", textDecoration: "none" }}>Giỏ hàng</div>
        //                         </li>
        //                     </Link>
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        //     {isSupportPage && <nav className="navbar navbar-expand-lg navbar-light " id='navbar-container'>
        //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <nav className="navbar navbar-expand" style={{ "width": "100%" }}>
        //             <div className="container">
        //                 <div className="collapse navbar-collapse" id="navbarNav">
        //                     <div id="menu-main-nav" className="navbar-nav nav-fill w-100">
        //                         <li id="menu-item-42" className="nav-item  menu-item-42">
        //                             <Link to={"/"} className='nav-link'>
        //                                 TRANG CHỦ
        //                             </Link>
        //                         </li>
        //                         <div className="category">
        //                         <li id="menu-item-963" className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-963" onMouseEnter={()=>setStateCate(true)} onMouseLeave={()=>setStateCate(false)}>
        //                             <Link to={"/Categories"} className='nav-link'>
        //                                 THỂ LOẠI
        //                             </Link>
        //                             {showCate?<Categories/>: null}
        //                         </li>
        //                         </div>
        //                         <li id="menu-item-40" className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-40">
        //                             <Link to={"/coupons"} className='nav-link'>
        //                                 MÃ GIẢM GIÁ
        //                             </Link>
        //                         </li>
        //                         <li id="menu-item-40" className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-40">
        //                             <Link to={"/cart"} className='nav-link'>
        //                                 THANH TOÁN
        //                             </Link>
        //                         </li>
        //                         <li id="menu-item-42" className="nav-item  menu-item-42">
        //                             <Link to={"/faqs"} className='nav-link'>
        //                                 HỎI ĐÁP SẢN PHẨM
        //                             </Link>
        //                         </li>
        //                     </div>
        //                 </div>
        //             </div>
        //         </nav>
                
        //     </nav>}
        // </div>
        <div>
            <Container fluid>
                <Row>
                    <Col xs={2} md={2} lg={2}>
                        <Link to={"/"}>
                            <img src={Logo} alt="..." height="60" />
                        </Link>
                    </Col>
                    <Col xs={6} md={6} lg={6}>
                    <div id='header-search-container'>
                         <div className="search">
                             <input type="text" className="form-control" placeholder="Tìm kiếm sách..." />
                             <Link to={"/results"}>
                               <button className="btn"> <FontAwesomeIcon icon={faSearch} color="white" /></button>
                            </Link>
                        </div>
                    </div>
                    </Col>
                    <Col xs={4} md={4} lg={4}>
                        <Row>
                            <Col>
                                <FontAwesomeIcon icon={faUser} color="red" />
                                <a className="nav-link active" aria-current="page" href="/#" style={{ "fontWeight": "bold", "color": "black" }}>{userNav}</a>
                                {userNavItems}
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faHeart} color="red" />
                                <a className="nav-link active" aria-current="page" href="/#" style={{ "fontWeight": "bold", "color": "black" }}>Whishlist</a>
                            </Col>
                            <Link to={"/cart"} style={{ textDecoration: "none" }}>
                                <li className="nav-item nav-header-menu position-relative" >
                                    {cartItems && <div className='rounded-circle bg-success position-absolute fw-bold text-white' style={{ width: "30px", height: "30px", top: -10, right: 0 }}>
                                        {cartItems}
                                    </div>}
                                    <FontAwesomeIcon icon={faCartShopping} color="red" />
                                    <div className="nav-link active mt-0 pt-0" aria-current="page" href="/cart" style={{ "fontWeight": "bold", "color": "black", textDecoration: "none" }}>Giỏ hàng</div>
                                </li>
                            </Link>

                        </Row>
                    </Col>
                </Row>
            </Container>
            {isSupportPage && <nav className="navbar navbar-expand-lg navbar-light " id='navbar-container'>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <nav className="navbar navbar-expand" style={{ "width": "100%" }}>
                    <div className="container">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div id="menu-main-nav" className="navbar-nav nav-fill w-100">
                                <li id="menu-item-42" className="nav-item  menu-item-42">
                                    <Link to={"/"} className='nav-link'>
                                        TRANG CHỦ
                                    </Link>
                                </li>
                                <div className="category">
                                <li id="menu-item-963" className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-963" onMouseEnter={()=>setStateCate(true)} onMouseLeave={()=>setStateCate(false)}>
                                    
                                    <Link to={"/Categories"} className='nav-link'>
                                        THỂ LOẠI <IoCaretUpOutline></IoCaretUpOutline>
                                    </Link>
                                    
                                </li>
                                </div>
                               
                                <li id="menu-item-40" className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-40">
                                    <Link to={"/coupons"} className='nav-link'>
                                        MÃ GIẢM GIÁ
                                    </Link>
                                </li>
                                <li id="menu-item-40" className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-40">
                                    <Link to={"/cart"} className='nav-link'>
                                        THANH TOÁN
                                    </Link>
                                </li>
                                <li id="menu-item-42" className="nav-item  menu-item-42">
                                    <Link to={"/faqs"} className='nav-link'>
                                        HỎI ĐÁP SẢN PHẨM
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </nav>
                
            </nav>}
            {/* category */}
            {showCate?<Categories></Categories>: null}
        </div>
    )
}

export default Header