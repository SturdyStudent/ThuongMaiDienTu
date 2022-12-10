import React, {useState, useEffect, useRef} from 'react'
import './FilterPanel.css'
import Select from 'react-select'
import axios from 'axios'
import { baseUrl } from '../baseUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function FilterPanel({isCategoryPage, authorFilter, publisherFilter ,categoryFilter, priceFilter, sortDirFilter}) {
    const [authorOptions, setAuthorOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [publishertions, setPublisherOptions] = useState([]);
    const [checked, setChecked] = useState(5);

    const [authorVal, setAuthorVal] = useState('');
    const [publisherVal, setPublisherVal] = useState('');
    const [categoryVal, setCategoryVal] = useState('');
    const [sortDirVal, setSortDirVal] = useState('');

    const selectRef = useRef();

    const toggle = e => {
        setChecked(Number(e.target.value));
        priceFilter(e.target.value);
    }

    const priceOptions = [
        {label: "Chọn tất cả", value: 5},
        {label: "Dưới 100.000VNĐ", value: 0},
        {label: "100 - 120.000VNĐ", value: 1},
        {label: "120 - 140.000VNĐ", value: 2},
        {label: "140 - 160.000VNĐ", value: 3},
        {label: "Trên 160.000VNĐ", value: 4}
    ]

    const orderOptions = [
        {label: "Thứ tự từ A-Z", value: 0},
        {label: "Thứ tự từ Z-A", value: 1},
    ]

    useEffect(() => {
        axios.get(`${baseUrl}/author`)
            .then(result => {
                const authorOptions = result.data.data.map(item => {
                    return ({
                        value: item.MaTacGia,
                        label: item.TenTacGia
                    });
                });
                setAuthorOptions(authorOptions)
            })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/publisher`)
            .then(result => {
                const publisherOptions = result.data.data.map(item => {
                    return ({
                        value: item.MaNXB,
                        label: item.TenNXB
                    });
                });
                setPublisherOptions(publisherOptions)
            })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/category`)
            .then(result => {
                const categoryOptions = result.data.data.map(item => {
                    return ({
                        value: item.MaChuDe,
                        label: item.TenChuDe
                    });
                });
                setCategoryOptions(categoryOptions)
            })
    }, []);

    const setAsDefault = () => {
        // setAuthorOptions((currentOptions) => currentOptions.filter((currentOption) => !Array(authorVal).includes(currentOption.val)));
        // authorFilter(undefined);
        setAuthorVal('');
        authorFilter(undefined);
        setPublisherVal('');
        publisherFilter(undefined);
        setCategoryVal('');
        categoryFilter(undefined);
        setSortDirVal('');
        sortDirFilter(undefined);
        priceFilter(undefined);
        setChecked(5);
    }

  return (
    <div className='filter-container p-4' style={{width:"25vw", borderRight:"1px solid #C0C0C0"}}>
        <h4 className='text-bold text-start' >
            <FontAwesomeIcon icon={faFilter} color="black" /> Bộ lọc
        </h4>
        <h6 className='text-start mt-3'>Tác giả</h6>
        <Select value={authorVal} ref={selectRef} className='filter-select' onChange={item => {
            authorFilter(item.value);
            setAuthorVal(item);
            }}  options={authorOptions} />
        <h6 className='text-start mt-3'>Chủ đề</h6>
        <Select value={categoryVal} isDisabled={isCategoryPage} className='filter-select' onChange={item => {
            categoryFilter(item.value);
            setCategoryVal(item);
            }}  options={categoryOptions} />
        <h6 className='text-start mt-3'>Nhà xuất bản</h6>
        <Select value={publisherVal} className='filter-select' onChange={item => {
            publisherFilter(item.value);
            setPublisherVal(item);
        }}  options={publishertions} />
        <h6 className='text-start mt-3'>Giá</h6>
        <ul style={{paddingLeft:"0", marginRight:"10%"}}>
            
        {priceOptions.map(({ label, value}, index) => {
          return (
            <li key={index} className="d-flex justify-content-between">
                <div className="toppings-list-item">
                    <label htmlFor={`custom-checkbox-${index}`}>{label}</label>
                </div>
                <div className="left-section">
                    <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        value={value}
                        checked={(checked === value)}
                        onChange={toggle}
                    />
                </div>
            </li>
          );
        })}
        </ul>
        <h6 className='text-start mt-3'>Sắp xếp theo thứ tự</h6>
        <Select value={sortDirVal} className='filter-select' onChange={item => {
            sortDirFilter(item.value);
            setSortDirVal(item);
            }}
            options={orderOptions} />
        <button onClick={setAsDefault} className='filter-select btn btn-primary mt-4'>Đặt lại mặc định</button>
    </div>
  )
}

export default FilterPanel