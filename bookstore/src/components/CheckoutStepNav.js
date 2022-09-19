import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function CheckoutStepNav() {
    const thispage = 2;
    let style1 = { color: "#e2ddd1" };
    let style2 = { color: "#e2ddd1" };
    let style3 = { color: "#e2ddd1" };
    if (thispage === 2) {
        style3 = { color: "black" };
    } else if (thispage === 1) {
        console.log("style2")
        style2 = { color: "black" };
    } else {
        style1 = { color: "black" };
    }

    return (
        <div className='checkout-step-nav'>
            <div style={style1}><h6>THÔNG TIN VẬN CHUYỂN</h6></div>
            <div className='display-flex'>
                <div style={style2}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div style={style2}><h6>THANH TOÁN</h6></div>
            </div>
            <div className='display-flex'>
                <div style={style3}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div style={style3}><h6>REVIEW {'&'} ĐẶT HÀNG</h6></div>
            </div>
        </div>
    )
}

export default CheckoutStepNav