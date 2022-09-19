import React from 'react'

function CheckoutCard() {
    return (
        <div class="card text-center card-shadow self-center-div" style={{ width: "18rem", borderRadius: "20px", padding: "10px" }}>
            <div class="card-body ">
                <div className='display-flex space-between' style={{ "borderBottom": "1px solid #DCDCDC	", marginBottom: "5px" }}>
                    <div>Items(Qty)</div>
                    <div><b>$20.00</b></div>
                </div>
                <div className='display-flex space-between' style={{ "borderBottom": "1px solid #DCDCDC	", marginBottom: "5px" }}>
                    <div>Shipping Fee</div>
                    <div><b>$20.00</b></div>
                </div>
                <div className='display-flex space-between' style={{ "borderBottom": "1px solid #DCDCDC	", marginTop: "45px" }}>
                    <h6 class="card-title"><b>TỔNG CỘNG</b></h6>
                    <h6><b>$40.00</b></h6>
                </div>
                <br />
                <button className='btn-detail-service'>LƯU {"&"} TIẾP TỤC</button>
                <h6>Nhập mã giảm giá</h6>
                <div class="input-group card-shadow border-0" style={{ "marginTop": "10px" }}>
                    <input type="search" class="form-control rounded" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" class="btn btn-danger"><b>ÁP DỤNG</b></button>
                </div>
            </div>
        </div >
    )
}

export default CheckoutCard