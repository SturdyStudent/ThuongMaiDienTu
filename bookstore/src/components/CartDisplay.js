import React, { useEffect, useState } from 'react'
import Cover from '../assets/bookCover.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faX } from '@fortawesome/free-solid-svg-icons'
import { baseUrl, loadImageUrl } from '../baseUrl'
import _ from 'lodash'
import axios from 'axios'
import './CartDisplay.css'

function CartDisplay({ item, callback }) {
    const [cartItem, setCartItem] = useState({
        MaTacGia: 1,
        soLuong: 1,
    });
    const [itemQty, setItemQty] = useState(1);
    const [authorName, setAuthorName] = useState();

    const qtyDecrement = () => {
        if (itemQty > 0) {
            setItemQty(itemQty - 1)
        }
    }
    const qtyIncrement = () => {
        if (itemQty < 100) {
            setItemQty(itemQty + 1)
        }
    }

    useEffect(() => {
        let oldItems = JSON.parse(localStorage.getItem("CART_ITEMS") || "[]");
        callback(Date.now());
        oldItems[(_.findIndex(oldItems, _.matchesProperty('idSach', item.idSach)))] = { ...item, anhBia: cartItem.AnhBia, tenSach: cartItem.TenSach, soLuong: itemQty, tongTien: (itemQty * cartItem.GiaBan) || 0 };
        localStorage.setItem("CART_ITEMS", JSON.stringify(oldItems));
    }, [itemQty, cartItem, callback, item])

    useEffect(() => {
        const fetchBook = async () => {
            let result = await axios.get(`${baseUrl}/book/${item.idSach}`);
            setCartItem(result.data.data[0]);
        }
        fetchBook();
    }, [cartItem, item.idSach])

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/author/${cartItem.MaTacGia}`)
                .then(result => {
                    let obj = result.data.data[0].TenTacGia;
                    setAuthorName(obj);
                });
        } catch (err) {
            console.log(err);
        }
    }, [item.MaTacGia, cartItem.MaTacGia]);

    const handleRemoveItem = (e) => {
        e.preventDefault();
        callback(Date.now());
        let oldItems = JSON.parse(localStorage.getItem("CART_ITEMS") || "[]");
        _.remove(oldItems, _.matchesProperty('idSach', item.idSach));
        localStorage.setItem("CART_ITEMS", JSON.stringify(oldItems));
    }

    return (
        <div className='cart-display-parent'>
            <div className='row cart-display-parent justify-content-center'>
                <div className='col-md-2 offset'>
                    <div style={{ textAlign: "left" }}>
                        <button id="btn-remove-item" onClick={e => handleRemoveItem(e)}><FontAwesomeIcon icon={faX} /></button>
                    </div>
                    <div id='cart-display-cover'>
                        <img src={cartItem ? `${loadImageUrl}/${cartItem.AnhBia}` : Cover} alt="..." />
                    </div>
                </div>
                <div className='col-md-4 cart-display-detail'>
                    <h4>{cartItem.TenSach}</h4>
                    <br />
                    <div style={{ "fontWeight": "600" }}>{authorName}</div>
                </div>
                <div className='col-md-3'>
                    <div style={{ "display": "flex" }} className="cart-display-quantity">
                        <div>Số lượng: &nbsp;</div>

                        <div className="input-group input-cart-quantity" style={{ "display": "flex" }}>
                            <span className="input-group-btn">
                                <button type="button" onClick={qtyDecrement} className="quantity-left-minus btn btn-danger btn-number" data-type="minus" data-field="">
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </span>
                            <input type="number" id="quantity" value={(itemQty < 101 && itemQty > -1) && itemQty} name="quantity" onChange={e => setItemQty(e.target.value)} className="form-control input-number" min="1" max="100" />
                            <span className="input-group-btn">
                                <button type="button" onClick={qtyIncrement} className="quantity-right-plus btn btn-danger btn-number" data-type="plus" data-field="">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </span>
                        </div>
                    </div>
                    <br />
                    <h4><b>{Number(cartItem.GiaBan * itemQty).toLocaleString()} VNĐ</b></h4>
                </div>
            </div>
            <hr className='col-md-6 offset-md-2' style={{ "marginTop": "5vh" }} />
        </div>

    )
}

export default CartDisplay