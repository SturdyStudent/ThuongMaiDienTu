import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import Container from 'react-bootstrap/Container'
import { Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/logo.png'

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <Container fluid id="navbar">
      <Row>
        <Col>
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={Logo} alt="..." height="60" />
            </Link>
          </div>
        </Col>
        <Col>
        <input type="text" placeholder="Search..."/>
            <SearchOutlinedIcon/>
        </Col>
        <Col>
          <Row>
              <Col>
              <DarkModeOutlinedIcon
              onClick={() => dispatch({ type: "TOGGLE" })}/>
              <NotificationsNoneOutlinedIcon/>
              </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    // <div className="navbar">
    //   <div className="wrapper">
    //     <div></div>
    //     <div className="search">
    //       <input type="text" placeholder="Search..." />
    //       <SearchOutlinedIcon />
    //     </div>
    //     <div className="items">
    //       <div className="item">
    //         <LanguageOutlinedIcon className="icon" />
    //         English
    //       </div>
    //       <div className="item">
    //         <DarkModeOutlinedIcon
    //           className="icon"
    //           onClick={() => dispatch({ type: "TOGGLE" })}
    //         />
    //       </div>
    //       <div className="item">
    //         <FullscreenExitOutlinedIcon className="icon" />
    //       </div>
    //       <div className="item">
    //         <NotificationsNoneOutlinedIcon className="icon" />
    //         <div className="counter">1</div>
    //       </div>
    //       <div className="item">
    //         <ChatBubbleOutlineOutlinedIcon className="icon" />
    //         <div className="counter">2</div>
    //       </div>
    //       <div className="item">
    //         <ListOutlinedIcon className="icon" />
    //       </div>
    //       <div className="item">
    //         <img
    //           src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    //           alt=""
    //           className="avatar"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;
