import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Cover from '../../assets/images/bookCover.png'
import SearchCustomer from '../../components/modal/SearchCustomerModal'

const Edit = ({ title }) => {

    return (
        <>
            <div className="new" style={{ height: "100%" }}>
                <Sidebar />
                <div className="newContainer">
                    <Navbar />
                    <div className="top">
                        <h1>{title}</h1>
                    </div>
                    <form>
                        <div className="offset-md-2 shadow p-3 col-md-8 row" >
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Nhập tên Khách hàng" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div class="input-group-append">
                                    <span class="input-group-text bg-primary text-white" id="basic-addon2">Tìm kiếm</span>
                                </div>
                            </div>
                            <hr />
                            <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                            <div class=" pt-4">
                                <div className='row'>
                                    <div className='col-md-2 d-flex justify-content-center' >
                                        <div className='book-detail-cover-view rounded-circle' style={{ width: "80px", height: "80px" }}>
                                            <img className="rounded-circle" src={Cover} alt="..." />
                                        </div>
                                    </div>
                                    <div className='col-md-4 text-start' >
                                        <h5>Khách hàng</h5>
                                        <div>Christine Ha</div>
                                    </div>
                                    <div className="col-md-6 text-start p-0">
                                        <h5>Thông tin liên lạc</h5>
                                        <div><b>Email:</b> christine143@gmail.com</div>
                                        <div><b>Số điện thoại:</b> 0339532542</div>
                                    </div>
                                </div>
                                <div className="offset-6 col-md-6 mt-4">
                                    <h5>Địa chỉ giao hàng</h5>
                                    <p>109 Đường Đông Thạnh 5, Khu phố 2, Phường Tân Phong, Xã Dĩ An, Quận 12, Thành phố Vũng Tàu</p>
                                </div>
                            </div>
                        </div>
                        <div className="offset-md-2 mt-4 shadow p-3 col-md-8 row" >
                            <h5>Thêm sản phẩm</h5>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Nhập tên hoặc mã sản phẩm" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div class="input-group-append">
                                    <span class="input-group-text bg-primary text-white" id="basic-addon2">Tìm kiếm</span>
                                </div>
                            </div>
                            <hr />
                            <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
                            <div class=" pt-4">
                                <div className='row'>
                                    <div className='col-md-2 d-flex justify-content-center' >
                                        <div className='book-detail-cover-view'>
                                            <img src={Cover} alt="..." />
                                        </div>
                                    </div>
                                    <div className='col-md-7 text-start' >
                                        <h6 className='mt-2 fw-bold'>THE OUTSIDER</h6>
                                        <div className='mt-2'>Cung cấp bởi: Tiki</div>
                                        <div>1x 20.000đ</div>
                                        <div className="d-flex flex-row">Số lượng: &nbsp;<span><input type={'number'} value={10} style={{ width: "70px" }}></input></span></div>
                                        <div className="d-flex flex-row"><a href="/#" style={{ textDecoration: "none" }}>Xóa khỏi đơn hàng</a></div>
                                    </div>
                                    <div className="col-md-3 text-end fw-bold">
                                        20.000đ
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="offset-md-2 mt-4 mb-4 shadow p-3 col-md-8" >
                            <h5>Thanh toán</h5>
                            <div className="row">
                                <div class="col-md-3">
                                    Mã giảm giá
                                </div>
                                <div className="col-md-7">
                                    <input type={'text'} value={'OFF-20%'} className='col-md-4' />
                                </div>
                                <div className="col-md-2 text-end">
                                    -42.000đ
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-md-3">
                                    Tạm tính
                                </div>
                                <div className="col-md-7">
                                </div>
                                <div className="col-md-2 text-end">
                                    42.000đ
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div class="col-md-3 fw-bold">
                                    Tổng cộng
                                </div>
                                <div className="col-md-7">
                                </div>
                                <div className="col-md-2 fw-bold text-end">
                                    82.000đ
                                </div>
                            </div>

                        </div>
                        <div className="col-md-12 text-center mb-5">
                            <button type="button" className="btn btn-primary text-white p-2 ps-3 pe-3">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
            <SearchCustomer />
        </>

    );
};

export default Edit;
