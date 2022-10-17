import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useRef, useEffect, useState } from 'react'
import FileBase64 from 'react-file-base64'
import axios from 'axios'

const Edit = ({ title }) => {
    const [data, setData] = useState([]);
    const [authorName, setAuthorName] = useState('');
    const [biography, setBiography] = useState('');
    const [authorInfo, setAuthorInfo] = useState({ authorName: '', authorImage: '', biography: '' });


    const changeAuthorName = e => setAuthorName(e.target.value);
    const changeBiography = e => setBiography(e.target.value);

    const focusField = useRef();
    useEffect(() => {
        focusField.current.focus();
    }, []);
    useEffect(() => {
        axios.get("http://127.0.0.1:3002/api/author/")
            .then(data => {
                setData(data.data.data);
            })
    }, [])

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const result = await axios.post('http://127.0.0.1:3002/api/author/create', authorInfo)
            .then(
                data => {
                    console.log(data.data.data);
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
                                    <label>Tác giả:</label>
                                </div>
                                <input className="p-1 col-md-7" ref={focusField} type={"text"} onChange={e => changeAuthorName(e)} placeholder="Nhập tên tác giả"></input>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Tiểu sử:</label>
                                </div>
                                <textarea className="p-1 col-md-7" type={"text"} onChange={e => changeBiography(e)} placeholder="Nhập tiểu sử tác giả"></textarea>
                            </div>
                            <div className="d-flex row mb-4">
                                <div className="me-4 fw-bold col-md-3">
                                    <label>Hình tác giả:</label>
                                </div>
                                <div className="col-md-7">
                                    <FileBase64
                                        type="file"
                                        multiple={false}
                                        onDone={({ base64 }) => setAuthorInfo({ authorName: authorName, biography: biography, authorImage: base64 })}
                                    />
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
