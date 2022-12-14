
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ProfilePic from '../../assets/images/profile.jpg'
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const loginInfo = JSON.parse(localStorage.getItem("LOGIN_INFORMATION"));

  return (
    <div className="navbar">
    <div className="wrapper">
      <div className="search">
        <input type="text" placeholder="Search..." />
        <SearchOutlinedIcon />
      </div>
      <div className="items">
        <div className="item">
          <DarkModeOutlinedIcon
            className="icon"
            onClick={() => dispatch({ type: "TOGGLE" })}
          />
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="counter">1</div>
        </div>
        <div className="item">
          <ListOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <img
            src={ProfilePic}
            alt=""
            className="avatar"
          />
          <div>{loginInfo[0].HoTenNV}</div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Navbar;