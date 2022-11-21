import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { BaseUrl, UtiUrl } from "../../helpers/baseUrl";
import { useLocation } from "react-router-dom";
const Detail = () => {
    const [book, setBook] = useState(null);
    const location=useLocation();
    const id=location.pathname.toString().split('/')[2];
    useEffect(() => {
        console.log(book);
        async function fetchId() {
                await axios.get(`${BaseUrl}/book/${id}`)
            .then(async (res) => {
                    await setBook(res.data)
                })
            .catch(
                function(err){
                    console.log(err)
                });
        }
        fetchId();
        console.log(book);
    },[]);
    let bookDetail = {
        MaSach: 1,
        TenSach: "Những người khốn khổ",
        MaChuDe: 1,
        MaNXB: 1,
        MaTacGia: 1,
        MoTa: "update",


    }
    return(
        <Container fluid>
            <Row>
                <Col><Navbar/></Col>
            </Row>
            <Row>
                <Col xs={2} md={2} lg={2}><Sidebar/></Col>
                <Col>
                    <Row>{bookDetail.MaSach}</Row>
                    <Row></Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Detail;