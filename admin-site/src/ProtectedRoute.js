import React from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import auth from './auth';

function ProtectedRoute() {
    // comment code để login thẳng 
    const allowLogin = localStorage.getItem("loggedIn");
    const isTrueSet = (Boolean(JSON.parse(allowLogin)) === true);
    
    return (auth.isAuthenticated() || isTrueSet) ? <Outlet /> : <Navigate to={'/login'} />
}

export default ProtectedRoute
