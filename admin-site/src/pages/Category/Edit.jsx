import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useRef, useEffect, useState } from 'react'
import SuccessModal from '../../components/modal/SuccessModalNotification'
import BaseUrl from '../../helpers/baseUrl'
import axios from 'axios'
import { useLocation } from "react-router-dom";

const Edit = ({ title }) => {
    const [categoryName, setCategoryName] = useState('');
    const [successNotification, setSuccessNotification] = useState();

    const changeCategoryName = e => setCategoryName(e.target.value);

    const location = useLocation();
    let id = null;
    try {
        id = location.state.id;
    } catch (err) {
        console.log(err);
    }

    const focusField = useRef();
    useEffect(() => {
        focusField.current.focus();
    }, []);



    useEffect(() => {
        try {
            if (id) {
                axios.get(`${BaseUrl}/category/${id}`)
                    .then(result => {
                        let obj = result.data.data[0];
                        setCategoryName(obj.TenChuDe);
                    });
            }
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            handleUpdateCategory();
        } else {
            handleCreateCategory();
        }
    }


    const handleCreateCategory = () => {
        axios.post(`${BaseUrl}/category/create`, {
            TenChuDe: categoryName
        }).then(result => {
            setSuccessNotification(result.data.message);
            console.log(result);
        })
            .catch(err => console.log(err));
    }
    const handleUpdateCategory = () => {
        axios.put(`${BaseUrl}/category/update/${id}`, {
            TenChuDe: categoryName,
        }).then(result => {
            setSuccessNotification(result.data.message);
            console.log(result);
        })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className="new" style={{ height: "100%" }}>
                {successNotification && <SuccessModal successNotification={successNotification} />}
                <Sidebar />
                <div className="newContainer">
                    <Navbar />
                    <div className="top">
                        <h1>{title}</h1>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="offset-md-2 shadow p-5 col-md-8 row" >
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Thể loại</label>
                                </div>
                                <input className="p-1 col-md-7" ref={focusField} type={"text"} value={categoryName || ''} onChange={e => changeCategoryName(e)} placeholder="Nhập thể loại sách"></input>
                            </div>
                        </div>
                        <div className="col-md-12 text-center mb-5">
                            <button type="submit" className="btn btn-primary text-white p-2 ps-3 pe-3">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Edit;
