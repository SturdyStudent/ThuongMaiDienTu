import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { authorColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {BaseUrl} from '../../helpers/baseUrl'
import axios from 'axios'

const AuthorDatatable = () => {
    let dataRows = [];
    let dataColumns = authorColumns;
    let addAction = (<Link to="/authors/new" className="link">Thêm</Link>)
    const [data, setData] = useState(dataRows);

    useEffect(() => {
        axios.get(`${BaseUrl}/author`)
            .then(data => {
                let count = 0;
                let dataObj = [];
                data.data.data.forEach(element => {
                    dataObj[count] = {
                        id: data.data.data[count].MaTacGia,
                        TenTacGia: data.data.data[count].TenTacGia,
                        HinhTacGia: data.data.data[count].HinhTacGia,
                        DiaChi: data.data.data[count].DiaChi,
                        TieuSu: data.data.data[count].TieuSu,
                        DienThoai: data.data.data[count].DienThoai
                    }
                    if(dataObj[count].DienThoai == null) {dataObj[count].DienThoai = "Không có"}
                    if(dataObj[count].HinhTacGia == null) {dataObj[count].HinhTacGia = "Không có"}
                    count++;
                });
                setData(dataObj);
            })
    }, [dataColumns])

    const handleDelete = (id, MaTacGia) => {
        axios.delete(`${BaseUrl}/author/delete/${MaTacGia}`)
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
                        <Link to="/authors/edit" style={{ textDecoration: "none" }} state={{ id: params.row.MaTacGia }}><div className="viewButton">Sửa</div></Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id, params.row.MaTacGia)}
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
                Thêm mới tác giả
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

export default AuthorDatatable;
