import "./new.scss";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import StarIcon from '@mui/icons-material/Star';
import Switch from 'react-switch'

const Edit = ({ title }) => {
    const [active, setActive] = useState(true);
    const starIcon = <StarIcon className="icon" />;
    const activeText = active ? 'Đã kích hoạt' : 'Đã bị vô hiệu';
    const isPercentageDiscount = false;
    const handleActive = () => {
        setActive(!active);
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <form className="offset-md-2 shadow p-3 col-md-8 row" >
                    <div className="col-md-12 row">
                        <div className="col-md-3">
                            <label className="fw-bold">Người viết</label>
                            <input className="col-md-12"></input>
                            <label className="mt-2 mb-2 fw-bold">Trạng thái</label><br />
                            <Switch />
                        </div>
                        <div className="col-md-9">
                            <label className="fw-bold">Sản phẩm</label>
                            <input value={'Gấu bông màu hống'} className="col-md-12 p-2"></input>
                            <label className="fw-bold mt-3">Nội dung</label>
                            <textarea className="col-md-12 p-2" value={'Hàng giao nhanh, chất lượng đúng như trong hình'}></textarea>
                            <label className="me-3">Đánh giá <StarIcon className="icon" style={{ "color": "yellow" }} /></label>
                            <select name="cars" id="cars" required className="p-1">
                                <option value="volvo">1</option>
                                <option value="volvo">2</option>
                                <option value="volvo">3</option>
                                <option value="volvo">4</option>
                                <option value="volvo">5</option>
                            </select>
                        </div>
                    </div>
                    <div className=" col-md-12 text-end">
                        <button type="button" className="btn btn-primary m-3">Lưu đánh giá</button>
                        <button type="button" className="btn btn-secondary">Hủy</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Edit;
