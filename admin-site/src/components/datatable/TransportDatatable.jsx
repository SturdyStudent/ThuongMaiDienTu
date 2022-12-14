import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { transportColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {BaseUrl} from '../../helpers/baseUrl'
import axios from 'axios'

const TransportDatatable = () => {
    let dataRows = [];
    let dataColumns = transportColumns;
    const [data, setData] = useState(dataRows);
    const loginInfo = JSON.parse(localStorage.getItem("LOGIN_INFORMATION"));
   

    useEffect(() => {
        axios.get(`${BaseUrl}/order/transport/${loginInfo[0].MaNV}`)
            .then(data => {
                let count = 0;
                let dataObj = [];
                data.data.data.forEach(element => {
                    dataObj[count] = {
                        id: data.data.data[count].MaDonHang,
                        ...element
                    }
                    count++;
                });
                setData(dataObj);
            })
    }, [dataColumns])

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 170,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/transports/edit" style={{ textDecoration: "none" }} state={{ id: params.row.MaDonHang }}><div className="p-2 viewButton">Cập nhật tình trạng</div></Link>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Danh sách đơn hàng cần giao
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

export default TransportDatatable;