import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {BaseUrl} from '../../helpers/baseUrl'
import axios from 'axios'

const VoucherDatatable = () => {
    let dataRows = [];
    let dataColumns = userColumns;
    let addAction = <Link to="/voucher/new" className="link">Thêm voucher mới</Link>
    const [data, setData] = useState(dataRows);

    useEffect(() => {
        axios.get(`${BaseUrl}/voucher/`)
            .then(data => {
                let count = 0;
                let dataObj = [];
                data.data.data.forEach(element => {
                    dataObj[count] = {
                        IDVoucher: data.data.data[count].IDVoucher,
                        CodeVoucher: data.data.data[count].CodeVoucher,
                        NgayBatDau: data.data.data[count].NgayBatDau,
                        NgayKetThuc: data.data.data[count].NgayKetThuc,
                        TriGiaGiam: data.data.data[count].TriGiaGiam,
                        DieuKienVoucher: data.data.data[count].DieuKienVoucher,
                        SoLuong: data.data.data[count].SoLuong,
                        HieuLuc: data.data.data[count].HieuLuc
                    }
                    count++;
                });
                setData(dataObj);
            })
    }, [dataColumns])

    const handleDelete = (id, MaVoucher) => {
        axios.delete(`${BaseUrl}/voucher/delete/${MaVoucher}`)
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
                        <Link to="/voucher/edit" style={{ textDecoration: "none" }} state={{ id: params.row.MaKH }}><div className="viewButton">Sửa</div></Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id, params.row.MaKH)}
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
                Thêm mới người dùng
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

export default VoucherDatatable;
