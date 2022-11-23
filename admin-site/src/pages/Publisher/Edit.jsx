import "./new.scss";
import axios from 'axios'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import SuccessModal from '../../components/modal/SuccessModalNotification'
import { useRef, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import BaseUrl from "../../helpers/baseUrl";

const Edit = ({ title }) => {
    const [publisherName, setPublisherName] = useState('');
    const [publisherAddress, setPublisherAddress] = useState('');
    const [publisherPhone, setPublisherPhone] = useState('');

    const changePublisherName = e => setPublisherName(e.target.value);
    const changePublisherPhone = e => setPublisherPhone(e.target.value);
    const changePublisherAddress = e => setPublisherAddress(e.target.value);

    const [successNotification, setSuccessNotification] = useState();


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
        focusField.current.focus();
    }, []);

    useEffect(() => {
        try {
            if (id) {
                axios.get(`${BaseUrl}/publisher/${id}`)
                    .then(result => {
                        let obj = result.data.data[0];
                        setPublisherName(obj.TenNXB);
                        setPublisherAddress(obj.Diachi);
                        setPublisherPhone(obj.DienThoai);
                    });
            }
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            handleUpdatePublisher();
        } else {
            handleCreatePublisher();
        }
    }

    const handleCreatePublisher = () => {
        axios.post(`${BaseUrl}/publisher/create`, {
            TenNXB: publisherName,
            DiaChi: publisherAddress,
            DienThoai: publisherPhone,
        }).then(
            result => {
                setSuccessNotification(result.data.message);
            })
            .catch(err => console.log(err));
    }

    const handleUpdatePublisher = () => {
        axios.put(`${BaseUrl}/publisher/update/${id}`, {
            TenNXB: publisherName,
            DiaChi: publisherAddress,
            DienThoai: publisherPhone,
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
                                    <label>Tên Nhà xuất bản:</label>
                                </div>
                                <input className="p-1 col-md-7" ref={focusField} type={"text"} value={publisherName || ''} onChange={e => changePublisherName(e)} placeholder="Nhập tên nhà xuất bản"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Địa chỉ nhà xuất bản:</label>
                                </div>
                                <input className="p-1 col-md-7" ref={focusField} type={"text"} value={publisherAddress || ''} onChange={e => changePublisherAddress(e)} placeholder="Nhập địa chỉ nhà xuất bản"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Số điện thoại xuất bản:</label>
                                </div>
                                <input className="p-1 col-md-7" ref={focusField} type={"number"} value={publisherPhone || ''} onChange={e => changePublisherPhone(e)} placeholder="Nhập số điện thoại nhà xuất bản"></input>
                            </div>
                        </div>
                        <div className="col-md-12 text-center mt-5 mb-5">
                            <input type={"submit"} className="btn btn-primary text-white p-2 ps-3 pe-3"></input>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Edit;
