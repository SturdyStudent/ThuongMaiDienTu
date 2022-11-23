import React, { useEffect, useState } from 'react'
import './ReviewModal.css'
import { Navigate } from 'react-router-dom';
import Cover from '../../assets/images/bookCover.png'
import SearchInput, { createFilter } from 'react-search-input'
import axios from 'axios';
import { Element } from 'react-scroll'
import BaseUrl from '../../helpers/baseUrl';
import _ from 'lodash'

export default function SearchEmployeeModal({ changeSelectedEmployee, callbackSetOpenEmployeeModal }) {
    const [employeeList, setemployeeList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeSearchTerm = (e) => setSearchTerm(e.target.value);

    const handleCloseSuccessModal = () => {
        callbackSetOpenEmployeeModal(false);
    }
    const preventPropagation = (event) => {
        event.stopPropagation();
    }

    useEffect(() => {
        axios.get(`${BaseUrl}/employee`)
            .then(employees => {
                setemployeeList(employees.data.data);
            })
    }, [])

    var results = _.map(employeeList, function (o) {
        if (String(o.HoTenNV).toLowerCase().includes(searchTerm.toLowerCase())) return o;
    })

    var results = _.without(results, undefined);


    const [redirect, setRedirect] = useState(false);
    function handleRedirect(e) {
        e.preventDefault();
        setRedirect(true);
    }
    if (redirect) {
        return <Navigate to={"/"} replace />
    }
    return (
        <>
            <div className='container-out-notification row' onClick={handleCloseSuccessModal}>
                <div className='container-notification offset-4 col-md-4 p-4' style={{ "top": "12vh" }} onClick={preventPropagation}>
                    <div className='text-start'>Thêm nhân viên</div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" onChange={e => handleChangeSearchTerm(e)} placeholder="Nhập tên nhân viên" aria-label="Recipient's employeename" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <span className="input-group-text bg-primary text-white" id="basic-addon2">Tìm kiếm</span>
                        </div>
                    </div>
                    <hr />
                    <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                    <Element name="test7" className="element" id="containerElement" style={{
                        position: 'relative',
                        height: '300px',
                        overflow: 'scroll'
                    }}>
                        {
                            results.map((item) => {
                                return (
                                    <div key={item.MaNV} className=" pt-4 border-bottom pb-3">
                                        <div className='row col-md-12'>
                                            <div className='col-md-3 d-flex justify-content-center'>
                                                <button onClick={() => { changeSelectedEmployee(item); handleCloseSuccessModal(); }} type='button' style={{ maxHeigh: "40px", width: "70px" }} className='btn btn-danger text-white'>Chọn</button>
                                            </div>
                                            <div className='col-md-4 text-start'>
                                                {item.HoTenNV}
                                            </div>
                                            <div className='col-md-4 text-start' >
                                                {item.Email}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Element>
                    <div>
                        <button className='back-notification-btn' onClick={(e) => handleRedirect(e)}>Lưu</button>
                    </div>
                </div>
            </div>
        </>
    )
}