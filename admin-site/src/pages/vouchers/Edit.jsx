import "./new.scss";
import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Switch from 'react-switch'
import Select from "react-select";
import { format } from "date-fns";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BaseUrl from "../../helpers/baseUrl";
import SuccessModal from "../../components/modal/SuccessModalNotification";

const Edit = ({ title}) => {
    const options = [
        { value: "Giảm theo giá tiền", label: "Giảm theo giá tiền" },
        { value: "Giảm theo phần trăm", label: "Giảm theo phần trăm" }
    ]
        const [successNotification, setSuccessNotification] = useState();
    const [codeVoucher, setCodeVoucher] = useState();
    const [validDate, setValidDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [invalidDate, setInvalidDate] = useState('');
    const [discountValue, setDiscountValue] = useState(0);
    const [discountCondition, setDiscountCondition] = useState('Giảm theo phần trăm');
    const [voucherQty, setVoucherQty] = useState(0);
    const [isValidate, setIsValidate] = useState(false);
    const [minApplyprice, setMinApplyPrice] = useState(0);
    const [maxApplyPrice, setMaxApplyPrice] = useState(0);

    const handleValidate = () => {
        setIsValidate(!isValidate);
    }

    const activeText = isValidate ? 'Đã kích hoạt' : 'Đã bị vô hiệu';

    const location = useLocation();
    let id = null;
    try {
        id = location.state.id;
    } catch (err) {
    }

    useEffect(() => {
        try {
          if (id) {
            axios.get(`${BaseUrl}/voucher/${id}`)
              .then(result => {
                let obj = result.data.data[0];
                setCodeVoucher(obj.CodeVoucher);
                setValidDate(format(new Date(obj.NgayBatDau), 'yyyy-MM-dd'));
                setInvalidDate(format(new Date(obj.NgayKetThuc), 'yyyy-MM-dd'));
                setIsValidate((Number(obj.HieuLuc) === 1) ? true : false);
                setDiscountValue(obj.TriGiaGiam);
                setDiscountCondition(obj.LoaiVoucher);
                setVoucherQty(obj.SoLuong);
                setValidDate(obj.Hieuluc);
                setMinApplyPrice(obj.MucToiThieuCan);
                setMaxApplyPrice(obj.MucToiDaCan);
              });
          }
        } catch (err) {
          console.log(err);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
          handleUpdateVoucher();
        } else {
          handleCreateVoucher();
        }
    }
    

    const handleCreateVoucher = (e) => {
        e.preventDefault();
        axios.post(`${BaseUrl}/voucher/create`, {
            "CodeVoucher": codeVoucher,
            "NgayBatDau": validDate,
            "NgayKetThuc": invalidDate,
            "TriGiaGiam": discountValue,
            "LoaiVoucher": discountCondition,
            "Soluong": voucherQty,
            "Hieuluc": (isValidate ? 1 : 0),
            "MucToiThieuCan": minApplyprice,
            "MucToiDaCan": maxApplyPrice,
        }).then(result => {
            setSuccessNotification(result.data.message)
        })
    }

    const handleUpdateVoucher = () => {
        axios.put(`${BaseUrl}/voucher/update/${id}`, {
            "CodeVoucher": codeVoucher,
            "NgayBatDau": validDate,
            "NgayKetThuc": invalidDate,
            "TriGiaGiam": discountValue,
            "LoaiVoucher": discountCondition,
            "Soluong": voucherQty,
            "Hieuluc": (isValidate ? 1 : 0),
            "MucToiThieuCan": minApplyprice,
            "MucToiDaCan": maxApplyPrice,
        }).then(result => {
          setSuccessNotification(result.data.message);
          console.log(result);
        })
          .catch(err => console.log(err));
      }

    return (
        <>
            <div className="home">
                <Sidebar />
                {successNotification && <SuccessModal successNotification={successNotification} />}
                <div className="homeContainer">
                    <Navbar />
                    <div className="new">
                        <div className="newContainer">
                            <div className="top">
                                <h1>{title}</h1>
                            </div>
                            <form onSubmit={e => handleSubmit(e)} style={{ "display": "flex", "justifyContent": "center" }}>
                                <div className="flex-column offset-3 col-md-6 bottom row">
                                    <div className="CpnInp-code mt-3" >
                                        <label><b>Code Voucher</b></label><br />
                                        <input type={"text"} value={codeVoucher} onChange={e => setCodeVoucher(e.target.value)} className="col-md-12 mb-3" style={{ "border": "2px solid #D3D3D3" }}></input>
                                    </div>
                                    <div className="pt-2 pb-2 d-flex justify-content-left align-items-center">
                                        <label><b>Trạng thái kích hoạt: &nbsp;</b></label><br />
                                        <div><Switch onChange={handleValidate} checked={isValidate} /></div>
                                        <div className="ms-3"><b>{activeText}</b></div>
                                    </div>
                                    <div className="CpnInp-code mb-3">
                                    <label><b>Loại Voucher</b></label><br />
                                        <Select options={options} value={{value: discountCondition, label: discountCondition}} onChange={value => setDiscountCondition(value.value)} />
                                    </div>
                                    <div className="CpnInp-code mb-3">
                                        <label><b>Gía trị Voucher giảm</b></label><br />
                                        <div className="input-group mb-3 mt-2">
                                            <input type="number" value={discountValue} onChange={e => setDiscountValue(e.target.value)} className="form-control" placeholder="Gía trị.." aria-label="Username" aria-describedby="basic-addon1" />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">{(String(discountCondition).match("Giảm theo phần trăm")) ? '%' : 'vnđ'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="CpnInp-code mb-3">
                                        <label><b>Số lượng voucher</b></label><br />
                                        <div className="input-group mb-3 mt-2">
                                            <input type="number" className="form-control" value={voucherQty} onChange={e => setVoucherQty(e.target.value)} placeholder="Nhập số lượng voucher" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div><b>Voucher có giá trị trong khoảng</b></div>
                                    <div className="CpnInp-code mb-3 mt-3 d-flex">
                                        <div>
                                            <label for="activeDatePicker">Gía trị đơn hàng tối thiểu:</label> &nbsp;
                                            <input type="number" value={minApplyprice} onChange={e => setMinApplyPrice(e.target.value)} className="p-1" id="activeDatePicker" name="birthday" /><span> VNĐ</span>
                                        </div>
                                        <div className="ms-3">
                                            <label for="expireDatePicker">Mức giá áp dụng tối đa:</label> &nbsp;
                                            <input type="number" value={maxApplyPrice} onChange={e => setMaxApplyPrice(e.target.value)} className="p-1" id="expireDatePicker" name="birthday" /><span> VNĐ</span>
                                        </div>
                                    </div>
                                    <div><b>Thời gian sử dụng Voucher</b></div>
                                    <div className="CpnInp-code mb-3 mt-3 d-flex">
                                        <div>
                                            <label for="activeDatePicker">Ngày kích hoạt:</label> &nbsp;
                                            <input type="date" value={validDate} onChange={e => setValidDate(e.target.value)} className="p-1" id="activeDatePicker" name="birthday" />
                                        </div>
                                        <div className="ms-3">
                                            <label for="expireDatePicker">Ngày hết hạn:</label> &nbsp;
                                            <input type="date" value={invalidDate} onChange={e => setInvalidDate(e.target.value)} className="p-1" id="expireDatePicker" name="birthday" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-2 mb-3">
                                        <button type="submit" className="btn btn-primary col-md-6 ">Hoàn Tất</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
