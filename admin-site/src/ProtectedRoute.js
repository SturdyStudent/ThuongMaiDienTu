import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import auth from './auth';

function ProtectedRoute() {
    const allowLogin = localStorage.getItem("loggedIn");
    const isTrueSet = (allowLogin === 'true');
    return (auth.isAuthenticated() || isTrueSet) ? <Outlet /> : <Navigate to={'/login'} />
}

export default ProtectedRoute