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
        <Navbar />
        </Col>
      </Row>
    <Row>
      <Col sm={3}><Sidebar /></Col>
      <Col sm={9}>
        <Row>
        <div className="widgets">
           <Widget type="user" />
           <Widget type="order" />
           <Widget type="earning" />
           <Widget type="balance" />
         </div>
        </Row>
        <Row>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
      </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
        </Row>
    </Col>
    {/* <Col sm={4}>
     
     </Col> */}
      
    </Row>
  </Container>
  );
};

export default Home;
