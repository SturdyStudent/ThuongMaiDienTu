import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { categoryColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {BaseUrl} from '../../helpers/baseUrl'
import axios from 'axios'

const CategoryDatatable = () => {
    let dataRows = [];
    let dataColumns = categoryColumns;
    let addAction = <Link to="/categories/new" className="link">Thêm mới thể loại</Link>
    const [data, setData] = useState(dataRows);

    useEffect(() => {
        axios.get(`${BaseUrl}/category/`)
            .then(data => {
                let count = 0;
                let dataObj = [];
                data.data.data.forEach(element => {
                    dataObj[count] = {
                        id: data.data.data[count].MaChuDe,
                        ...element
                    }
                    count++;
                });
                setData(dataObj);
            })
    }, [dataColumns])

    const handleDelete = (id, MaChuDe) => {
        axios.delete(`${BaseUrl}/category/delete/${MaChuDe}`)
            .then(() => {
                setData(data.filter((item) => item.id !== id));
            }).catch((err) => {
                console.log(err);
            })
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/categories/edit" style={{ textDecoration: "none" }} state={{ id: params.row.id }}><div className="viewButton">Sửa</div></Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id, params.row.MaChuDe)}
                        >
                            Xóa
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                {addAction}
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={dataColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default CategoryDatatable;
