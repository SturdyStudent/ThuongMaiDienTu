import React, { useState, useEffect } from 'react'
import { baseUrl } from '../baseUrl';
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import PhoneCode from 'react-phone-code';
import { format } from "date-fns";
import { HalfMalf } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

function Register({ callbackChangeLoginPage }) {
    const [adminName, setAdminName] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sex, setSex] = useState("Nam");
    const [isLoading, setIsLoading] = useState(false);
    const [phoneCode, setPhoneCode] = useState("+84");
    const [provinces, setProvinces] = useState('');
    const [provinceId, setProvinceId] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [districts, setDistricts] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [wards, setWards] = useState('');
    const [wardName, setWardName] = useState('');
    const [displayError, setDisplayError] = useState('');

    const [redirect, setRedirect] = useState(false);

    const getLocationUrl = "https://provinces.open-api.vn/api/"

    const changeAdminName = e => setAdminName(e.target.value);
    const changeUserName = e => setUsername(e.target.value);
    const changeAddress = e => setAddress(e.target.value);
    const changePhoneNumber = e => setPhoneNumber(e.target.value);
    const changeEmail = e => setEmail(e.target.value);
    const changePassword = e => setPassword(e.target.value);
    const changeConfirmPass = e => setConfirmPassword(e.target.value);
    const changeProvinceId = e => setProvinceId(e.target.value);
    const changeDistrictId = e => {
        setDistrictId(e.target.value);
    }
    const changeWardName = e => {
        setWardName(e.target.value);
    }
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

    if (redirect) {
        return <Navigate to={"/verify-otp"} />;
    }

    const handleRegister = (e) => {
        setIsLoading(true);
        axios.post(`${baseUrl}/clientAuth/register`, {
            HoTen: `${adminName}`,
            TaiKhoan: `${username}`,
            MatKhau: `${password}`,
            Email: `${email}`,
            DiaChi: `${address} ${wardName} ${districtName} ${provinceName}`,
            DienThoai: `${phoneCode} ${phoneNumber}`,
            GioiTinh: `${sex}`,
            NgaySinh: `${birthDate}`,
            XacNhanMatKhau: `${confirmPassword}`
        }).then((res) => {
            localStorage.setItem('USER_LOGIN_INFORMATION', email);
            if (res.status === 200) {
                setRedirect(true);
            }
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            try {
                if ((String)(err.response.data.message) === "Lỗi xác thực") {
                    setDisplayError(err.response.data.data[0].msg);
                } else {
                    setDisplayError(err.response.data.message);
                }
            } catch (e) {
                setDisplayError("Lỗi không rõ xảy ra trong lúc đăng kí, vui lòng kiểm tra lại kết nối mạng");
            }
        });
        e.preventDefault();
    }

    return (
        <div id='register-section'>
            <h3>TẠO TÀI KHOẢN MỚI</h3>
            <hr />
            {isLoading && <HalfMalf center="false" width="150px" height="150px" />}
            <form id='form' onSubmit={(e) => { handleRegister(e); }}>
                <p className='fw-bold'>Họ tên người dùng:</p>
                <input type="text" name="user" value={adminName} onChange={e => changeAdminName(e)} className='col-md-12 p-2 mb-3' placeholder='Nhập tên người dùng' ></input>
                <p className='fw-bold'>Tài khoản người dùng:</p>
                <input type="text" name="username" value={username} onChange={e => changeUserName(e)} className='col-md-12 p-2 mb-3' placeholder='Nhập tên tài khoản' ></input>
                <p className='fw-bold'>Địa chỉ <span className='text-danger h6'>(Lưu ý chỉ điền số nhà, tổ, khu phố)</span></p>
                <input type="text" name='address' value={address} onChange={e => changeAddress(e)} className='col-md-12 p-2 mb-3' placeholder='Nhập số nhà, tên đường của bạn' ></input><br />
                <div className='d-flex justify-content-between mb-4 mt-3'>
                    <select name="province-select" onChange={e => changeProvinceId(e)} id="province-select" className='p-1'>
                        <option value="selectProvince">--Chọn tỉnh / thành phố--</option>
                        {provinces && provinces.map((val) =>
                            <option key={val.code} value={val.code}>{val.name}</option>
                        )}
                    </select>
                    <select name="distric-select" id="district-select" onChange={e => changeDistrictId(e)} className='p-1'>
                        <option value="selectDistric">--Chọn quận / huyện--</option>
                        {districts && districts.districts.map((val) =>
                            <option key={val.code} value={val.code}>{val.name}</option>
                        )}
                    </select>
                    <select name="ward-select" id="ward-select" onChange={e => changeWardName(e)} className='p-1'>
                        <option value="selectWard">--Chọn xã / phường--</option>
                        {wards && wards.wards.map((val) =>
                            <option key={val.code} value={val.name}>{val.name}</option>
                        )}
                    </select>
                </div>

                <div className='d-flex'>
                    <div>
                        <h6>Mã vùng:</h6>
                        <PhoneCode
                            onSelect={code => setPhoneCode(code)} // required
                            showFirst={['VN', 'IN']}
                            defaultValue='select county'
                            id='some-id'
                            name='some-name'
                            className='p-2 me-4'
                            optionClassName='some option class name'
                        />
                    </div>
                    <div>
                        <h6>Số điện thoại:</h6>
                        <input type="number" name="phone-number" value={phoneNumber} onChange={e => changePhoneNumber(e)} className='p-2 mb-3' placeholder='Nhập số điện thoại' ></input>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <p className='fw-bold'>Giới tính:</p>
                        <div onChange={e => setSex(e.target.value)}>
                            <input type="radio" className='me-2' name="gender" value={'Nam'} onChange={() => { }} checked={sex === 'Nam'} />
                            Nam
                            <input type="radio" className='ms-2 me-2' name="gender" value={'Nữ'} onChange={() => { }} checked={sex === 'Nữ'} />
                            Nữ
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <p className='fw-bold'>Ngày sinh:</p>
                        <input type={'date'} className='p-2' onChange={e => setBirthDate(e.target.value)} value={birthDate || format(new Date(), 'yyyy-MM-dd')} />
                    </div>
                </div>

                <p className='fw-bold'>Email:</p>
                <input type="email" name="email" value={email} onChange={e => changeEmail(e)} className='col-md-12 p-2 mb-3' placeholder='Nhập tài khoản email' ></input>
                <p className='fw-bold'>Mật khẩu</p>
                <input type="password" name='pass' onChange={e => changePassword(e)} value={password} className='col-md-12 p-2 mb-3' placeholder='Nhập mật khẩu' ></input><br />
                <p className='fw-bold'>Nhập lại mật khẩu</p>
                <input type="password" name="rePass" value={confirmPassword} onChange={e => changeConfirmPass(e)} className='col-md-12 p-2 mb-3' placeholder='Nhập lại mật khẩu' ></input>
                <input type="submit" className='border-0 p-2 text-white col-md-12' value="Đăng kí" name='submit' style={{ "backgroundColor": "#FF5F1F" }} ></input>
                <div className='text-center fw-bold mt-3'>
                    <div className='pe-auto cursor-pointer text-primary' onClick={(e) => callbackChangeLoginPage(e)}>Chuyển sang trang đăng nhập</div>
                </div>
                {<p className='text-danger fw-bold mt-2'>{String(displayError)}</p>}
            </form>
        </div>
    )
}

export default Register