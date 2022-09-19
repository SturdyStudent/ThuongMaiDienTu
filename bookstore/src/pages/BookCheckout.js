import React from 'react'
import SortResult from '../components/SortResult'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ShippingSection from '../components/ShippingSection'
import CheckoutCard from '../components/CheckoutCard'
import './BookCheckout.css'
import CheckoutStepNav from '../components/CheckoutStepNav'
import PaymentSection from '../components/PaymentSection'
import PlaceOrder from '../components/PlaceOrder'

function BookCheckout() {
    const currentStage = 2;
    let stageBody = <ShippingSection />
    if (currentStage === 1) {
        stageBody = <PaymentSection />
    } else if (currentStage === 2) {
        stageBody = <PlaceOrder />
    }
    return (
        <div>
            <Header />
            <SortResult isListingPage={false} />
            <div className='parent-body-padding row'>
                <div className='col-md-8 checkout-step-container'>
                    <CheckoutStepNav />
                    {stageBody}
                </div>
                <div className='col-md-4 justify-content-center '>
                    <CheckoutCard />
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default BookCheckout