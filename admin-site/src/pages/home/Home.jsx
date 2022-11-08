import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { Container, Col, Row} from "react-bootstrap";
const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Navbar />
        </Col>
      </Row>
      <Row>
        <Col xs={2} m={2}>
        <Sidebar />
        </Col>
        <Col xs={10} m={10}>
          <Row>
            <Col>
            <div className="homeContainer">
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        </div>
            </Col>
          </Row>
          <Row>
          <Col>
            <Row>
            <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
            </Row>
            <Row>
            <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
            </Row>
          </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;