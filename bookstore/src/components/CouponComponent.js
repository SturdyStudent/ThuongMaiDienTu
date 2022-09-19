import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { FreeMode } from 'swiper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Coupon from '../components/Coupon'

function CouponComponent({ title }) {
    return (
        <>
            <div className='coupon-title'>
                <h3>{title}</h3>
            </div>
            <div id="list-container">
                <div className='chvron' >
                    <FontAwesomeIcon icon={faChevronLeft} size="2x" color='#ef4f3a' />
                </div>
                <Swiper
                    freeMode={true}
                    grabCursor={true}
                    modules={{ FreeMode }}
                    className="mySwiper"
                    slidesPerView={2.5}
                    slideBetween={50}
                >
                    <SwiperSlide>
                        <Coupon />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon />
                    </SwiperSlide>
                </Swiper>
                <div className='chvron'>
                    <FontAwesomeIcon icon={faChevronRight} size="2x" color='#ef4f3a' />
                </div>
            </div>
        </>
    )
}

export default CouponComponent