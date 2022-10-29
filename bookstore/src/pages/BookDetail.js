import React, { useState, useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header'
import Cover from '../assets/bookCover.png'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './BookDetail.css'
import axios from 'axios'
import _ from 'lodash'
import { baseUrl, loadImageUrl } from '../baseUrl'
import { useParams } from 'react-router-dom'

function BookDetail() {
    const [item, setItem] = useState({
        AnhBia: "",
        GiaBan: "0",
        MaChuDe: 4,
        MaNXB: 5,
        MaSach: 185,
        MaTacGia: 29,
        MoTa: "",
        NgayCapNhat: "",
        SoLuongBan: 0,
        SoLuongTon: 0,
        SoLuotXem: 0,
        TenSach: ""
    })
    const [publisher, setPublisher] = useState("default");
    const [author, setAuthor] = useState("default");
    const [category, setCategory] = useState("default");
    const [addToCart, setAddToCart] = useState(false);

    let { id } = useParams();
    let fetchBook;
    useEffect(() => {
        fetchBook = async () => {
            let result = await axios.get(`${baseUrl}/book/${id}`);
            setItem(result.data.data[0]);
        }
        fetchBook();
    }, [fetchBook])

    useEffect(() => {
        let oldItems = JSON.parse(localStorage.getItem("CART_ITEMS") || "[]");
        if (_.find(oldItems, { idSach: item.MaSach })) {
            setAddToCart(false);
        } else {
            setAddToCart(true);
        };
    }, [addToCart, publisher, author, category, item])

    useEffect(() => {
        try {
            axios.get(`${baseUrl}/author/${item.MaTacGia}`)
                .then(result => {
                    let obj = result.data.data[0].TenTacGia;
                    setAuthor(obj);
                });
        } catch (err) {
            console.log(err);
        }
    }, [item.MaTacGia]);
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/publisher/${item.MaNXB}`)
                .then(result => {
                    let obj = result.data.data[0].TenNXB;
                    setPublisher(obj);
                });
        } catch (err) {
            console.log(err);
        }
    }, [item.MaNXB]);
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/category/${item.MaChuDe}`)
                .then(result => {
                    let obj = result.data.data[0].TenChuDe;
                    setCategory(obj);
                });
        } catch (err) {
            console.log(err);
        }
    }, [item.MaChuDe]);
    const handleAddToCart = (cartItem) => {

        try {
            let arr = new Array();
            let oldItems = JSON.parse(localStorage.getItem("CART_ITEMS") || "[]");
            if (!_.isEqual(oldItems, [])) {
                oldItems.push(cartItem);
                oldItems = _.uniqBy(oldItems, 'idSach');
                localStorage.setItem("CART_ITEMS", JSON.stringify(oldItems));
                setAddToCart(!addToCart);
            } else {
                arr.push(cartItem);
                localStorage.setItem("CART_ITEMS", JSON.stringify(arr));
            }

        } catch (e) {
            console.log(e);
        }
    }

    const handleRemoveFromCart = (cartItem, e) => {
        console.log("có bấm xóa khỏi");
        try {
            let oldItems = JSON.parse(localStorage.getItem("CART_ITEMS"));
            console.log("cart", cartItem);
            console.log("oldItems", oldItems);

            _.remove(oldItems, cartItem);
            localStorage.setItem("CART_ITEMS", JSON.stringify(oldItems));
            setAddToCart(!addToCart);

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Header />
            <div id='result-sort-parent'>
                <div id='result-container'>
                    <div>
                        <div>Thể loại {'>>'} {category}</div>
                        <hr />
                    </div>
                </div>
            </div>
            <div>
                <div className='book-detail-parent row'>
                    <div id='book-detail-section' className='col-md-8'>
                        <div id='book-detail-summary'>
                            <div id='book-detail-cover'>
                                <img src={item.AnhBia ? `${loadImageUrl}/${item.AnhBia}` : Cover} alt="..." />
                            </div>
                            <div style={{ "textAlign": "left" }}>
                                <h3>{item.TenSach}</h3>
                                <div><b>{item.TenTacGia}</b></div>
                                <br />
                                <p>{item.MoTa}</p>
                            </div>
                        </div>
                        <hr />
                        <br />
                        <div className='reader-thoughts'>
                            <h3>ĐÁNH GIÁ KHÁCH HÀNG</h3>
                            <div><span style={{ "color": "blue" }}>Kirkus Review</span>, Tháng 9 2022</div>
                            <div>1-Sentence-Summary: The God Equation presents a factual approach to the theory of life, the inception of the universe, and </div>
                        </div>
                        <br />
                        <div className="card" style={{ width: "20rem", borderRadius: "20px", backgroundColor: "#fffafa" }}>
                            <div className="card-body">
                                <h5 className="card-title">Thông tin sách</h5>
                                <hr />
                                <div className='product-detail-card'>
                                    <b>Nhà xuất bản:</b> {publisher}<br />
                                    <b>Tác giả:</b> {author}<br />
                                    <b>Thể loại:</b> {category}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='book-shopping-section' className='col-md-4'>
                        <div className="card card-detail-service card-shadow" id='card-detail-service' style={{ width: "18rem", borderRadius: "30px" }}>
                            <div className="card-body">
                                <h5 className="card-title"><b>{Number(item.GiaBan).toLocaleString()} VNĐ</b></h5>
                                <hr />
                                {addToCart ? <button className='btn-detail-service' onClick={e => handleAddToCart({ idSach: item.MaSach })}>THÊM VÀO GIỎ</button> : <button className='btn-detail-added' onClick={e => handleRemoveFromCart({ idSach: item.MaSach }, e)}>ĐÃ THÊM VÀO GIỎ</button>}
                                <button className='btn-detail-service'><FontAwesomeIcon icon={faHeart} /> &nbsp; THÊM VÀO WHISHLIST</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BookDetail