import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useRef, useEffect, useState } from 'react'

const Edit = ({ title }) => {
    const [categoryName, setCategoryName] = useState('');

    const changeCategoryName = e => setCategoryName(e.target.value);

    const focusField = useRef();
    useEffect(() => {
        focusField.current.focus();
    }, []);


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
                        <div className="offset-md-2 shadow p-5 col-md-8 row" >
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Thể loại</label>
                                </div>
                                <input className="p-1 col-md-7" ref={focusField} type={"text"} onChange={e => changeCategoryName(e)} placeholder="Nhập thể loại sách"></input>
                            </div>
                        </div>
                        <div className="col-md-12 text-center mb-5">
                            <button type="button" className="btn btn-primary text-white p-2 ps-3 pe-3">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default Edit;
