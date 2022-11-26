import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { BaseUrl } from "../../helpers/baseUrl";
import { useLocation } from "react-router-dom";
const Detail = () => {
    const [book, setBook] = useState([]);
    const location=useLocation();
    
    useEffect(() => {
        async function fetchId() {
            const id=location.pathname.toString().split('/')[2];
            let url = `${BaseUrl}/book/${id}`;
            await axios.get(url)
            .then(res => {
                setBook(res);
                })
            .catch(err => console.log(err.message));
        }
        fetchId();
    },[]);
    let bookDetail = book.data;
    console.log(typeof(bookDetail));
    Object.entries(bookDetail).forEach(([key, value]) => {
        console.log(key, value);
    })
    return(
        <>
            <Container fluid>
            <Row>
                <Col><Navbar/></Col>
            </Row>
            <Row>
                <Col xs={2} md={2} lg={2}><Sidebar/></Col>
                <Col>
                    <Row>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Detail;