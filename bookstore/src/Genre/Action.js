import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header'
import Banner from '../assets/advertiseBanner.png'
import BookList from '../components/BookList'
import SaleCard from '../components/SaleCard'
import Footer from '../components/Footer'
import  './Genres.css'


export default function ActionHomePage() {
    return (
        <div>
            <Header />
            <img src={Banner} style={{ "margin": "4vh" }} alt="banner" />
            <BookList title={"SÁCH BÁN CHẠY"} />
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                <SaleCard />
                <SaleCard />
            </div>
    <div id="flashsale-slider" class="row" style={{"margin": "20px 0px 0px", "padding": "0px", "display": "block"}}>
        <div class="flashsale-header">
            <a href="/flashsale">
                <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/ico_flashsale@3x.png" style={{"width": "25px", "height": "25px","margin-left": "10px;"}} alt="#"/>
                <span class="flashsale-header-title">FLASH SALE</span>
            </a>
            <span>
                <div class="split"></div>
            </span>
            <span class="flashsale-page-countdown-label">Kết Thúc Trong</span>
            <div class="flashsale-page-countdown">
                <div class="flashsale-countdown">
                    <span class="flashsale-countdown-number">02</span>
                    <span>:</span>
                    <span class="flashsale-countdown-number">08</span>
                    <span>:</span>
                    <span class="flashsale-countdown-number">45</span>
                </div>
            </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 fhs-full-p">
            <div class="flashsale-body">
                <div class="bx-wrapper" style={{"max-width": "1845px"}}>
                    <div class="bx-viewport" aria-live="polite" style={{"width": "100%", "overflow": "hidden", "position": "relative", "height": "332px;"}}>
                        <ul class="flashsale-list" style={{"width": "10215%", "position": "relative", "transition-duration": "0s", "transform": "translate3d(-507px, 0px, 0px)"}}>
                            <li class="item flashsale-item item-inner" aria-hidden="true" style={{"float": "left", "list-style": "none", "position": "relative", "width": "270px", "margin-right": "45px;"}}>
                              <div class="" style={{"position": "relative"}}>
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style={{"height":"203px"}}>
                                            <div class="product images-container">
                                                {/* <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a> */}
                                            </div>
                                        </div>
                                                {/* <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2> */}
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style={{"width": "13.043478260869565%"}} aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>       
                                                    
                                                </div>
                                 </div>
                             </div>
                         </li>
                         {/* <li class="item flashsale-item item-inner" aria-hidden="true" style="float: left; list-style: none; position: relative; width: 270px; margin-right: 45px;">
                              <div class="" style="position: relative;">
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style="height:203px; ">
                                            <div class="product images-container">
                                                <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a>
                                            </div>
                                        </div>
                                                <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2>
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style="width: 13.043478260869565%;" aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>                                         
                                                </div>
                                 </div>
                             </div>
                         </li>
                         <li class="item flashsale-item item-inner" aria-hidden="true" style="float: left; list-style: none; position: relative; width: 270px; margin-right: 45px;">
                              <div class="" style="position: relative;">
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style="height:203px; ">
                                            <div class="product images-container">
                                                <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a>
                                            </div>
                                        </div>
                                                <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2>
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style="width: 13.043478260869565%;" aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>                                         
                                                </div>
                                 </div>
                             </div>
                         </li>
                         <li class="item flashsale-item item-inner" aria-hidden="true" style="float: left; list-style: none; position: relative; width: 270px; margin-right: 45px;">
                              <div class="" style="position: relative;">
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style="height:203px; ">
                                            <div class="product images-container">
                                                <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a>
                                            </div>
                                        </div>
                                                <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2>
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style="width: 13.043478260869565%;" aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>                                         
                                                </div>
                                 </div>
                             </div>
                         </li>
                         <li class="item flashsale-item item-inner" aria-hidden="true" style="float: left; list-style: none; position: relative; width: 270px; margin-right: 45px;">
                              <div class="" style="position: relative;">
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style="height:203px; ">
                                            <div class="product images-container">
                                                <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a>
                                            </div>
                                        </div>
                                                <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2>
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style="width: 13.043478260869565%;" aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>                                         
                                                </div>
                                 </div>
                             </div>
                         </li>
                         <li class="item flashsale-item item-inner" aria-hidden="true" style="float: left; list-style: none; position: relative; width: 270px; margin-right: 45px;">
                              <div class="" style="position: relative;">
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style="height:203px; ">
                                            <div class="product images-container">
                                                <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a>
                                            </div>
                                        </div>
                                                <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2>
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style="width: 13.043478260869565%;" aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>                                         
                                                </div>
                                 </div>
                             </div>
                         </li>
                         <li class="item flashsale-item item-inner" aria-hidden="true" style="float: left; list-style: none; position: relative; width: 270px; margin-right: 45px;">
                              <div class="" style="position: relative;">
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style="height:203px; ">
                                            <div class="product images-container">
                                                <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a>
                                            </div>
                                        </div>
                                                <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2>
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style="width: 13.043478260869565%;" aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>                                         
                                                </div>
                                 </div>
                             </div>
                         </li>
                         <li class="item flashsale-item item-inner" aria-hidden="true" style="float: left; list-style: none; position: relative; width: 270px; margin-right: 45px;">
                              <div class="" style="position: relative;">
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style="height:203px; ">
                                            <div class="product images-container">
                                                <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a>
                                            </div>
                                        </div>
                                                <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2>
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style="width: 13.043478260869565%;" aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>                                         
                                                </div>
                                 </div>
                             </div>
                         </li>
                         <li class="item flashsale-item item-inner" aria-hidden="true" style="float: left; list-style: none; position: relative; width: 270px; margin-right: 45px;">
                              <div class="" style="position: relative;">
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style="height:203px; ">
                                            <div class="product images-container">
                                                <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a>
                                            </div>
                                        </div>
                                                <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2>
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style="width: 13.043478260869565%;" aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>                                         
                                                </div>
                                 </div>
                             </div>
                         </li>
                         <li class="item flashsale-item item-inner" aria-hidden="true" style="float: left; list-style: none; position: relative; width: 270px; margin-right: 45px;">
                              <div class="" style="position: relative;">
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style="height:203px; ">
                                            <div class="product images-container">
                                                <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a>
                                            </div>
                                        </div>
                                                <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2>
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style={{width: '13.043478260869565%'}} aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>                                         
                                                </div>
                                 </div>
                             </div>
                         </li>
                         <li class="item flashsale-item item-inner" aria-hidden="true" style="float: left; list-style: none; position: relative; width: 270px; margin-right: 45px;">
                              <div class="" style="position: relative;">
                                <div class="new-label-pro-sale">
                                    <span class="new-p-sale-label discount-l-fs">30%</span>
                                </div>
                                <div class="ma-box-content">
                                    <div class="products clearfix" style="height:203px; ">
                                            <div class="product images-container">
                                                <a href="#" title="#">
                                             <div class="product-image">
                                                    <div class="flashsale-image-container">
                                                        <img class="flashsale-item-image lazyloaded" src="#" data-src="#" width="200" height="200" alt="#"/>
                                                    </div>
                                             </div>
                                                </a>
                                            </div>
                                        </div>
                                                <h2 class="product-name-no-ellipsis">
                                                    <a href="#" title="#">Kiếp Nào Ta Cũng Tìm Thấy Nhau (Tái Bản 2022)</a>
                                                </h2>
                                                <div class="flashsale-price">
                                                    <div class="flashsale-price-special">69.000</div>
                                                    <div class="flashsale-price-old">99.000</div>
                                                </div>
                                                <div class="progress">
                                                    <span class="progress-value">Đã Bán 6</span>
                                                    <div class="progress-bar" role="progressbar" style="width: 13.043478260869565%;" aria-valuenow="13.043478260869565" aria-valuemin="0" aria-valuemax="100"></div>                                         
                                                </div>
                                 </div>
                             </div>
                         </li> */}
                        </ul>
                    </div>   
                    <div class="bx-controls bx-has-controls-direction bx-has-pager">
                        <div class="bx-controls-direction"><a class="bx-prev" href="#">Prev</a>
                        <a class="bx-next" href="#">Next</a>
                        </div>
                        <div class="bx-pager bx-default-pager">
                            <div class="bx-pager-item">
                                <a href="#" data-slide-index="0" class="bx-pager-link">1</a>
                                </div><div class="bx-pager-item">
                                    <a href="#" data-slide-index="1" class="bx-pager-link">2</a>
                                    </div>
                                    <div class="bx-pager-item">
                                        <a href="#" data-slide-index="2" class="bx-pager-link">3</a>
                                    </div>
                            </div>
                    </div>
                </div>
                <div class="tabs-xem-them xem-them-item-aaa">
                    <a href="flashsale">Xem Thêm</a>
                </div>
            </div>
        </div>
     </div>
                <BookList title={"SÁCH ĐANG HOT"} />
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                <SaleCard />
                <SaleCard />
            </div>
            <Footer />
        </div>
        
    )
}
