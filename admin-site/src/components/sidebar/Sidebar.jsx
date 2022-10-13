import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import BookIcon from '@mui/icons-material/Book';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import StarIcon from '@mui/icons-material/Star';
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import Logo from '../../assets/images/logo.png'
import DelayLink from '../../helpers/delayLink'
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={Logo} alt="..." height="60" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">CHÍNH</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">DANH SÁCH</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Người dùng</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <BookIcon className="icon" />
              <span>Sách</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Đơn hàng</span>
            </li>
          </Link>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Vận chuyển</span>
          </li>
          <Link to="/vouchers" style={{ textDecoration: "none" }}>
            <li>
              <DiscountOutlinedIcon className="icon" />
              <span>Vouchers</span>
            </li>
          </Link>
          <Link to="/ratings" style={{ textDecoration: "none" }}>
            <li>
              <StarIcon className="icon" />
              <span>Đánh giá</span>
            </li>
          </Link>
          <p className="title">HỮU ÍCH</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Thống kê</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Thông báo</span>
          </li>
          <p className="title">DỊCH VỤ</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Sức khỏe hệ thống</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Cài đặt</span>
          </li>
          <p className="title">NGƯỜI DÙNG</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Thông tin cá nhân</span>
          </li>
          <DelayLink to={"/login"}>
            <li onClick={() => { localStorage.setItem("loggedIn", false); }}>
              <ExitToAppIcon className="icon" />
              <span>Đăng xuất</span>
            </li>
          </DelayLink>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
