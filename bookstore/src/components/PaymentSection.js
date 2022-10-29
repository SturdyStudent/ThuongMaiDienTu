import React, { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { baseUrl } from '../baseUrl'
import CheckoutForm from './CheckoutForm';
import axios from 'axios'

function PaymentSection({ stripePromise }) {
  const [clientSecret, setClientSecret] = useState();
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



  return (
    <div>
      <h5>LỰA CHỌN THANH TOÁN</h5><br />
      <label className='fontweight mb-3'>PHƯƠNG THỨC THANH TOÁN</label><br />
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }} >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default PaymentSection