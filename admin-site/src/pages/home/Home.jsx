import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav'

const Home = () => {
  return (
    // <div className="home">
    //   <Sidebar />
    //   <div className="homeContainer">
    //     <Navbar />
    //     <div className="widgets">
    //       <Widget type="user" />
    //       <Widget type="order" />
    //       <Widget type="earning" />
    //       <Widget type="balance" />
    //     </div>
    //     <div className="charts">
    //       <Featured />
    //       <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
    //     </div>
    //     <div className="listContainer">
    //       <div className="listTitle">Latest Transactions</div>
    //       <Table />
    //     </div>
    //   </div>
    // </div>
    <Container fluid>
      <Row>
        <Col>
          <Navbar/>
        </Col>
      </Row>
      <Row>
        <Col xs={2} md={2}>
          <Sidebar/>
        </Col>
        <Col xs={8} md={8}>
        <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </Col>
        <Col xs={2} md={2}>
          
          <Nav defaultActiveKey="/home" className="flex-column">
            {/* <Nav.Link href="/home">Active</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
                Disabled
            </Nav.Link> */}
            <div className="widgets">
           <Widget type="user" />
           <Widget type="order" />
           <Widget type="earning" />
           <Widget type="balance" />
         </div>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
