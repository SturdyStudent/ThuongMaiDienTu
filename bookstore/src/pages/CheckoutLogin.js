import React from 'react'
import SortResult from '../components/SortResult'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Login from '../components/Login'
import Register from '../components/Register'
import './CheckoutLogin.css'

function CheckoutLogin() {
    return (
        <div>
            <Header />
            <SortResult />
            <div className='content-parent'>
                <div className='row'>
                    <Login />
                    <Register />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CheckoutLogin