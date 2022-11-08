import React, { useState, useEffect } from 'react'
import { baseUrl } from '../baseUrl'
import './OrderView.css'
import OrderViewDetails from '../components/OrderViewDetails'
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios'

function OrderView({ stripePromise }) {
    const [clientSecret, setClientSecret] = useState();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios.get(`${baseUrl}/payment/secret`)
            .then(res => res.data.data)
            .then((data) => setClientSecret(data.client_secret));
    }, []);

    return (
        <>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }} >
                    <OrderViewDetails />
                </Elements>
            )}
        </>
    )
}

export default OrderView