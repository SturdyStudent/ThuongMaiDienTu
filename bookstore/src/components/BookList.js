import React from 'react'
import BookCard from './BookCard'
import './BookList.css'
import { SwiperSlide, Swiper } from 'swiper/react'
import { FreeMode } from 'swiper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import 'swiper/css'
import 'swiper/css/free-mode'

function BookList() {
    return (
        <div id="booklist-container">
            <div style={{ "textAlign": "left" }} id="list-title"><h3>BESTSELLERS</h3></div>
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
                    slideBetween={30}
                >
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BookCard />
                    </SwiperSlide>
                </Swiper>
                <div className='chvron'>
                    <FontAwesomeIcon icon={faChevronRight} size="2x" color='#ef4f3a' />
                </div>
            </div>
        </div>
    )
}

export default BookList