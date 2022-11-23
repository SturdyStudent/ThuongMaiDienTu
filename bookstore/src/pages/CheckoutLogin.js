import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Login from '../components/Login'
import Register from '../components/Register'
import './CheckoutLogin.css'

function CheckoutLogin() {
    const [changeAuthPage, setChangeAuthPage] = useState(false);

    const callbackChangeAuthPage = (e) => {
        e.preventDefault();
        setChangeAuthPage(!changeAuthPage);
    }

    return (
        <div>
            <Header />
            <div className='content-parent mt-5' style={{ minHeight: "30vh" }}>
                <div className='row'>
                    <div hidden={changeAuthPage} className="col-md-6 offset-md-3">
                        <Login callbackChangeRegisterPage={callbackChangeAuthPage} />
                    </div>
                    <div hidden={!changeAuthPage} className="col-md-8 offset-md-2">
                        <Register callbackChangeLoginPage={callbackChangeAuthPage} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CheckoutLogin