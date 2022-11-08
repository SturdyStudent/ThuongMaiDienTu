import React from 'react'
import { Outlet } from 'react-router-dom';
// import auth from './auth';

function ProtectedRoute() {
    // comment code để login thẳng 
    // const allowLogin = localStorage.getItem("loggedIn");
    // const isTrueSet = (allowLogin === 'true');
    // return (auth.isAuthenticated() || isTrueSet) ? <Outlet /> : <Navigate to={'/login'} />

    return <Outlet />
}

export default ProtectedRoute
