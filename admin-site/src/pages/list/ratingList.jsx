import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Container from 'react-bootstrap/Container'
import { Row, Col } from "react-bootstrap";

const List = () => {
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
            {/* <Datatable objectName={"Đánh giá"} /> */}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default List