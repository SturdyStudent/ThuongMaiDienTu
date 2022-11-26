import "./new.scss";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Cover from '../../assets/images/bookCover.png'
import SearchCustomer from '../../components/modal/SearchCustomerModal'
import SearchBook from '../../components/modal/SearchProductModal'
import SearchEmployeeModal from "../../components/modal/SearchEmployeeModal";
import Select from 'react-select'
import { format } from 'date-fns'
import _ from 'lodash'
import axios from "axios";
import {BaseUrl} from "../../helpers/baseUrl";
import SuccessModal from "../../components/modal/SuccessModalNotification";
import { useLocation } from "react-router-dom";

const Edit = ({ title }) => {
    const [user, setUser] = useState({
        MaKH: 0,
        HoTen: '',
        Email: '',
        DiaChi: '',
        DienThoai: '',
    });
    const [deliveryBoi, setDeliveryBoi] = useState({
        MaNV: 0,
        HoTen: '',
        Email: '',
        DiaChi: '',
        DienThoai: '',
    });

    const [orderBooks, setOrderBooks] = useState([]);
    const [voucherOptions, setVoucherOptions] = useState([]);
    const [successNotification, setSuccessNotification] = useState();

    const [openSelectUserModal, setOpenSelectUserModal] = useState(false);
    const [openSelectBookModal, setOpenSelectBookModal] = useState(false);
    const [openSelectEmployeeModal, setOpenSelectEmployeeModal] = useState(false);

    const [orderId, setOrderId] = useState();
    const [voucherList, setVoucherList] = useState();
    const [tempTotal, setTempTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [voucherType, setVoucherType] = useState('Giảm theo giá tiền');
    const [discountValue, setDiscountValue] = useState(0);
    const [userId, setUserId] = useState(user.MaKH);
    const [deliveryBoiId, setDeliveryBoiId] = useState(deliveryBoi.MaNV);
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [orderDate, setOrderDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [deliverDate, setDeliverDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [paymentMethod, setPaymentMethod] = useState('');
    const [voucher, setVoucher] = useState('');
    const [isPaidStatus, setIsPaidState] = useState(0);
    const [deliveryState, setDeliveryState] = useState(1);

    const callbackSetOpenModal = (isAllowed) => {
        setOpenSelectUserModal(isAllowed);
    }

    const callbackSetOpenBookModal = (isAllowed) => {
        setOpenSelectBookModal(isAllowed);
    }

    const callbackSetOpenEmployeeModal = (isAllowed) => {
        setOpenSelectEmployeeModal(isAllowed);
    }

    const handleChangeUser = (e) => setUser(e);
    const handleChangeEmployee = (e) => setDeliveryBoi(e);
    const handleAddSelectedBooks = (book) => setOrderBooks([...orderBooks, book]);

    const options = [
        { value: "Thanh toán bằng tiền mặt", label: "Thanh toán bằng tiền mặt" },
        { value: "Thanh toán bằng thẻ", label: "Thanh toán bằng thẻ" }
    ]

    const deliverStateOptions = [
        { value: 0, label: "Không giao/ hủy đơn" },
        { value: 1, label: "Đặt hàng thành công"},
        { value: 2, label: "Đã duyệt đơn"},
        { value: 3, label: "Đang giao"},
        { value: 4, label: "Giao thành công"}
    ]

    const paidStateOptions = [
        { value: 0, label: "Chưa thanh toán" },
        { value: 1, label: "Đã thanh toán" },
    ]

    const location = useLocation();
    let id = null;
    try {
        id = location.state.id;
    } catch (err) {
    }

    useEffect(() => {
        axios.get(`${BaseUrl}/voucher`)
                .then(result => {
                    const resultVoucher = _.find(result.data.data, {IDVoucher: Number(voucher)});
                    setVoucherList({value: resultVoucher.IDVoucher, label: resultVoucher.CodeVoucher});
                })
    }, [voucher]);

    useEffect(() => {
        axios.get(`${BaseUrl}/user/${userId}`)
                .then(result => {
                    setUser({...result.data.data[0]});
                })
    }, [userId])

    useEffect(() => {
        axios.get(`${BaseUrl}/employee/${deliveryBoiId}`)
                .then(result => {
                    setDeliveryBoi({...result.data.data[0]});
                })
    }, [deliveryBoiId])

    useEffect(() => {
        try {
            if (id) {
                axios.get(`${BaseUrl}/order/${id}`)
                    .then(result => {
                        let obj = result.data.data[0];
                        setOrderId(obj.MaDonHang);
                        setIsPaidState(_.find(paidStateOptions, {value: Number(obj.DaThanhToan)}));
                        setDeliveryState(_.find(deliverStateOptions, {value: Number(obj.TinhTrangGiaoHang)}));
                        setOrderDate(format(new Date(obj.NgayDat), 'yyyy-MM-dd'));
                        setUserId(obj.MaKH);
                        setReceiverName(obj.TenNguoiNhan);
                        setDeliverDate(format(new Date(obj.NgayGiao), 'yyyy-MM-dd'))
                        setReceiverPhone(obj.DienThoaiNguoiNhan);
                        setReceiverAddress(obj.DiaChiGiao);
                        setPaymentMethod(_.find(options, {value: obj.HinhThucThanhToan}));
                        setVoucher(obj.IDVoucher);
                        setTotal(obj.ThanhTien);
                        setDeliveryBoiId(obj.MaNV);
                    });
            }
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    useEffect(() => {
        let sum = 0;
        orderBooks.forEach((val) => {
            sum += (val.GiaBan * val.SoLuong);
        })
        setTempTotal(sum);
        
        if(!voucherType || tempTotal < voucher.MucToiThieuCan){
            setTotal(tempTotal);
        }else{
            if(String(voucherType).match('Giảm theo phần trăm')){
              
                if(tempTotal * (discountValue / 100) < voucher.MucToiDaCan){
                    setTotal(20000 + tempTotal * (1 - (discountValue / 100)));
                }
            }else{
                setTotal(20000 + tempTotal - discountValue);
            }
        }
    }, [voucherType, discountValue, voucher, tempTotal, orderBooks])

    useEffect(() => {
        axios.get(`${BaseUrl}/voucher`)
            .then(results => {
                let resultArr = [];
                results.data.data.forEach(item => {
                    resultArr.push({value: item.IDVoucher, label: item.CodeVoucher, ...item});
                })
                setVoucherOptions([...resultArr]);
            })
    }, [])

    useEffect(() => {
        setUserId(user.MaKH);
    }, [receiverName, user.MaKH])

    useEffect(() => {
        if(id){
            axios.get(`${BaseUrl}/book/orderedBooks/${orderId}`)
                .then(results => {
                    console.log(results.data.data);
                    setOrderBooks(results.data.data);
                })
        }
    }, [orderId, id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            handleUpdateOrder();
        } else {
            handleCreateOrder();
        }
    }

    const handleCreateOrder = () => {
        console.log({
            "DaThanhToan": isPaidStatus.value,
            "TinhTrangGiaoHang": deliveryState.value,
            "NgayDat": orderDate,
            "NgayGiao": deliverDate,
            "MaKH": userId,
            "TenNguoiNhan": receiverName,
            "DienThoaiNguoiNhan": receiverPhone,
            "DiaChiGiao": receiverAddress,
            "HinhThucThanhToan": paymentMethod.value,
            "HinhThucGiaoHang": "Giao thông thường",
            "IDVoucher": voucher.value,
            "ThanhTien": total,
            "MaNV": deliveryBoi.MaNV,
            "ChitietDH": JSON.stringify(orderBooks)
        })

        axios.post(`${BaseUrl}/order/create`, {
            "DaThanhToan": isPaidStatus.value,
            "TinhTrangGiaoHang": deliveryState.value,
            "NgayDat": orderDate,
            "NgayGiao": deliverDate,
            "MaKH": userId,
            "TenNguoiNhan": receiverName,
            "DienThoaiNguoiNhan": receiverPhone,
            "DiaChiGiao": receiverAddress,
            "HinhThucThanhToan": paymentMethod.value,
            "HinhThucGiaoHang": "Giao thông thường",
            "IDVoucher": voucher.value,
            "ThanhTien": total,
            "MaNV": deliveryBoi.MaNV,
            "ChitietDH": JSON.stringify(orderBooks)
        }).then(result => {
            console.log(result.data.data[0]);
            setSuccessNotification(result.data.message);
        }).catch(e =>
            console.log(e)
        )
    }
    
    const handleUpdateOrder = () => {
        // axios({
        //     method: 'put',
        //     url: `${BaseUrl}/order/update/${id}`,
        //     data: postObj,
        //     headers: {'Content-Type': 'application/json;charset=UTF-8'}
        // }).then(res => {
        //     console.log(res);
        // })

        axios.put(`${BaseUrl}/order/update/${id}`, {
            "DaThanhToan": isPaidStatus.value,
            "TinhTrangGiaoHang": deliveryState.value,
            "NgayDat": orderDate,
            "NgayGiao": deliverDate,
            "MaKH": userId,
            "TenNguoiNhan": receiverName,
            "DienThoaiNguoiNhan": receiverPhone,
            "DiaChiGiao": receiverAddress,
            "HinhThucThanhToan": paymentMethod.value,
            "HinhThucGiaoHang": "Giao thông thường",
            "IDVoucher": voucher.value,
            "ThanhTien": total,
            "MaNV": deliveryBoi.MaNV,
            "ChitietDH": JSON.stringify(orderBooks)
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            result => {
                setSuccessNotification(result.data.message);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />
                    <div className="new">
                        <div className="newContainer">
                            <div className="top">
                                <h1>{title}</h1>
                                {successNotification && <SuccessModal successNotification={successNotification} />}
                            </div>
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="offset-md-2 shadow p-3 col-md-8 row" >
                                    <div className="input-group mb-3" onClick={() => callbackSetOpenModal(true)}>
                                        <input type="text" className="form-control" placeholder="Tìm kiếm Khách đặt hàng" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <span className="input-group-text bg-primary text-white" id="basic-addon2">Tìm kiếm</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                                    {
                                        user.MaKH ?
                                            <div className=" pt-4">
                                                <div className='row'>
                                                    <div className='col-md-2 d-flex justify-content-center' >
                                                        <div className='book-detail-cover-view rounded-circle' style={{ width: "80px", height: "80px" }}>
                                                            <img className="rounded-circle" src={Cover} alt="..." />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4 text-start' >
                                                        <h5>Khách hàng</h5>
                                                        <div>{user.HoTen}</div>
                                                    </div>
                                                    <div className="col-md-6 text-start p-0">
                                                        <h5>Thông tin liên lạc</h5>
                                                        <div><b>Email:</b> {user.Email}</div>
                                                        <div><b>Số điện thoại:</b> {user.DienThoai}</div>
                                                    </div>
                                                </div>
                                                <div className="offset-6 col-md-6 mt-4">
                                                    <h5>Địa chỉ</h5>
                                                    <p>{user.DiaChi}</p>
                                                </div>
                                            </div> : null}
                                </div>
                                <div className="offset-md-2 shadow p-3 col-md-8 row" >
                                    <div className="input-group mb-3" onClick={() => callbackSetOpenEmployeeModal(true)}>
                                        <input type="text" className="form-control" placeholder="Tìm kiếm Nhân viên giao" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <span className="input-group-text bg-primary text-white" id="basic-addon2">Tìm kiếm</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                                    {
                                        deliveryBoi.MaNV ?
                                            <div className=" pt-4">
                                                <div className='row'>
                                                    <div className='col-md-2 d-flex justify-content-center' >
                                                        <div className='book-detail-cover-view rounded-circle' style={{ width: "80px", height: "80px" }}>
                                                            <img className="rounded-circle" src={Cover} alt="..." />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4 text-start' >
                                                        <h5>Tên nhân viên</h5>
                                                        <div>{deliveryBoi.HoTenNV}</div>
                                                    </div>
                                                    <div className="col-md-6 text-start p-0">
                                                        <h5>Thông tin liên lạc</h5>
                                                        <div><b>Email:</b> {deliveryBoi.Email}</div>
                                                        <div><b>Số điện thoại:</b> {deliveryBoi.Sdt}</div>
                                                    </div>
                                                </div>
                                                <div className="offset-6 col-md-6 mt-4">
                                                    <h5>Địa chỉ</h5>
                                                    <p>{deliveryBoi.DiaChi}</p>
                                                </div>
                                            </div> : null}
                                </div>
                                <div className="offset-md-2 shadow p-3 col-md-8 row mt-3" >
                                    <div className="d-flex flex-row ">
                                        <div className="CpnInp-code col-md-4  me-5" >
                                            <label><b>Tên người nhận</b></label><br />
                                            <input placeholder="Nhập tên người nhận" value={receiverName} onChange={e => setReceiverName(e.target.value)} className="col-md-12 mb-3 p-1 mt-2" style={{ "border": "2px solid #D3D3D3" }}></input>
                                        </div>
                                        <div className="CpnInp-code col-md-4" >
                                            <label><b>Số điện thoại người nhận</b></label><br />
                                            <input placeholder="Nhập số điện thoại người nhận" value={receiverPhone} onChange={(e) => setReceiverPhone(e.target.value)} type={"number"} className="col-md-12 mb-3 p-1 mt-2" style={{ "border": "2px solid #D3D3D3" }}></input>
                                        </div>
                                    </div>
                                    <div className="CpnInp-code mt-3" >
                                        <label><b>Địa chỉ người nhận</b></label><br />
                                        <input placeholder="Nhập địa chỉ người nhận" value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} className="col-md-12 mb-3 p-1 mt-2" style={{ "border": "2px solid #D3D3D3" }}></input>
                                    </div>
                                    <div className="d-flex flex-row ">
                                        <div className="CpnInp-code mt-3 col-md-4 me-5" >
                                            <label><b>Ngày đặt hàng</b></label><br />
                                            <input type={"date"} value={orderDate} onChange={(e) => setOrderDate(e.target.value)} className="col-md-12 mb-3 p-1 mt-2" style={{ "border": "2px solid #D3D3D3" }}></input>
                                       </div>
                                        <div className="CpnInp-code mt-3 col-md-4 me-5" >
                                            <label><b>Ngày giao hàng</b></label><br />
                                            <input type={"date"} value={deliverDate} onChange={(e) => setDeliverDate(e.target.value)} className="col-md-12 mb-3 p-1 mt-2" style={{ "border": "2px solid #D3D3D3" }}></input>
                                        </div>

                                    </div>
                                    <div className="CpnInp-code mt-3 col-md-5 me-5" >
                                            <label><b>Hình thức thanh toán</b></label><br />
                                            <Select options={options} value={paymentMethod} onChange={e => { setPaymentMethod(e); }} className="mt-2" />
                                    </div>
                                    <div className="CpnInp-code mt-3 col-md-5 me-5" >
                                            <label><b>Tình trạng đơn hàng</b></label><br />
                                            <Select options={deliverStateOptions} value={deliveryState} onChange={e => { setDeliveryState(e); }} className="mt-2" />
                                    </div>
                                    <div className="CpnInp-code mt-3 col-md-5 me-5" >
                                            <label><b>Tình trạng thanh toán</b></label><br />
                                            <Select options={paidStateOptions} value={isPaidStatus} onChange={e => { setIsPaidState(e); }} className="mt-2" />
                                    </div>
                                </div>
                                <div className="offset-md-2 mt-4 shadow p-3 col-md-8 row" >
                                    <h5>Thêm sách</h5>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" onClick={() => callbackSetOpenBookModal(true)} placeholder="Nhập tên hoặc mã sách" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <span className="input-group-text bg-primary text-white" id="basic-addon2">Tìm kiếm</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                                    {
                                        (orderBooks[0] !== null) && (_.uniqBy(orderBooks, 'MaSach')).map((item, index) => {
                                            return (
                                                <div key={item.MaSach} className=" pt-4">
                                                    <div className='row'>
                                                        <div className='col-md-2 d-flex justify-content-center' >
                                                            <div className='book-detail-cover-view'>
                                                                <img src={`http://127.0.0.1:3002/public/${item.AnhBia}`} alt="..." />
                                                            </div>
                                                        </div>
                                                        <div className='col-md-7 text-start' >
                                                            <h6 className='mt-2 fw-bold'>{item.TenSach}</h6><br />
                                                            <div className="d-flex flex-row">Số lượng: &nbsp;<span><input min={1} type={'number'} onChange={(e) => {
                                                                const tempBooks = orderBooks;
                                                                tempBooks[index].SoLuong = e.target.value;
                                                                setOrderBooks([...tempBooks]);
                                                                orderBooks.reduce((prevVal, curVal) => {
                                                                });
                                                    
                                                            }
                                                            } value={orderBooks[index].SoLuong} style={{ width: "70px" }}></input></span>&nbsp; x {Number(item.GiaBan).toLocaleString()}đ</div><br />
                                                            <div className="d-flex flex-row"><a href="/#" onClick={(e) => { e.preventDefault(); setOrderBooks(orderBooks.filter(book => book.MaSach !== item.MaSach)) }} style={{ textDecoration: "none" }}>Xóa khỏi đơn hàng</a></div>
                                                        </div>
                                                        <div className="col-md-3 text-end fw-bold">
                                                            {Number(item.GiaBan * orderBooks[index].SoLuong).toLocaleString()} VNĐ
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="offset-md-2 mt-4 mb-4 shadow p-3 col-md-8" >
                                    <h5>Thanh toán</h5>
                                    <div className="row mb-3">
                                        <div className="col-md-3">
                                            Mã giảm giá
                                        </div>
                                        <Select className="col-md-7" value={voucherList} options={voucherOptions} onChange={e => {
                                            setVoucher(e);
                                            setDiscountValue(e.TriGiaGiam);
                                            setVoucherType(e.LoaiVoucher);
                                        }} />
                                        <div className="col-md-2 text-end">
                                             -{discountValue ? (String(voucherType).match('Giảm theo phần trăm') ? `${discountValue}%` : `${Number(discountValue).toLocaleString()}đ`) : '0đ'}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            Tạm tính
                                        </div>
                                        <div className="col-md-7">
                                        </div>
                                        <div className="col-md-2 text-end">
                                        {Number(tempTotal).toLocaleString()}đ
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            Phí vận chuyển
                                        </div>
                                        <div className="col-md-7">
                                        </div>
                                        <div className="col-md-2 text-end">
                                        {Number(20000).toLocaleString()}đ
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-3 fw-bold">
                                            Tổng cộng
                                        </div>
                                        <div className="col-md-7">
                                        </div>
                                        <div className="col-md-2 fw-bold text-end">
                                            {Number(total).toLocaleString()}đ
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-12 text-center mb-5">
                                    <button type="submit" className="btn btn-primary text-white p-2 ps-3 pe-3">Cập nhật</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {openSelectUserModal ? <SearchCustomer callbackSetOpenModal={callbackSetOpenModal} changeSelectedUser={handleChangeUser} /> : null}
                    {openSelectEmployeeModal ? <SearchEmployeeModal callbackSetOpenEmployeeModal={callbackSetOpenEmployeeModal} changeSelectedEmployee={handleChangeEmployee} /> : null}
                    {openSelectBookModal ? <SearchBook callbackSetOpenBookModal={callbackSetOpenBookModal} changeSelectedBooks={handleAddSelectedBooks} /> : null}
                </div>
            </div>
        </>
    );
};

export default Edit;
