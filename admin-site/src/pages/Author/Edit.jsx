import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useRef, useEffect, useState } from 'react'
import SuccessModal from '../../components/modal/SuccessModalNotification'
import { useLocation } from "react-router-dom";
import axios from 'axios'
import BaseUrl from "../../helpers/baseUrl";

const Edit = ({ title }) => {
    const [authorName, setAuthorName] = useState('');
    const [biography, setBiography] = useState('');
    const [authorAddress, setAuthorAddress] = useState();
    const [authorPhone, setAuthorPhone] = useState();

    const [successNotification, setSuccessNotification] = useState();

    const changeAuthorName = e => setAuthorName(e.target.value);
    const changeBiography = e => setBiography(e.target.value);
    const changeAuthorPhone = e => setAuthorPhone(e.target.value);
    const changeAuthorAddress = e => setAuthorAddress(e.target.value);

    const location = useLocation();
    let id = null;
    try {
        id = location.state.id;
    } catch (err) {
    }

    const focusField = useRef();
    useEffect(() => {
        focusField.current.focus();
    }, []);


    useEffect(() => {
        try {
            if (id) {
                axios.get(`${BaseUrl}/author/${id}`)
                    .then(result => {
                        let obj = result.data.data[0];
                        setAuthorName(obj.TenTacGia);
                        setBiography(obj.TieuSu);
                        setAuthorAddress(obj.DiaChi);
                        setAuthorPhone(obj.DienThoai);
                    });
            }
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            handleUpdateAuthor();
        } else {
            handleCreateAuthor();
        }
    }

    const handleCreateAuthor = () => {
        axios.post(`${BaseUrl}/author/create`, {
            TenTacGia: authorName,
            TieuSu: biography,
            DienThoai: authorPhone,
            DiaChi: authorAddress
        }).then(
            result => {
                setSuccessNotification(result.data.message);
            })
            .catch(err => console.log(err));
    }

    const handleUpdateAuthor = () => {
        axios.put(`${BaseUrl}/author/update/${id}`, {
            TenTacGia: authorName,
            TieuSu: biography,
            DienThoai: authorPhone,
            DiaChi: authorAddress
        }).then(
            result => {
                setSuccessNotification(result.data.message);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className="new" style={{ height: "100%" }}>
                <Sidebar />
                {successNotification && <SuccessModal successNotification={successNotification} />}
                <div className="newContainer">
                    <Navbar />
                    <div className="top">
                        <h1>{title}</h1>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="offset-md-2 shadow p-5 col-md-8 row" >
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Tác giả:</label>
                                </div>
                                <input className="p-1 col-md-7" ref={focusField} type={"text"} onChange={e => changeAuthorName(e)} value={authorName || ''} placeholder="Nhập tên tác giả"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Tiểu sử:</label>
                                </div>
                                <textarea className="p-1 col-md-7" type={"text"} onChange={e => changeBiography(e)} value={biography || ''} placeholder="Nhập tiểu sử tác giả"></textarea>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Địa chỉ:</label>
                                </div>
                                <textarea className="p-1 col-md-7" type={"address"} onChange={e => changeAuthorAddress(e)} value={authorAddress || ''} placeholder="Nhập địa chỉ tác giả"></textarea>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Điện thoại:</label>
                                </div>
                                <input className="p-1 col-md-7" type={"number"} onChange={e => changeAuthorPhone(e)} value={authorPhone || ''} placeholder="Nhập điện thoại tác giả"></input>
                            </div>

                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Hình tác giả:</label>
                                </div>
                                <div className="col-md-7">

                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 text-center mb-5 mt-5">
                            <input type={"submit"} className="btn btn-primary text-white p-2 ps-3 pe-3" value={"Cập nhật"}></input>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default Edit;
