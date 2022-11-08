import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {BaseUrl} from '../../helpers/baseUrl'
import axios from 'axios'

const OrderDatatable = () => {
    let dataRows = [];
    let dataColumns = orderColumns;
    const [data, setData] = useState(dataRows);
    useEffect(() => {
        axios.get(`${BaseUrl}/order/`)
            .then(data => {
                let count = 0;
                let dataObj = [];
                data.data.data.forEach(element => {
                    dataObj[count] = {
                        MaDonHang: data.data.data[count].MaDonHang,
                        DaThanhToan: data.data.data[count].DaThanhToan,
                        TinhTrangGiaoHang: data.data.data[count].TinhTrangGiaoHang,
                        NgayDat: data.data.data[count].NgayDat,
                        NgayGiao: data.data.data[count].NgayGiao,
                        MaKH: data.data.data[count].MaKH,
                        TenNguoiNhan: data.data.data[count].TenNguoiNhan,
                        DienThoaiNguoiNhan: data.data.data[count].DienThoaiNguoiNhan,
                        DiaChiGiao: data.data.data[count].DiaChiGiao,
                        HinhThucThanhToan: data.data.data[count].HinhThucThanhToan,
                        HinhThucGiaoHang: data.data.data[count].HinhThucGiaoHang,
                        IDVoucher: data.data.data[count].IDVoucher,
                        ThanhTien: data.data.data[count].ThanhTien

                    }
                    count++;
                });
                setData(dataObj);
            })
    }, [dataColumns])

    const handleDelete = (id, MaDonHang) => {
        axios.delete(`${BaseUrl}/order/delete/${MaDonHang}`)
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
                        <Link to="/orders/edit" style={{ textDecoration: "none" }} state={{ id: params.row.MaKH }}><div className="viewButton">Sửa</div></Link>
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
                Danh sach Don hang
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
}

export default OrderDatatable;