import React, { useState, useEffect } from 'react'
import './ReviewModal.css'
import { Navigate } from 'react-router-dom';
import Cover from '../../assets/images/bookCover.png'
import axios from 'axios';
import BaseUrl from '../../helpers/baseUrl'
import { Element } from 'react-scroll'
import _ from 'lodash'
import { loadImageUrl } from '../../helpers/baseUrl';

export default function SearchModal({ callbackSetOpenBookModal, changeSelectedBooks }) {
    const [bookList, setBookList] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    const preventPropagation = (event) => {
        event.stopPropagation();
    }
    const [redirect, setRedirect] = useState(false);
    function handleRedirect(e) {
        e.preventDefault();
        setRedirect(true);
    }

    useEffect(() => {
        axios.get(`${BaseUrl}/book`)
            .then(result => {
                setBookList(result.data.data);
            })
    }, [])

    var results = _.map(bookList, function (o) {
        if (String(o.TenSach).toLowerCase().includes(searchTerm.toLowerCase())) return o;
    })

    var results = _.without(results, undefined);


    if (redirect) {
        return <Navigate to={"/"} replace />
    }
    return (
        <>
            <div className='container-out-notification row' onClick={() => { callbackSetOpenBookModal(false) }}>
                <div className='container-notification offset-4 col-md-4 p-4' style={{ "top": "12vh" }} onClick={preventPropagation}>
                    <div className='text-start'>Thêm sách</div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Nhập tên sản phẩm" aria-label="Recipient's username" aria-describedby="basic-addon2" />
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
                        {results && results.map(item => {
                            return (
                                <div key={item.MaSach} className=" pt-4 border-bottom pb-3">
                                    <div className='row'>
                                        <div className='col-md-2 d-flex justify-content-center' >
                                            <div className='book-detail-cover-view rounded-circle' style={{ width: "50px", height: "70px" }}>
                                                <img src={`http://127.0.0.1:3002/public/${item.AnhBia}`} alt="..." />
                                            </div>
                                        </div>
                                        <div className='col-md-4 fw-bold text-start'>
                                            {item.TenSach}
                                        </div>
                                        <div className='col-md-3 text-start' >
                                            Còn lại {Number(item.SoLuongTon).toLocaleString()} cuốn
                                        </div>
                                        <div className="col-md-3 text-start p-0">
                                            {Number(item.GiaBan).toLocaleString()} vnđ
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='text-white btn btn-danger' onClick={() => { changeSelectedBooks({ ...item, SoLuong: 1 }); callbackSetOpenBookModal(false); }} type='button'>Chọn</button>
                                    </div>
                                </div>
                            )
                        })}
                    </Element>
                </div>
            </div>
        </>
    )
}