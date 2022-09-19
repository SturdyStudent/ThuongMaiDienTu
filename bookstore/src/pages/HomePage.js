import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header'
import Banner from '../assets/advertiseBanner.png'
import BookList from '../components/BookList'
import SaleCard from '../components/SaleCard'
import Footer from '../components/Footer'


export default function HomePage() {
    return (
        <div>
            <Header />
            <img src={Banner} style={{ "margin": "4vh" }} alt="banner" />
            <BookList />
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                <SaleCard />
                <SaleCard />
            </div>
            <BookList />
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                <SaleCard />
                <SaleCard />
            </div>
            <Footer />
        </div>
    )
}
