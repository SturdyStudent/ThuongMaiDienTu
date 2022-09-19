import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import BookCard from './BookCard';
import './ResultDisplay.css'

export function ResultDisplay({ currentItems }) {
    // Example items, to simulate fetching from another resources.

    const currentItemss = [...Array(11).keys()];
    return (
        currentItemss ? <div className='result-holder'>
            {currentItemss &&
                currentItemss.map((item) => (
                    <div>
                        <BookCard spacingStyle={{ "width": "30vh", margin: "2vw" }} />
                    </div>
                ))}
        </div> : <h3 style={{ minHeight: "30vh" }}>Không có kết quả nào được tìm thấy</h3>
    )
}

// Example items, to simulate fetching from another resources.

export function PaginatedItems({ itemsPerPage, items }) {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, items]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    const previous = <span><FontAwesomeIcon icon={faChevronLeft} /></span>;
    const next = <span><FontAwesomeIcon icon={faChevronRight} /></span>;
    return (
        <div>
            <ReactPaginate
                nextLabel={next}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={previous}
                pageClassName="page-item-sort"
                pageLinkClassName="page-link"
                previousClassName="page-item-sort"
                previousLinkClassName="page-link"
                nextClassName="page-item-sort"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item-sort"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                className="page-item-sort"
            />
        </div>
    );
}