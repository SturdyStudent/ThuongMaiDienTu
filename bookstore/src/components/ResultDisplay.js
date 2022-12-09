import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import BookCard from './BookCard';
import './ResultDisplay.css'

export function ResultDisplay({ currentItems }) {
    // Example items, to simulate fetching from another resources.
    return (<>
        {currentItems && 
        <div className='result-holder justify-content-left d-flex'>
            {
                currentItems.map((item) => (
                    <div key={item.MaSach}>
                        <BookCard item={item} spacingStyle={{ "width": "30vh", margin: "2vw" }} />
                    </div>
                ))}
        </div>}
    </>
    )
}

const nullRenderFunction = () => {
    return (
        <h3 className='ps-5' style={{ minHeight: "30vh" }}>Không có kết quả nào được tìm thấy</h3>
    )
}

// Example items, to simulate fetching from another resources.

export function PaginatedItems({ itemsPerPage, items }) {
    const previous = <span><FontAwesomeIcon icon={faChevronLeft} /></span>;
    const next = <span><FontAwesomeIcon icon={faChevronRight} /></span>;

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;

    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
        <div>
            <hr style={{marginRight:"12vw"}}/>
            <ResultDisplay currentItems={currentItems}/>
            <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={previous}
                renderOnZeroPageCount={nullRenderFunction}
                nextLabel={next}
                pageLinkClassName="page-link"
                previousClassName="page-item-sort"
                previousLinkClassName="page-link"
                nextClassName="page-item-sort"
                nextLinkClassName="page-link"
                breakClassName="page-item-sort"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active-paginate"
                className="page-item-sort"
            />
        </div>
    );
}