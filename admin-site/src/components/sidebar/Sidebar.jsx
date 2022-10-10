import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
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
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import {Nav} from "react-bootstrap";


// const Sidebar = () => {
//   const { dispatch } = useContext(DarkModeContext);
//   return (
    // <div className="sidebar">
    //   <div className="top">
    //     <Link to="/" style={{ textDecoration: "none" }}>
    //       <img src={Logo} alt="..." height="60" />
    //     </Link>
    //   </div>
    //   <hr />
    //   <div className="center">
    //     <ul>
    //       <p className="title">CHÍNH</p>
    //       <li>
    //         <DashboardIcon className="icon" />
    //         <span>Dashboard</span>
    //       </li>
    //       <p className="title">DANH SÁCH</p>
    //       <Link to="/users" style={{ textDecoration: "none" }}>
    //         <li>
    //           <PersonOutlineIcon className="icon" />
    //           <span>Người dùng</span>
    //         </li>
    //       </Link>
    //       <Link to="/products" style={{ textDecoration: "none" }}>
    //         <li>
    //           <StoreIcon className="icon" />
    //           <span>Sản phẩm</span>
    //         </li>
    //       </Link>
    //       <Link to="/orders" style={{ textDecoration: "none" }}>
    //         <li>
    //           <CreditCardIcon className="icon" />
    //           <span>Đơn hàng</span>
    //         </li>
    //       </Link>
    //       <li>
    //         <LocalShippingIcon className="icon" />
    //         <span>Vận chuyển</span>
    //       </li>
    //       <Link to="/vouchers" style={{ textDecoration: "none" }}>
    //         <li>
    //           <DiscountOutlinedIcon className="icon" />
    //           <span>Vouchers</span>
    //         </li>
    //       </Link>
    //       <Link to="/ratings" style={{ textDecoration: "none" }}>
    //         <li>
    //           <StarIcon className="icon" />
    //           <span>Đánh giá</span>
    //         </li>
    //       </Link>
    //       <p className="title">HỮU ÍCH</p>
    //       <li>
    //         <InsertChartIcon className="icon" />
    //         <span>Thống kê</span>
    //       </li>
    //       <li>
    //         <NotificationsNoneIcon className="icon" />
    //         <span>Thông báo</span>
    //       </li>
    //       <p className="title">DỊCH VỤ</p>
    //       <li>
    //         <SettingsSystemDaydreamOutlinedIcon className="icon" />
    //         <span>Sức khỏe hệ thống</span>
    //       </li>
    //       <li>
    //         <PsychologyOutlinedIcon className="icon" />
    //         <span>Logs</span>
    //       </li>
    //       <li>
    //         <SettingsApplicationsIcon className="icon" />
    //         <span>Cài đặt</span>
    //       </li>
    //       <p className="title">NGƯỜI DÙNG</p>
    //       <li>
    //         <AccountCircleOutlinedIcon className="icon" />
    //         <span>Thông tin cá nhân</span>
    //       </li>
    //       <li>
    //         <ExitToAppIcon className="icon" />
    //         <span>Đăng xuất</span>
    //       </li>
    //     </ul>
    //   </div>


      {/* <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
  
  <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
    <svg class="bi me-2" width="40" height="32"></svg>
    <span class="fs-4">Sidebar</span>
  </a>
  <hr/>
  <ul class="nav nav-pills flex-column mb-auto">
    <li class="nav-item">
      <a href="#" class="nav-link active" aria-current="page">
        <svg class="bi me-2" width="16" height="16"></svg>
        Home
      </a>
    </li>
    <li>
      <a href="#" class="nav-link link-dark">
        <svg class="bi me-2" width="16" height="16"></svg>
        Dashboard
      </a>
    </li>
    <li>
      <a href="#" class="nav-link link-dark">
        <svg class="bi me-2" width="16" height="16"></svg>
        Orders
      </a>
    </li>
    <li>
      <a href="#" class="nav-link link-dark">
        <svg class="bi me-2" width="16" height="16"></svg>
        Products
      </a>
    </li>
    <li>
      <a href="#" class="nav-link link-dark">
        <svg class="bi me-2" width="16" height="16"></svg>
        Customers
      </a>
    </li>
  </ul>
  <hr/>
  <div class="dropdown">
    <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
      
      <strong>mdo</strong>
    </a>
    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
      <li><a class="dropdown-item" href="#">New project...</a></li>
      <li><a class="dropdown-item" href="#">Settings</a></li>
      <li><a class="dropdown-item" href="#">Profile</a></li>
      <li><hr class="dropdown-divider"/></li>
      <li><a class="dropdown-item" href="#">Sign out</a></li>
    </ul>
  </div>
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
  
    </>
  );
}; */}

const Side = props => {
   

  return (
      <>
  
          <Nav className="col-md-3 d-none d-md-block bg-light sidebar"
          activeKey="/home"
          onSelect={selectedKey => alert(`selected ${selectedKey}`)}
          >
              <div className="sidebar-sticky"></div>
          <Nav.Item>
              <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="link-1">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="link-2">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
              Disabled
              </Nav.Link>
          </Nav.Item>
          </Nav>
        
      </>
      );
};
export default Side;

  