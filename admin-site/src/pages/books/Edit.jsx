import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useRef, useEffect, useState } from 'react'
import SuccessModal from '../../components/modal/SuccessModalNotification'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { useLocation } from "react-router-dom";
import { format } from 'date-fns'
import axios from 'axios'
import BaseUrl from "../../helpers/baseUrl";

const Edit = ({ title }) => {
    const [bookName, setBookName] = useState('');
    const [bookPrice, setBookPrice] = useState('');
    const [bookDescription, setBookDescription] = useState();
    const [qtyLeft, setQtyLeft] = useState();
    const [publisher, setPublisher] = useState("default");
    const [author, setAuthor] = useState("default");
    const [category, setCategory] = useState("default");
    const [imgCover, setImgCover] = useState();

    const [authorOptions, setAuthorOptions] = useState();
    const [publisherOptions, setPublisherOptions] = useState();
    const [categoryOptions, setCategoryOptions] = useState();

    const [successNotification, setSuccessNotification] = useState();

    const [file, setFile] = useState();
    const [name, setName] = useState();

    const hanldeUploadImg = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", name);
        data.append("file", file);

        axios.post(`${BaseUrl}/upload`, data)
            .then((result) => {
                setImgCover(result.data.data);
                handleSubmit();
            }).catch(err => console.log(err));
    };

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
            axios.get(`${BaseUrl}/author/`)
                .then(result => {
                    let obj = result.data.data;
                    setAuthorOptions(obj);
                });
        } catch (err) {
            console.log(err);
        }
    }, []);
    useEffect(() => {
        try {
            axios.get(`${BaseUrl}/publisher/`)
                .then(result => {
                    let obj = result.data.data;
                    setPublisherOptions(obj);
                });
        } catch (err) {
            console.log(err);
        }
    }, []);
    useEffect(() => {
        try {
            axios.get(`${BaseUrl}/category/`)
                .then(result => {
                    let obj = result.data.data;
                    setCategoryOptions(obj);
                });
        } catch (err) {
            console.log(err);
        }
    }, []);
    useEffect(() => {
        try {
            if (id) {
                axios.get(`${BaseUrl}/book/${id}`)
                    .then(result => {
                        let obj = result.data.data[0];
                        setBookName(obj.TenSach);
                        setBookPrice(obj.GiaBan);
                        setBookDescription(obj.MoTa);
                        setQtyLeft(obj.SoLuongTon);
                        setAuthor(obj.MaTacGia);
                        setPublisher(obj.MaNXB);
                        setCategory(obj.MaChuDe)
                        setImgCover(obj.AnhBia)
                    });
            }
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    const handleSubmit = () => {
        if (id) {
            handleUpdateBook(imgCover);
        } else {
            handleCreateBook(imgCover);
        }
    }

    const handleCreateBook = () => {
        axios.post(`${BaseUrl}/book/create`, {
            "TenSach": bookName,
            "GiaBan": bookPrice,
            "MoTa": bookDescription,
            "AnhBia": imgCover,
            "NgayCapNhat": String(format(Date.now(), 'yyyy-MM-dd')),
            "SoLuongTon": qtyLeft,
            "MaNXB": publisher,
            "MaChuDe": category,
            "MaTacGia": author
        }).then(
            result => {
                setSuccessNotification(result.data.message);
            })
            .catch(err => console.log(err));
    }

    const handleUpdateBook = () => {
        axios.put(`${BaseUrl}/book/update/${id}`, {
            "TenSach": bookName,
            "GiaBan": bookPrice,
            "MoTa": bookDescription,
            "AnhBia": imgCover,
            "NgayCapNhat": String(format(Date.now(), 'yyyy-MM-dd')),
            "SoLuongTon": qtyLeft,
            "MaNXB": publisher,
            "MaChuDe": category,
            "MaTacGia": author
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
                    <form onSubmit={e => hanldeUploadImg(e)}>
                        <div className="offset-md-2 shadow p-5 col-md-8 row" >
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Tên sách:</label>
                                </div>
                                <input className="p-1 col-md-7" ref={focusField} type={"text"} onChange={e => setBookName(e.target.value)} value={bookName || ''} placeholder="Nhập tên sách"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Giá bán:</label>
                                </div>
                                <input className="p-1 col-md-7" type={"number"} onChange={e => setBookPrice(e.target.value)} value={bookPrice || ''} placeholder="Nhập giá bán"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Mô tả:</label>
                                </div>
                                <textarea className="p-1 col-md-7" onChange={e => setBookDescription(e.target.value)} value={bookDescription || ''} placeholder="Nhập mô tả sách"></textarea>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Số lượng tồn:</label>
                                </div>
                                <input className="p-1 col-md-7" type={"number"} onChange={e => setQtyLeft(e.target.value)} value={qtyLeft || ''} placeholder="Nhập số lượng tồn"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Nhà xuất bản:</label>
                                </div>
                                <select className="p-1 col-md-7 text-center" defaultValue={publisher} type={"number"} onChange={e => setPublisher(e.target.value)}  >
                                    <option value="default">---------  Chọn Nhà xuất bản  ----------</option>
                                    {publisherOptions && publisherOptions.map((item) => {
                                        return (
                                            <option value={item.MaNXB} key={item.MaNXB} selected={item.MaNXB === publisher}>{item.TenNXB}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Thể loại:</label>
                                </div>
                                <select className="p-1 col-md-7 text-center" type={"number"} defaultValue={category} onChange={e => setCategory(e.target.value)}  >
                                    <option value="default">----------&nbsp;&nbsp;&nbsp;&nbsp;   Chọn Thể loại   &nbsp;&nbsp;&nbsp;&nbsp;----------</option>
                                    {categoryOptions && categoryOptions.map((item) => {
                                        return (
                                            <option key={item.MaChuDe} value={item.MaChuDe} selected={item.MaChuDe === category}>{item.TenChuDe}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Tác giả:</label>
                                </div>
                                <select className="p-1 col-md-7 text-center" defaultValue={author} type={"number"} onChange={e => setAuthor(e.target.value)} >
                                    <option value="default">----------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Chọn Tác giả     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----------</option>
                                    {authorOptions && authorOptions.map((item) => {
                                        return (
                                            <option key={item.MaTacGia} value={item.MaTacGia} selected={item.MaTacGia === author}>{item.TenTacGia}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>{imgCover && imgCover} a</div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Hình sách:</label>
                                </div>
                                <div className="col-md-7">
                                    <div className="formInput" style={{ width: "100px", height: "130px" }}>
                                        <img
                                            src={
                                                file
                                                    ? URL.createObjectURL(file)
                                                    : (imgCover ? `http://localhost:3002/public/${imgCover}` : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")
                                            }
                                            alt=""
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                        <label htmlFor="file" className="pe-auto user-select">
                                            Chọn hình: <DriveFolderUploadOutlinedIcon className="icon" />
                                        </label>

                                        <input
                                            type="file"
                                            id="file"
                                            accept=".jpg"
                                            onChange={(e) => { setFile(e.target.files[0]); setName("book" + String(e.target.value).split('\\')[2]); }}
                                            style={{ display: "none" }}
                                            className="pe-auto user-select"
                                        />
                                    </div>
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
