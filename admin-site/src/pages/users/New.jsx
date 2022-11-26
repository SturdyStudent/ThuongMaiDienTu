import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import SuccessModal from '../../components/modal/SuccessModalNotification'
import BaseUrl from '../../helpers/baseUrl'
import axios from 'axios'
import { Col, Container, Row } from "react-bootstrap";

const New = ({ title, id }) => {

  const [HoTen, setHoTen] = useState();
  const [TaiKhoan, setTaiKhoan] = useState();
  const [MatKhau, setMatKhau] = useState();
  const [Email, setEmail] = useState();
  const [DiaChi, setDiaChi] = useState();
  const [DienThoai, setDienThoai] = useState();
  const [GioiTinh, setGioiTinh] = useState('Nam');
  const [NgaySinh, setNgaySinh] = useState();
  const [successNotification, setSuccessNotification] = useState();

  useEffect(() => {
    try {
      if (id) {
        axios.get(`${BaseUrl}/user/${id}`)
          .then(result => {
            let obj = result.data.data[0];
            setHoTen(obj.HoTen);
            setDiaChi(obj.DiaChi);
            setTaiKhoan(obj.TaiKhoan);
            setDienThoai(obj.DienThoai);
            setMatKhau(obj.MatKhau);
            setEmail(obj.Email);
            setTaiKhoan(obj.TaiKhoan);
            setGioiTinh(obj.GioiTinh);
            setNgaySinh(format(new Date(obj.NgaySinh), 'yyyy-MM-dd'));
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      handleUpdateUser();
    } else {
      handleCreateUser();
    }
  }


  const handleCreateUser = () => {
    axios.post(`${BaseUrl}/user/create`, {
      HoTen: HoTen,
      TaiKhoan: TaiKhoan,
      MatKhau: MatKhau,
      Email: Email,
      DiaChi: DiaChi,
      DienThoai: DienThoai,
      GioiTinh: GioiTinh,
      NgaySinh: NgaySinh
    }).then(result => {
      setSuccessNotification(result.data.message);
      console.log(result);
    })
      .catch(err => console.log(err));
  }
  const handleUpdateUser = () => {
    axios.put(`${BaseUrl}/user/update/${id}`, {
      HoTen: HoTen,
      TaiKhoan: TaiKhoan,
      MatKhau: MatKhau,
      Email: Email,
      DiaChi: DiaChi,
      DienThoai: DienThoai,
      GioiTinh: GioiTinh,
      NgaySinh: NgaySinh
    }).then(result => {
      setSuccessNotification(result.data.message);
      console.log(result);
    })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col><Navbar/></Col>
        </Row>
        <Row>
          <Col xs={2} s={2} md={2} lg={2}><Sidebar/></Col>
          <Col xs={10} s={10} md={10} lg={10}>
          <div className="new">
      {successNotification && <SuccessModal successNotification={successNotification} />}
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form onSubmit={e => handleSubmit(e)} encType="multipart/form-data">

              <div className="formInput">
                <label>{"Tài khoản"}</label>
                <input type={'text'} onChange={e => setTaiKhoan(e.target.value)} value={TaiKhoan || ''} placeholder={"Nhập tài khoản"} />
              </div>
              <div className="formInput">
                <label>{"Mật khẩu"}</label>
                <input type={'password'} onChange={e => setMatKhau(e.target.value)} value={MatKhau || ''} placeholder={"Nhập mật khẩu"} />
              </div>
              <div className="formInput">
                <label>{"Điện thoại"}</label>
                <input type={'number'} onChange={e => setDienThoai(e.target.value)} value={DienThoai || ''} placeholder={"Nhập số điện thoại"} />
              </div><br /><br />
              <div className="text-left">
                <label >{"Giới tính"}</label>
                <div onChange={e => setGioiTinh(e.target.value)}>
                  <input type="radio" name="gender" value={GioiTinh} onChange={() => { }} checked={GioiTinh === 'Nam'} />
                  Nam
                  <input type="radio" name="gender" value={GioiTinh} onChange={() => { }} checked={GioiTinh === 'Nữ'} />
                  Nữ
                </div>
              </div>

              <div className="formInput">
                <label>{"Ngày sinh"}</label>
                <input type={'date'} onChange={e => setNgaySinh(e.target.value)} value={NgaySinh || format(new Date(), 'yyyy-MM-dd')} />
              </div><br /><br />
              <div className="formInput" >
                <label>{"Địa chỉ"}</label>
                <input type={'text'} onChange={e => setDiaChi(e.target.value)} value={DiaChi || ''} placeholder={"Nhập địa chỉ"} />
              </div>
              <div className="formInput" >
                <label>{"Họ tên"}</label>
                <input type={'text'} onChange={e => setHoTen(e.target.value)} value={HoTen || ''} placeholder={"Nhập họ tên"} />
              </div>
              <div className="formInput">
                <label>{"Email"}</label>
                <input type={'text'} onChange={e => setEmail(e.target.value)} value={Email || ''} placeholder={"Nhập Email"} />
              </div>

              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default New;
