import React from 'react'

function PaymentSection() {
  return (
    <div>
      <h5>LỰA CHỌN THANH TOÁN</h5><br />
      <label className='fontweight mb-2'>PHƯƠNG THỨC THANH TOÁN</label><br />
      <select name="cars" className='padding-select' id="cars" value={"select"}>
        <option value="volvo">Trả tiền mặt khi nhận hàng</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
      <br /><br />
      <div className='display-flex'>
        <div className='margin-right' >
          <div className='fontweight mb-2'>Loại Card</div>
          <select name="cars" className='padding-select' id="cars">
            <option value="volvo">Thanh toán tiền mặt</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div>
          <div className='fontweight mb-2'>Số tài khoản</div>
          <input type={"text"} className='checkout-login-input padding-select' style={{ "width": "20vw" }}></input>
        </div>
      </div>
      <br />
      <label className='fontweight mb-2'><span style={{ "color": "red" }}>*</span > Ngày hết hạn </label><br />
      <input type={"text"} className='checkout-login-input padding-select' style={{ "width": "10vw" }}></input><br /><br />
    </div>
  )
}

export default PaymentSection