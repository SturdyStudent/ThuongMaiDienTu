import React, { useEffect, useState } from 'react'
import BookCover from '../assets/bookCover.png'
import { loadImageUrl, baseUrl } from '../baseUrl'
import axios from 'axios'
import './BookCard.css'
import { Link } from 'react-router-dom'

function BookCard({ spacingStyle, item }) {
    const [authorName, setAuthorName] = useState('Tác giả');
    useEffect(() => {
        axios.get(`${baseUrl}/author/${item.MaTacGia}`)
            .then(result => setAuthorName(result.data.data[0].TenTacGia));
    }, [item.MaTacGia])

    const spacing = spacingStyle ? spacingStyle : { "width": "25vh" };

    return (
        <div className="card border-0 d-flex justify-content-center " style={spacing} id="card-parent">
            <div style={{ width: "130px", height: "180px", margin: "0px auto" }}>
                <img src={item ? `${loadImageUrl}/${item.AnhBia}` : BookCover} alt="..." id='bookcard-img' />
            </div>

            <div className="card-body border-0" id='bookcard-bookname'>
                <h5 className="card-title">{item && item.TenSach}</h5>
            </div>
            <ul className="list-group list-group-flush border-0">
                <li className="list-group-item border-0" style={{ fontWeight: "500", minHeight: "60px", maxHeight: "60px" }}>{authorName}</li>
                <li className="list-group-item" style={{ "padding": "0px", fontWeight: "800" }}><b>{Number(item.GiaBan).toLocaleString()}VNĐ</b></li>
            </ul>
            <div className="card-body border-0">
                <Link to={`/details/${item.MaSach}`}>
                    <button id="cart-button">XEM CHI TIẾT</button>
                </Link>
            </div>
        </div>
    )
}

export default BookCard