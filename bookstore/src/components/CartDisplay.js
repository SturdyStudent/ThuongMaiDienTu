import React from 'react'
import Cover from '../assets/bookCover.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faX } from '@fortawesome/free-solid-svg-icons'
import './CartDisplay.css'

function CartDisplay() {
    return (
        <div className='cart-display-parent'>
            <div className='row cart-display-parent justify-content-center'>
                <div className='col-md-2 offset'>
                    <div style={{ textAlign: "left" }}>
                        <button id="btn-remove-item"><FontAwesomeIcon icon={faX} /></button>
                    </div>
                    <div id='cart-display-cover'>
                        <img src={Cover} alt="..." />
                    </div>
                </div>
                <div className='col-md-4 cart-display-detail'>
                    <h4>THE OUTSIDER</h4>
                    <br />
                    <div style={{ "fontWeight": "600" }}>STEPHEN KING</div>
                </div>
                <div className='col-md-3'>
                    <div style={{ "display": "flex" }} className="cart-display-quantity">
                        <div>Số lượng: &nbsp;</div>

                        <div class="input-group input-cart-quantity" style={{ "display": "flex" }}>
                            <span class="input-group-btn">
                                <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus" data-field="">
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </span>
                            <input type="text" id="quantity" name="quantity" class="form-control input-number" value="10" min="1" max="100" />
                            <span className="input-group-btn">
                                <button type="button" className="quantity-right-plus btn btn-danger btn-number" data-type="plus" data-field="">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </span>
                        </div>
                    </div>
                    <br />
                    <h4><b>$20.00 </b></h4>
                </div>
            </div>
        </div>

    )
}

export default CartDisplay