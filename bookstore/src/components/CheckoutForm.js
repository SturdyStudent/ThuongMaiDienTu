import { PaymentElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { actNotificationSetState } from './../actions/index'

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/order/view/",
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
            dispatch(actNotificationSetState({
                notification: "error"
            }))
        } else {
            setMessage("Xảy ra lỗi trong lúc xử lí.");
        }

        setIsLoading(false);
    };
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} className="btn btn-primary mt-4" id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Thanh toán ngay"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}