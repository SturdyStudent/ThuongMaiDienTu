import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import auth from './auth'
import { useDispatch } from 'react-redux'
import { actLogin, actLogout } from '../src/actions/index'
import Cookies from 'js-cookie'
import axios from 'axios'
import { baseUrl } from './baseUrl';

function ProtectedRoute() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const dispatch = useDispatch();

    let loginState = localStorage.getItem("IS_LOGGED_IN");
    console.log("login state", loginState);
    const fetchJWT = async () => {
        axios.get( `${baseUrl}/clientAuth/isAdminAuth`, {
            headers: {
                "x-access-token": Cookies.get("token")
            }
        }).then(result => {
          
            
            let allowLogin = (auth.isAuthenticated() && result.data.auth);
            setLoaded(false);
            setIsLoggedIn(allowLogin);
            if (allowLogin === true) {
                dispatch(actLogin(result.data.id));
            } else {
                dispatch(actLogout());
            }
        })
    }
    useEffect(() => {
        fetchJWT();
    }, []);

    return (loaded ? <p>Loading...</p> : (isLoggedIn ? <Outlet /> : <Navigate to={'/checkout-login'} />));
}

export default ProtectedRoute