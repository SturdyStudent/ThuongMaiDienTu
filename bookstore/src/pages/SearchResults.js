import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { PaginatedItems } from '../components/ResultDisplay'
import FilterPanel from '../components/FilterPanel'
import { useSelector } from 'react-redux'
import './SearchResult.css'
import axios from 'axios'
import { baseUrl } from '../baseUrl'


function SearchResults() {
    const [items, setItems] = useState([]);
    const [tempItems, setTempItems] = useState([]);
    const [authorFilter, setAuthorFilter] = useState();
    const [categoryFilter, setCategoryFilter] = useState();
    const [publisherFilter, setPublisherFilter] = useState();
    const [sortDirFilter, setSortDirFilter] = useState();
    const [priceFilter, setPriceFilter] = useState();

    const handleAuthorFilter = (authorVal) => {
        setAuthorFilter(authorVal);
    }
    const handlePublisherFilter = (authorVal) => {
        setPublisherFilter(authorVal);
    }
    const handleCategoryFilter = (authorVal) => {
        setCategoryFilter(authorVal);
    }
    const handlePriceFilter = (authorVal) => {
        setPriceFilter(authorVal);
    }
    const handleSortDirFilter = (authorVal) => {
        setSortDirFilter(authorVal);
    }

    const searchTerm = useSelector(state => state.searchTerm);
    useEffect(() => {
            axios.post(`${baseUrl}/book/search`, {
                "TuKhoa": searchTerm
            }).then(result => {
                setItems(result.data.data);
                setTempItems(result.data.data);
            })
    }, [searchTerm]);

    const filterAuthor = (array) => {
        if(authorFilter !== undefined){
            return array.filter(item => item.MaTacGia === authorFilter);
        }
        return  array;
    }

    const filterPublisher = (array) => {
        if(publisherFilter !== undefined){
            return array.filter(item => item.MaNXB === publisherFilter);
        }
        return array;
    }

    const filterCategory = (array) => {
        if(categoryFilter !== undefined){
            return array.filter(item => item.MaChuDe === categoryFilter);
        }
        return array;
    }

    const filterPrice = (array) => {
        return array.filter(item => {
            if(Number(priceFilter) === 0){
                return (item.GiaBan < 100000);
            }
            if(Number(priceFilter) === 1){
                return (item.GiaBan >= 100000 && item.GiaBan <= 120000);
            }
            if(Number(priceFilter) === 2){
                return (item.GiaBan >= 120000 && item.GiaBan <= 140000);
            }
            if(Number(priceFilter) === 3){
                return (item.GiaBan >= 140000 && item.GiaBan <= 160000);
            }
            if(Number(priceFilter) === 4){
                return item.GiaBan > 160000;
            }
            return true;
        });

    }

    useEffect(() => {
        //tạo biến trữ lại cài search mà không thay đổi, xong load lại thì load lại cái 
        setTempItems(items);
        let filteredItems = items;
        filteredItems = filterAuthor(filteredItems);
        filteredItems = filterPublisher(filteredItems);
        filteredItems = filterCategory(filteredItems);
        filteredItems = filterPrice(filteredItems);
        if(Number(sortDirFilter) === 0){
            filteredItems.sort((first, second) => {
                if(first.TenSach < second.TenSach)
                    return -1;
                if(first.TenSach > second.TenSach)
                    return 1;
                return 0;
            });
        }else{
            filteredItems.sort((first, second) => {
                if(first.TenSach < second.TenSach)
                    return 1;
                if(first.TenSach > second.TenSach)
                    return -1;
                return 0;
            });
        }
        setTempItems(filteredItems);
    }, [authorFilter, categoryFilter, publisherFilter, sortDirFilter, priceFilter])

    return (
        <div>
            <Header />
            <div className='d-flex flex-row'>
                <div>
                    <FilterPanel authorState={authorFilter} publisherState={publisherFilter} categoryState={categoryFilter} sortDirState={sortDirFilter} authorFilter={handleAuthorFilter} publisherFilter={handlePublisherFilter} categoryFilter={handleCategoryFilter} priceFilter={handlePriceFilter} sortDirFilter={handleSortDirFilter} />
                </div>
                <div>
                    <h3 className='justify-content-left d-flex mt-3 ms-5' >
                        Kết quả tìm kiếm cho '{searchTerm}'
                    </h3>
                    <PaginatedItems itemsPerPage={12} items={tempItems} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SearchResults