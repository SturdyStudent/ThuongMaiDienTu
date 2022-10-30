import React, { useState, useEffect } from 'react'
import { actChangeToPaymentSection, actChangeToReviewSection, actChangeToShippingSection } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

function CheckoutCard() {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [applyVoucher, setApplyVoucher] = useState(false);
    const [placeOrder, setPlaceOrder] = useState(true);
    const [prevSection, setPrevSection] = useState(false);

    const currentSection = useSelector(state => state.currentCheckoutSection);
    const currentAllowNext = useSelector(state => state.allowNext);

    useEffect(() => {
        let oldItems = JSON.parse(localStorage.getItem("CART_ITEMS") || "[]");
        let total = 0;
        _.forEach(oldItems, (item) => {
            setTotalPrice(total += item.tongTien);
        })
    }, [])

    const handleChangeNextSection = () => {
        if (currentSection === 0 && currentAllowNext) {
            dispatch(actChangeToPaymentSection());
            setPlaceOrder(true);
            setApplyVoucher(true);
            setPrevSection(true);
        } else if (currentSection === 1) {
            dispatch(actChangeToReviewSection());
            setPlaceOrder(false);
            setApplyVoucher(true)
            setPrevSection(true)
        } else if (currentSection === 2) {
            alert("đặt hàng thành công");
            setPrevSection(true)
        }
    }

    const handleChangePrevSection = () => {
        if (currentSection === 2) {
            dispatch(actChangeToPaymentSection());
            setPlaceOrder(true);
            setApplyVoucher(true);
            setPrevSection(true);
        } else if (currentSection === 1) {
            setPlaceOrder(true);
            setApplyVoucher(false)
            setPrevSection(false)
            dispatch(actChangeToShippingSection());
        }
    }

    return (
        <div className="card text-center card-shadow self-center-div" style={{ width: "18rem", borderRadius: "20px", padding: "10px" }}>
            <div className="card-body ">
                <div className='display-flex space-between' style={{ "borderBottom": "1px solid #DCDCDC	", marginBottom: "5px" }}>
                    <div>Tiền hàng</div>
                    <div><b>{Number(totalPrice).toLocaleString()} VNĐ</b></div>
                </div>
                <div className='display-flex space-between' style={{ "borderBottom": "1px solid #DCDCDC	", marginBottom: "5px" }}>
                    <div>Shipping Fee</div>
                    <div><b>20.000VNĐ</b></div>
                </div>
                <div className='display-flex space-between' style={{ "borderBottom": "1px solid #DCDCDC	", marginTop: "45px" }}>
                    <h6 className="card-title"><b>TỔNG CỘNG</b></h6>
                    <h6><b>{Number(totalPrice + 20000).toLocaleString()}VNĐ</b></h6>
                </div>
                <br />
                {placeOrder ? <button className='btn-detail-service' onClick={handleChangeNextSection} >LƯU {"&"} TIẾP TỤC</button> : null}
                {prevSection &&
                    <div>
                        <div>Hoặc</div>
                        <button className='btn-detail-service' style={{ backgroundColor: "green" }} onClick={handleChangePrevSection} >QUAY LẠI</button>
                    </div>
                }

                {applyVoucher && <><h6>Nhập mã giảm giá</h6>
                    <div className="input-group card-shadow border-0" style={{ "marginTop": "10px" }}>
                        <input type="search" className="form-control rounded" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" className="btn btn-danger"><b>ÁP DỤNG</b></button>
                    </div>
                </>}
            </div>
        </div >
    )
}

export default CheckoutCard