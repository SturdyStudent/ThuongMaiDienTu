import React from 'react'
import BookCover from '../assets/bookCover.png'
import './BookCard.css'

function BookCard({ spacingStyle }) {
    const spacing = spacingStyle ? spacingStyle : { "width": "25vh" };
    return (
        <div class="card border-0" style={spacing} id="card-parent">
            <img src={BookCover} className="card-img-top" alt="..." id='bookcard-img' />
            <div className="card-body border-0">
                <h5 className="card-title">Tiêu Đề</h5>
            </div>
            <ul class="list-group list-group-flush border-0">
                <li className="list-group-item border-0" style={{ fontWeight: "500" }}>Tác giả</li>
                <li className="list-group-item" style={{ "padding": "0px", fontWeight: "800" }}><b>$27.00</b></li>
            </ul>
            <div className="card-body border-0">
                <button id="cart-button">THÊM VÀO GIỎ</button>
            </div>
        </div>
    )
}

export default BookCard