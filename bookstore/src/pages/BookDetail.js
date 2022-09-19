import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header'
import Cover from '../assets/bookCover.png'
import Footer from '../components/Footer'
import SortResult from '../components/SortResult'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './BookDetail.css'

function BookDetail() {
    return (
        <div>
            <Header />
            <SortResult isListingPage={false} />
            <div>
                {/* START SUMMARY */}
                <div className='book-detail-parent row'>
                    <div id='book-detail-section' className='col-md-8'>
                        <div id='book-detail-summary'>
                            <div id='book-detail-cover'>
                                <img src={Cover} alt="..." />
                            </div>
                            <div style={{ "textAlign": "left" }}>
                                <h3>THE OUTSIDER</h3>
                                <div><b>STEPHEN KING</b></div>
                                <br />
                                <p>1-Sentence-Summary: The God Equation presents a factual approach to the theory of life, the inception of the universe, and how modern physics lay the foundation of all natural laws that govern the galaxies, the planets, and our home called Earth. 1-Sentence-Summary: The God Equation presents a factual approach to the theory of life, the inception of the universe, and how modern physics lay the foundation of all natural laws that govern the galaxies, the planets, and our home called Earth. 1-Sentence-Summary: The God Equation presents a factual approach to the theory of life, the inception of the universe, and how modern physics lay the foundation of all natural laws that govern the galaxies, the planets, and our home called Earth.</p>
                            </div>
                        </div>
                        <hr />
                        <div className='reader-thoughts'>
                            <h3>REVIEWS</h3>
                            <div>1-Sentence-Summary: The God Equation presents a factual approach to the theory of life, the inception of the universe, and <span style={{ "color": "blue" }}>Kirkus Review</span></div>
                        </div>
                        <br />
                        <div className='reader-thoughts'>
                            <h3>CUSTOMER RATING</h3>
                            <div><span style={{ "color": "blue" }}>Kirkus Review</span>, Tháng 9 2022</div>
                            <div>1-Sentence-Summary: The God Equation presents a factual approach to the theory of life, the inception of the universe, and </div>
                        </div>
                        <br />
                        <div class="card" style={{ width: "20rem", borderRadius: "20px", backgroundColor: "#fffafa" }}>
                            <div class="card-body">
                                <h5 class="card-title">PRODUCT DETAIL</h5>
                                <hr />
                                <div className='product-detail-card'>
                                    <b>Condition:</b> Standard<br />
                                    <b>ISBN:</b> 19851589085<br />
                                    <b>Binding:</b> Trade Paperback<br />
                                    <b>Publication Day:</b> 05/03/2018<br />
                                    <b>Publisher:</b> SIMON {'&'} CHUSTER TRADE<br />
                                    <b>Pages:</b> 576<br />
                                    <b>Height:</b> 1.30INCH<br />
                                    <b>Width:</b> 4.1INCH<br />
                                    <b>Author:</b> Stephen King<br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='book-shopping-section' className='col-md-4'>
                        <div class="card card-detail-service card-shadow" id='card-detail-service' style={{ width: "18rem", borderRadius: "30px" }}>
                            <div class="card-body">
                                <h5 class="card-title"><b>$20.00</b></h5>
                                <hr />
                                <button className='btn-detail-service'>ADD TO CART</button>
                                <button className='btn-detail-service'>CLICK {'&'} COLLECT</button>
                                <button className='btn-detail-service'><FontAwesomeIcon icon={faHeart} /> &nbsp; ADD TO WHISHLIST</button>
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