import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { PaginatedItems, ResultDisplay } from '../components/ResultDisplay'
import SortResult from '../components/SortResult'
import './SearchResult.css'
// import { useDispatch, useSelector } from 'react-redux'

function SearchResults() {
    const items = [...Array(33).keys()];
    // const dispatch = useDispatch();
    // const currentItem = useSelector(state => state.currentItem);

    return (
        <div>
            <Header />
            <SortResult isListingPage={true} />
            <ResultDisplay />
            <div style={{ "display": "flex", "justifyContent": "right", marginRight: "12vw" }}>
                <PaginatedItems itemsPerPage={4} items={items} />
            </div>
            <Footer />
        </div>
    )
}

export default SearchResults