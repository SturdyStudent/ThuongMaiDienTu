import "./single.scss";
import { Link } from 'react-router-dom'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";
import { Row,Col } from "react-bootstrap";
import Container from 'react-bootstrap/Container'

const SingleAuthors = () => {
    return (
      <>
      <Container fluid>
    <Row>
      <Col>    
        <Navbar />
      </Col>
    </Row>
    <Row>
    <Col xs={2} md={2}>
        <Sidebar />
    </Col> 
    <Col xs={10} md={10}>  
      <Link to="/authors/EditAuthors" style={{ textDecoration: "none" }}>
              <div className="editButton">Sửa thông tin</div>
            </Link>
            <h1 className="title">Thông tin cá nhân</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"/>
          </div>
        </Col>    
  </Row>
  </Container>
  </>
    
  );
};

export default SingleAuthors;



