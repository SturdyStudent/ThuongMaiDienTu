import React from 'react'
import './SaleCard.css'
import CardPicture from '../assets/cardPicture1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

function SaleCard() {
    return (
        <div class="card" id="SaleCard">
            <div class="card-body" style={{ "width": "100%", "height": "30%", "paddingTop": "3px" }}>
                <h5 class="card-title" style={{ "marginBottom": "0px" }}>Spring Sale</h5>
                <p class="card-text" style={{ "marginBottom": "0px" }}>20% off select book</p>
                <div href="#" style={{ "fontWeight": "600", "paddingTop": "0px" }}>SHOP NOW <span><FontAwesomeIcon icon={faCaretRight} /></span></div>
            </div>
            <div style={{ "width": "100%", "height": "70%" }}>
                <img class="card-img-top" src={CardPicture} alt="Card cap" style={{ "height": "100%", "width": "100%" }} />
            </div>
        </div>
    )
}

export default SaleCard