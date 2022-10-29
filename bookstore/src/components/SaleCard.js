import React from 'react'
import './SaleCard.css'
import CardPicture from '../assets/cardPicture1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

function SaleCard() {
    return (
        <div className="card" id="SaleCard">
            <div className="card-body" style={{ "width": "100%", "height": "30%", "paddingTop": "3px" }}>
                <h5 className="card-title" style={{ "marginBottom": "0px" }}>Giảm giá cuối năm</h5>
                <p className="card-text" style={{ "marginBottom": "0px" }}>20% giảm giá cho nhiều tựa sách</p>
                <div href="#" style={{ "fontWeight": "600", "paddingTop": "0px" }}>MUA NGAY <span><FontAwesomeIcon icon={faCaretRight} /></span></div>
            </div>
            <div style={{ "width": "100%", "height": "70%" }}>
                <img className="card-img-top" src={CardPicture} alt="Card cap" style={{ "height": "100%", "width": "100%" }} />
            </div>
        </div>
    )
}

export default SaleCard