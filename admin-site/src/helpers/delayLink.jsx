import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function DelayLink({ to, children }) {
    const history = useNavigate();
    const delayAndGo = (e) => {
        e.preventDefault();
        setTimeout(() => history(to), 800);
    }
    return (
        <Link to={to} onClick={delayAndGo} style={{ textDecoration: "none" }}>
            {children}
        </Link>
    )
}

export default DelayLink