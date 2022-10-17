import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from 'axios'
import Navbar from "../../components/navbar/Navbar";
import tokenData from '../../helpers/tokenData'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useRef, useState } from "react";

const Edit = ({ title }) => {
    const [bookName, setBookName] = useState();
    const [bookPrice, setBookPrice] = useState();
    const [bookDescription, setBookDescription] = useState();
    const [coverUrl, setCoverUrl] = useState();
    const [isbn, setIsbn] = useState();
    const [quantityLeft, setQuantityLeft] = useState();
    const [publisherId, setPublisherId] = useState();
    const [categoryId, setCategoryId] = useState();
    const [authorId, setAuthorId] = useState();
    const [file, setFile] = useState("");

    const changeBookName = e => setBookName(e.target.value);
    const changeBookPrice = e => setBookPrice(e.target.value);
    const changeBookDescription = e => setBookDescription(e.target.value)
    const changeIsbn = e => setIsbn(e.target.value);
    const changeQtyLeft = e => setQuantityLeft(e.target.value);
    const changePublisher = e => setPublisherId(e.target.value);
    const changeCategory = e => setCategoryId(e.target.value);
    const changeAuthor = e => setAuthorId(e.target.value);


    const focusField = useRef();
    useEffect(() => {
        focusField.current.focus();
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:3002/api/book', tokenData).then(
            data => {
                console.log(data);
            })
            .catch(err => alert(err));
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
                    <form >
                        <div className="offset-md-2 shadow p-5 col-md-8 row" >
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Tiêu đề</label>
                                </div>
                                <input className="p-1 col-md-7" ref={focusField} type={"text"} onChange={e => changeBookName(e)} placeholder="Nhập tựa đề sách"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Tác giả</label>
                                </div>
                                <select className="p-1 col-md-7" onChange={e => changeAuthor(e)}>
                                    <option>Tô Hoài</option>
                                </select>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3 d-flex">
                                    <label>Ảnh bìa</label>
                                </div>
                                <div className="col-md-7">
                                    <div className="formInput mb-4" style={{ width: "40%" }}>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </div>
                                    <img
                                        width={"100px"} height={"140px"}
                                        src={
                                            file
                                                ? URL.createObjectURL(file)
                                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                        }
                                        alt=""
                                    />
                                </div>

                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Mô tả</label>
                                </div>
                                <textarea className="p-1 col-md-7" onChange={e => changeBookDescription(e)} placeholder="Nhập mô tả sách"></textarea>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Gía bán</label>
                                </div>
                                <input className="p-1 col-md-7" type={"number"} onChange={e => changeBookPrice(e)} placeholder="Nhập giá bán"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Ảnh bìa:</label>
                                </div>
                                <input className="p-1 col-md-7" type={"text"} placeholder="Nhập tựa đề sách"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Nhà xuất bản:</label>
                                </div>
                                <input className="p-1 col-md-7" type={"text"} onChange={e => changePublisher(e)} value={""} placeholder="Nhập tựa đề sách"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Thể loại</label>
                                </div>
                                <select className="p-1 col-md-7" onChange={e => changeCategory(e)}>
                                    <option>Tô Hoài</option>
                                </select>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Nhà xuất bản</label>
                                </div>
                                <select className="p-1 col-md-7">
                                    <option>Tô Hoài</option>
                                </select>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Mã ISBN:</label>
                                </div>
                                <input className="p-1 col-md-7" type={"number"} onChange={e => changeIsbn(e)} placeholder="Nhập tựa đề sách"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Số lượng tồn</label>
                                </div>
                                <input className="p-1 col-md-7" type={"number"} onChange={e => changeQtyLeft(e)} placeholder="Nhập tựa đề sách"></input>
                            </div>
                        </div>
                        <div className="col-md-12 text-center m-5">
                            <button type="button" className="btn btn-primary text-white p-2 ps-3 pe-3">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div >
        </>

    );
};

export default Edit;
