import React, { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { baseUrl } from '../../baseUrl'
import { useSelector, useDispatch } from 'react-redux';
import { actOrderSetState } from '../../actions/index'

import CheckoutForm from '../CheckoutForm';
import Select from 'react-select'
import axios from 'axios'

function PaymentSection({ stripePromise }) {
  const [clientSecret, setClientSecret] = useState();
  const [isPayByCard, setPayByCard] = useState({ value: false, label: "Thanh toán tiền mặt khi nhận hàng" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPayByCard === false) {
      setClientSecret();
    }
  }, [isPayByCard])

  const orderInfo = useSelector(state => state.orderState);

  const appearance = {
    theme: 'none',
    variables: {
      fontFamily: 'Verdana',
      fontLineHeight: '1.5',
      borderRadius: '0',
      colorBackground: '#dfdfdf'
    },
    rules: {
      '.Input': {
        backgroundColor: '#ffffff',
        boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080'
      },
      '.Input--invalid': {
        color: '#DF1B41'
      },
      '.Tab, .Block': {
        boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
        marginTop: "10px"
      },
      '.Tab:hover': {
        backgroundColor: '#eee'
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        backgroundColor: '#ccc'
      }
    }
  };
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.get(`${baseUrl}/payment/secret`)
      .then(res => res.data.data)
      .then((data) => setClientSecret(data.client_secret));
  }, []);

  const options = [
    { value: false, label: "Thanh toán tiền mặt khi nhận hàng" },
    { value: true, label: "Thanh toán bằng thẻ tín dụng" },
  ]

  const handleSubmit = (e) => {
    dispatch(actOrderSetState({
      TenNguoiNhan: null,
      DienThoaiNguoiNhan: null,
      DiaChiGiao: null
    }))
  }

  return (
    <div>
      <h5>LỰA CHỌN THANH TOÁN</h5><br />
      <label className='fontweight mb-3'>PHƯƠNG THỨC THANH TOÁN</label><br />
      <div className='mb-5'>
        <Select onChange={setPayByCard} defaultValue={{ value: false, label: "Thanh toán tiền mặt khi nhận hàng" }} options={options}>
        </Select>
      </div>
      {(isPayByCard.value && clientSecret && stripePromise) ? (
        <div hidden={!(isPayByCard.value)}>
          <Elements stripe={stripePromise} options={{ clientSecret, appearance }}  >
            {<CheckoutForm />}
          </Elements>
        </div>
      ) :
        <div>
          <blockquote className="blockquote blockquote-custom bg-white p-4 shadow rounded">
            <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
            <h5>Hàng sẽ được giao đến địa chỉ này:</h5>
            <div className=" pt-4 mt-2 border-top">
              <div style={{ fontSize: "0.8em" }}>{orderInfo.DiaChiGiao}</div>
            </div>
          </blockquote>
          <button className="btn btn-primary mt-4" onClick={e => handleSubmit(e)} id="submit">
            <span id="button-text">
              {"Thanh toán ngay"}
            </span>
          </button>
        </div>
      }
    </div>
  )
}

export default PaymentSection