import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ShippingSection from '../components/CheckoutComponents/ShippingSection'
import CheckoutCard from '../components/CheckoutCard'
import './BookCheckout.css'
import CheckoutStepNav from '../components/CheckoutStepNav'
import PaymentSection from '../components/CheckoutComponents/PaymentSection'
import ReviewSection from '../components/CheckoutComponents/ReviewSection'
import { useSelector } from 'react-redux'

function BookCheckout({ stripePromise }) {
    const currentStage = useSelector(state => state.currentCheckoutSection);

    let stageBody = <ShippingSection />
    if (currentStage === 1) {
        stageBody = <ReviewSection />
    } else if (currentStage === 2) {
        stageBody = <PaymentSection stripePromise={stripePromise} />
    }
    return (
        <div>
            <Header />
            <div className='parent-body-padding row mt-5'>
                <div className='col-md-8 checkout-step-container'>
                    <CheckoutStepNav currentStage={currentStage} />
                    {stageBody}
                </div>
                <div className='col-md-4 justify-content-center '>
                    <CheckoutCard stripePromise={stripePromise} />
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default BookCheckout