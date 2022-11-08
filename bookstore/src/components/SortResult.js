import React from 'react'
import { PaginatedItems } from './ResultDisplay'
import './SortResult.css'

function SortResult({ isListingPage, category }) {
    const items = [...Array(30).keys()];
    const paginate = (isListingPage ? <div id='pagination-container'>
        <PaginatedItems itemsPerPage={4} items={items} />
        <div> &nbsp; Trang <b>2</b> trên <b>5</b></div>
    </div> : null);
    const sortSelection = (isListingPage ? <div id='sort-container'>
        <div>Lọc bởi: &nbsp;</div>
        <select name="sort" id="select-sort">
            <option value="volvo">Mức độ liên quan</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
        </select>
    </div> : null);
    return (
        <div id='result-sort-parent'>
            <div id='result-container'>
                <div>
                    <div>Thể loại{'>>'} {category}</div>
                    <hr />
                </div>
                {paginate}
            </div>
            {sortSelection}
        </div>
    )
}

export default SortResult