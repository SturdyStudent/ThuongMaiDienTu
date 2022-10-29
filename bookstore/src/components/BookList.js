import React, { useEffect, useState } from 'react'
import BookCard from './BookCard'
import './BookList.css'
import { SwiperSlide, Swiper } from 'swiper/react'
import { FreeMode } from 'swiper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { baseUrl, loadImageUrl } from '../baseUrl'
import 'swiper/css'
import 'swiper/css/free-mode'

function BookList({ title }) {
    const [displayedBooks, setDisplayedBooks] = useState([]);

    useEffect(() => {
        if (String(title).match("SÁCH BÁN CHẠY")) {
            axios.get(`${baseUrl}/book/bestseller/8`)
                .then(result => {
                    setDisplayedBooks(result.data.data);
                });
        }
        if (String(title).match("SÁCH ĐANG HOT")) {
            axios.get(`${baseUrl}/book/mostviewed/8`)
                .then(result => {
                    setDisplayedBooks(result.data.data);
                });
        }
    }, [])

    return (
        <div id="booklist-container">
            <div style={{ "textAlign": "left" }} id="list-title"><h3>{title}</h3></div>
            <div id="list-container">
                <div className='chvron' >
                    <FontAwesomeIcon icon={faChevronLeft} size="2x" color='#ef4f3a' />
                </div>
                <Swiper
                    freeMode={true}
                    grabCursor={true}
                    modules={{ FreeMode }}
                    className="mySwiper"
                    slidesPerView={5}
                    slidebetween={30}
                >
                    {
                        displayedBooks && displayedBooks.map((item) => {
                            return (
                                <SwiperSlide key={item.MaSach}>
                                    <BookCard item={item} />
                                </SwiperSlide>)
                        })
                    }

                </Swiper>
                <div className='chvron'>
                    <FontAwesomeIcon icon={faChevronRight} size="2x" color='#ef4f3a' />
                </div>
            </div>
        </div>
    )
}

export default BookList