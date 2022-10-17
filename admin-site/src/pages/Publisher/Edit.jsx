import "./new.scss";
import axios from 'axios'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FileBase64 from 'react-file-base64'
import { useRef, useEffect, useState } from 'react'

const Edit = ({ title }) => {
    const [publisherName, setPublisherName] = useState('');
    const [publisherInfo, setPublisherInfo] = useState({ publisherName: '', publisherImage: '' });

    const changePublisherName = e => setPublisherName(e.target.value);

    const focusField = useRef();
    useEffect(() => {
        focusField.current.focus();
    }, []);
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const result = await axios.post('http://127.0.0.1:3002/api/publisher/create', publisherInfo)
            .then(
                data => {
                    console.log(data);
                })
            .catch(err => console.log(err));
        console.log("Upload thành công", result);
    }
    return (
        <>
            <div className="new" style={{ height: "100%" }}>
                <Sidebar />
                <div className="newContainer">
                    <Navbar />
                    <div className="top">
                        <h1>{title}</h1>
                    </div>
                    <form onSubmit={e => onSubmitHandler(e)}>
                        <div className="offset-md-2 shadow p-5 col-md-8 row" >
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Tên Nhà xuất bản:</label>
                                </div>
                                <input className="p-1 col-md-7" ref={focusField} type={"text"} onChange={e => changePublisherName(e)} placeholder="Nhập tên tác giả"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Hình nhà xuất bản:</label>
                                </div>
                                <FileBase64
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) => setPublisherInfo({ publisherName: publisherName, publisherImage: base64 })}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 text-center mt-5 mb-5">
                            <input type={"submit"} className="btn btn-primary text-white p-2 ps-3 pe-3" value={"Cập nhật"}></input>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Edit;
