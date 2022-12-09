import React, { useState, useEffect } from 'react'
import './Header.css'
import { Link, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { actSearchTermState } from '../actions'
import { actLogin } from '../actions';
import { useSelector, useDispatch } from 'react-redux'
import Logo from '../assets/logo.png'
import _ from 'lodash'
import axios from 'axios'
import { baseUrl } from '../baseUrl'
import auth from '../auth'

function Header() {
    const isSupportPage = true;

    let onSelected = true;

    let userNav = <>
        <Link to={'/checkout-login'} style={{ textDecoration: "none", color: "black" }}>
            Đăng nhập
        </Link>
    </>;

    const currentTotalPrice = useSelector(state => state.totalCartPrice);
    const loginState = useSelector(state => state.logginState);

    const dispatch = useDispatch();
    let loginToken = localStorage.getItem("TOKEN");
    console.log("token", loginToken)

    const isLoggedIn = loginState.auth;
    const userId = loginState.id;
    const cartItemFromLocalStore = localStorage.getItem("CART_ITEMS");
    const [cartItems, setCartItems] = useState();
    const [userNavItems, setUserNavItems] = useState('');
    const [userName, setUserName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        console.log("load đê");
        if(loginToken){
            axios.get(`${baseUrl}/clientAuth/isAdminAuth`, {
                headers: {
                    "x-access-token": loginToken
                }
            }).then((res) => {
                if (res.data.auth === true) {
                    dispatch(actLogin(res.data.id));
                    auth.login();
                }
            })
        }
    }, [loginToken])

    useEffect(() => {
        if(userId){
            axios.get(`${baseUrl}/user/${userId}`)
            .then(result => {
                setUserName(result.data.data[0].TaiKhoan);
            })
        }
    }, [userId]);

    useEffect(() => {
        let oldItems = JSON.parse(cartItemFromLocalStore || "[]");
        if (!_.isEqual(oldItems, [])) {
            setCartItems(oldItems.length);
        } else {
            setCartItems();
        }
    }, [cartItemFromLocalStore, currentTotalPrice])

    if (isLoggedIn) {
        userNav = <span onMouseOver={() => handleNavModal()}>Tài khoản <br /><span style={{ "color": "red", textDecoration: "underline" }}>{userName}</span></span>;
    }

    const logoutAccount = () => {
        auth.logout();
        return <Navigate to={'/'} replace/>;
    }

    const handleMoveToAdvanceOption = (e) => {
        e.stopPropagation();
        setSearchTerm('toanbosach');
        dispatch(actSearchTermState('toanbosach'));
    }

    const handleNavModal = () => {
        if (isLoggedIn) {
            setUserNavItems(<div style={{ "position": "absolute", zIndex: "100" }} className='shadow bg-white mt-5 nav-header-modal' onMouseOver={() => { handleNavModal(); onselect = true }} onMouseLeave={() => { onSelected = false; handleRemoveNavModal(); }}>
            <Link to={'/order/history'} style={{ "textDecoration": "none", color: "black" }}>
                <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Đơn hàng của tôi</div>
            </Link>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Quản lí đổi trả</div>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Tài khoản của tôi</div>
            <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Đánh giá sản phẩm</div>
            <Link to={'/'} onClick={() => logoutAccount()}>
                <div className='text-start nav-header-item ps-3 pe-3 pt-2 pb-2'>Đăng xuất</div>
            </Link>
        </div>)
        }
    }

    const handleRemoveNavModal = () => {
        if (!onSelected) {
            setTimeout(() => setUserNavItems(''), 0);
        }
    }

    const handleSearchResult = () => {
        if(searchTerm !== ''){
            
        }
        dispatch(actSearchTermState(searchTerm));
    }

    return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark static-top" id="header-bg">
                <div className="container">
                    <Link className="navbar-brand lg-4" href="/">
                        <img src={Logo} alt="..." height="60" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='col-lg-8' id='header-search-container'>
                        <div className="search">
                            <input type="text" className="form-control" placeholder="Tìm kiếm sách..." onChange={e => setSearchTerm(e.target.value)} />
                            <Link to={"/results"}>
                                <button className="btn" onClick={e => handleSearchResult(e)}> 
                                    <FontAwesomeIcon icon={faSearch} color="white" />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item nav-header-menu" onMouseOver={() => handleNavModal()} onMouseMove={() => handleNavModal()} onMouseLeave={() => handleRemoveNavModal()}>
                                <FontAwesomeIcon icon={faUser} color="red" />
                                <div className="nav-link active pt-0" aria-current="page" style={{ "fontWeight": "bold", "color": "black" }}>{userNav}</div>
                            </li>
                            {userNavItems}
                            <li className="nav-item nav-header-menu">
                                <FontAwesomeIcon icon={faHeart} color="red" />
                                <a className="nav-link active" aria-current="page" href="/#" style={{ "fontWeight": "bold", "color": "black" }}>Whishlist</a>
                            </li>
                            <Link to={"/cart"} style={{ textDecoration: "none" }}>
                                <li className="nav-item nav-header-menu position-relative" >
                                    {cartItems && <div className='rounded-circle bg-success position-absolute fw-bold text-white' style={{ width: "30px", height: "30px", top: -10, right: 0 }}>
                                        {cartItems}
                                    </div>}
                                    <FontAwesomeIcon icon={faCartShopping} color="red" />
                                    <div className="nav-link active mt-0 pt-0" aria-current="page" href="/cart" style={{ "fontWeight": "bold", "color": "black", textDecoration: "none" }}>Giỏ hàng</div>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>
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
                                <li id="menu-item-963" className="nav-item menu-item menu-item-type-post_type menu-item-object-page menu-item-963">
                                    <Link to={"/Categories"} className='nav-link'>
                                        THỂ LOẠI
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
        </div>
    )
}

export default Header