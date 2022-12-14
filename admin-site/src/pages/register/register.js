import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/logo.png';
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import DelayLink from '../../helpers/delayLink';
import '../login/PartnerLoginPage.css'
import { HalfMalf } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'
import { axiosConfig } from '../../axiosConfig';
import PhoneCode from 'react-phone-code';

function Register() {
    const [adminName, setAdminName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [brandName, setBrandName] = useState('');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [role, setRole] = useState("admin");
    const [isLoading, setIsLoading] = useState(false);
    const [phoneCode, setPhoneCode] = useState("+84");
    const [provinces, setProvinces] = useState();
    const [provinceId, setProvinceId] = useState();
    const [provinceName, setProvinceName] = useState();
    const [districts, setDistricts] = useState();
    const [districtName, setDistrictName] = useState('');
    const [districtId, setDistrictId] = useState();
    const [wards, setWards] = useState();
    const [wardName, setWardName] = useState('');
    const [displayError, setDisplayError] = useState();

    const [redirect, setRedirect] = useState(false);

    const getLocationUrl = "https://provinces.open-api.vn/api/"
    const registerPartner = `${axiosConfig.url}/register`;

    const changeAdminName = e => setAdminName(e.target.value);
    const changeAddress = e => setAddress(e.target.value);
    const changePhoneNumber = e => setPhoneNumber(e.target.value);
    const changeBrandName = e => setBrandName(e.target.value);
    const changeEmail = e => setEmail(e.target.value);
    const changePassword = e => setPassword(e.target.value);
    const changeConfirmPass = e => setConfirmPassword(e.target.value);
    const changeRole = e => setRole(e.target.value);
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
                if (element.code === districtId) {
                    setDistrictName(element.name);
                }
            });
        }
    }, [districtId, districts]);

    useEffect(() => {
        if (provinces) {
            provinces.forEach(element => {
                if (element.code === provinceId) {
                    setProvinceName(element.name);
                }
            });
        }
    }, [provinceId, provinces]);

    const handleRegister = (e) => {
        setIsLoading(true);
        axios.post(registerPartner, {
            adminName: `${adminName}`,
            address: `${address}${wardName} ${districtName} ${provinceName}`,
            phoneNumber: `${phoneCode} ${phoneNumber}`,
            brandName: `${brandName}`,
            email: `${email}`,
            password: `${password}`,
            confirmPassword: `${confirmPassword}`,
            role: `${role}`
        }).then((res) => {
            localStorage.setItem('USER_LOGIN_INFORMATION', email);
            console.log(res.data + " " + res.status);
            if (res.status === 200) {
                setTimeout(() => { setRedirect(true); setIsLoading(false) }, 800);
            }
        }).catch((err) => {
            setIsLoading(false);
            if ((String)(err.response.data.message) === "L???i x??c th???c") {
                setDisplayError(err.response.data.data[0].msg);
            } else {
                setDisplayError(err.response.data.message);
            }
        });
        e.preventDefault();
    }

    if (redirect) {// chuy???n h?????ng ?????n trang partner sau khi ????ng k?? th??nh c??ng
        return <Navigate to={'/verify-otp'} replace />
    }

    return (
        <div className="row login-bg" style={{ "margin": "0px", minHeight: "150vh" }}>
            <div className=' d-flex justify-content-center align-items-center card-parent'>
                {isLoading && <HalfMalf center="false" width="150px" height="150px" />}
                <div class="card p-4 shadow-lg m-5" style={{ width: '45rem', borderRadius: "20px" }}>
                    <div class="card-body">
                        <div className='justify-content-center mb-3 text-center'>
                            <img src={Logo} alt="..." height="80px"></img>
                        </div>
                        <h5 class="card-title fw-bold">T???o t??i kho???n Partner m???i!</h5>
                        <p class="card-text">L??n danh s??ch c??c kh??ch h??ng t???i Powell's Book v?? ????? ch??ng t??i gi??p b???n k???t n???i v???i h??ng tri???u ng?????i d??ng!</p>
                        <form id='form' onSubmit={handleRegister}>
                            <p className='fw-bold'>T??n ng?????i d??ng:</p>
                            <input type="text" name="user" value={adminName} onChange={e => changeAdminName(e)} className='col-md-12 p-2 mb-3' placeholder='Nh???p t??n ng?????i d??ng' ></input>
                            <p className='fw-bold'>?????a ch???</p>
                            <input type="text" name='address' value={address} onChange={e => changeAddress(e)} className='col-md-12 p-2 mb-3' placeholder='Nh???p s??? nh??, t??n ???????ng c???a b???n' ></input><br />
                            <div className='d-flex justify-content-between mb-4 mt-3'>
                                <select name="province-select" onChange={e => changeProvinceId(e)} id="province-select" className='p-1'>
                                    <option value="selectProvince">--Ch???n t???nh / th??nh ph???--</option>
                                    {provinces && provinces.map((val) =>
                                        <option key={val.code} value={val.code}>{val.name}</option>
                                    )}
                                </select>
                                <select name="distric-select" id="district-select" onChange={e => changeDistrictId(e)} className='p-1'>
                                    <option value="selectDistric">--Ch???n qu???n / huy???n--</option>
                                    {districts && districts.districts.map((val) =>
                                        <option key={val.code} value={val.code}>{val.name}</option>
                                    )}
                                </select>
                                <select name="ward-select" id="ward-select" onChange={e => changeWardName(e)} className='p-1'>
                                    <option value="selectWard">--Ch???n x?? / ph?????ng--</option>
                                    {wards && wards.wards.map((val) =>
                                        <option key={val.code} value={val.name}>{val.name}</option>
                                    )}
                                </select>
                            </div>

                            <div className='d-flex'>
                                <div>
                                    <h6>M?? v??ng:</h6>
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
                                    <h6>S??? ??i???n tho???i:</h6>
                                    <input type="number" name="phone-number" value={phoneNumber} onChange={e => changePhoneNumber(e)} className='p-2 mb-3' placeholder='Nh???p s??? ??i???n tho???i' ></input>
                                </div>
                            </div>
                            <p className='fw-bold'>T??n th????ng hi???u:</p>
                            <input type="text" name='brandname' value={brandName} onChange={e => changeBrandName(e)} className='col-md-12 p-2 mb-3' placeholder='Nh???p t??n th????ng hi???u' ></input><br />
                            <p className='fw-bold'>Email:</p>
                            <input type="email" name="email" value={email} onChange={e => changeEmail(e)} className='col-md-12 p-2 mb-3' placeholder='Nh???p t??i kho???n email' ></input>
                            <p className='fw-bold'>M???t kh???u</p>
                            <input type="password" name='pass' onChange={e => changePassword(e)} value={password} className='col-md-12 p-2 mb-3' placeholder='Nh???p m???t kh???u' ></input><br />
                            <p className='fw-bold'>Nh???p l???i m???t kh???u</p>
                            <input type="password" name="rePass" value={confirmPassword} onChange={e => changeConfirmPass(e)} className='col-md-12 p-2 mb-3' placeholder='Nh???p l???i m???t kh???u' ></input>
                            <p className='fw-bold'>Vai tr??: &nbsp;<span>
                                <select name="role-select" id="role-select" value={role} onChange={e => changeRole(e)} className='p-1'>
                                    <option value={"admin"}>Qu???n tr??? h??? th???ng</option>
                                    <option value={"deliverBoy"}>Nh??n vi??n giao h??ng</option>
                                </select>
                            </span></p>

                            <input type="submit" className='border-0 p-2 text-white col-md-12' value="????ng k??" name='submit' style={{ "backgroundColor": "#FF5F1F" }} ></input>
                            {<p className='text-danger fw-bold mt-2'>{displayError}</p>}
                            <div className='text-center mt-3'> <b>???? c?? t??i kho???n?</b> &nbsp;
                                <DelayLink to={'/login'}>
                                    <span style={{ textDecoration: "none", fontWeight: "500" }}>????ng nh???p ngay!</span>
                                </DelayLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register