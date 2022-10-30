import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { actAllowNext, actNotAllowNext, actOrderSetState } from '../../actions/index'

function ShippingSection() {
    const [receiverName, setReceiverName] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [address, setAddress] = useState('');
    const [provinces, setProvinces] = useState();
    const [provinceId, setProvinceId] = useState();
    const [provinceName, setProvinceName] = useState();
    const [districts, setDistricts] = useState();
    const [districtName, setDistrictName] = useState('');
    const [districtId, setDistrictId] = useState();
    const [wards, setWards] = useState();
    const [wardName, setWardName] = useState('');
    const [errMsg, setErrMsg] = useState();

    const getLocationUrl = "https://provinces.open-api.vn/api/"

    const dispatch = useDispatch();
    const changeAddress = e => setAddress(e.target.value);
    const changeProvinceId = e => setProvinceId(e.target.value);
    const changeDistrictId = e => {
        setDistrictId(e.target.value);
    }
    const changeWardName = e => {
        setWardName(e.target.value);
    }
    const changeReceiverName = (e) => setReceiverName(e.target.value);
    const changeReceiverPhone = (e) => setReceiverPhone(e.target.value);

    useEffect(() => {
        if (!receiverName) {
            dispatch(actNotAllowNext());
            setErrMsg("Vui lòng nhập tên người nhận");
        } else if (!(wardName && districtName && provinceName)) {
            dispatch(actNotAllowNext());
            setErrMsg("Vui lòng nhập đầy đủ địa chỉ giao hàng");
        } else if (!receiverPhone || (receiverPhone.length !== 10)) {
            dispatch(actNotAllowNext());
            setErrMsg("Vui lòng nhập số điện thoại người nhận");
        } else {
            setErrMsg();
            dispatch(actAllowNext());
            dispatch(actOrderSetState({
                TenNguoiNhan: receiverName,
                DienThoaiNguoiNhan: receiverPhone,
                DiaChiGiao: `${address} ${wardName} ${districtName} ${provinceName}`
            }));
        }
    }, [receiverName, receiverPhone, address, wardName, districtName, provinceName, districtId, provinceId, dispatch])

    useEffect(() => {
        axios.get(`${getLocationUrl}p/`)
            .then((res) => {
                setProvinces(res.data);
            }).catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (provinceId) {
            axios.get(`${getLocationUrl}p/${provinceId}?depth=2`)
                .then((res) => {
                    setDistricts(res.data);
                }).catch(err => console.log(err));
        }
    }, [provinceId]);

    useEffect(() => {
        if (districtId) {
            axios.get(`${getLocationUrl}d/${districtId}?depth=2`)
                .then((res) => {
                    setWards(res.data);
                }).catch(err => console.log(err));
        }
    }, [districtId]);

    useEffect(() => {
        if (districts) {
            districts.districts.forEach(element => {
                if (Number(element.code) === Number(districtId)) {
                    setDistrictName(element.name);
                }
            });
        }
    }, [districtId, districts]);

    useEffect(() => {
        if (provinces) {
            provinces.forEach(element => {
                if (Number(element.code) === Number(provinceId)) {
                    setProvinceName(element.name);
                }
            });
        }
    }, [provinceId, provinces]);

    return (
        <>
            <br />
            <h5>THÔNG TIN VẬN CHUYỂN</h5><br />
            <div className='mb-2'><span style={{ "color": "red" }}>Những ô có dấu * là bắt buộc</span></div>
            <label className='fw-bold'><span style={{ "color": "red" }}>*</span> Họ tên</label><br />
            <input type={"text"} className='checkout-login-input mt-3 p-1' value={receiverName} onChange={e => changeReceiverName(e)}></input><br /><br />
            <p className='fw-bold'><span style={{ "color": "red" }}>*</span> Địa chỉ <span className='text-danger h6'>(Lưu ý chỉ điền số nhà, tổ, khu phố)</span></p>
            <input type="text" value={address} onChange={e => changeAddress(e)} className='checkout-login-input p-1' placeholder='Nhập số nhà, tên đường của bạn' ></input><br />
            <div className='d-flex justify-content-between mb-4 mt-3 checkout-login-input'>
                <select name="province-select" onChange={e => changeProvinceId(e)} id="province-select" className='p-1'>
                    <option value='null'>--Chọn tỉnh / thành phố--</option>
                    {provinces && provinces.map((val) =>
                        <option key={val.code} value={val.code}>{val.name}</option>
                    )}
                </select>
                <select name="distric-select" id="district-select" onChange={e => changeDistrictId(e)} className='p-1'>
                    <option value='null'>--Chọn quận / huyện--</option>
                    {districts && districts.districts.map((val) =>
                        <option key={val.code} value={val.code}>{val.name}</option>
                    )}
                </select>
                <select name="ward-select" id="ward-select" onChange={e => changeWardName(e)} className='p-1'>
                    <option value='null'>--Chọn xã / phường--</option>
                    {wards && wards.wards.map((val) =>
                        <option key={val.code} value={val.name}>{val.name}</option>
                    )}
                </select>
            </div>
            <label className='fw-bold'><span style={{ "color": "red" }}>*</span> Số điện thoại</label><br />
            <input type={"number"} value={receiverPhone} onChange={e => changeReceiverPhone(e)} className='p-1 checkout-login-input mt-3'></input><br /><br />
            {errMsg && <div><span style={{ "color": "red" }}>{errMsg}</span></div>}
        </>
    )
}

export default ShippingSection