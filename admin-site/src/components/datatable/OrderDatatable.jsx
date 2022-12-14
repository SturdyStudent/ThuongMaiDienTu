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
    let addAction = <Link to="/orders/new" className="link" state>Thêm</Link>
    const [data, setData] = useState(dataRows);

   

    useEffect(() => {
        axios.get(`${BaseUrl}/order/`)
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

    const handleDelete = (id, MaOrder) => {
        axios.delete(`${BaseUrl}/order/delete/${MaOrder}`)
            .then(() => {
                setData(data.filter((item) => item.id !== id));
            }).catch((err) => {
                console.log(err);
            })
    };

    const handleApprove = async (isApproved, id) => {
        axios.post(`${BaseUrl}/order/approved/${id}`, {
            ChoPhepDuyet: isApproved 
        }).then(() => {
            window.location.reload();
        })
    }
    const approveColumn = [
        {
            field: "DaDuyet", 
            headerName: "Đã duyệt", 
            width: 150, 
            renderCell: (params) => {
              return (
                <div>
                  {(Number(params.row.TinhTrangGiaoHang) === 1) 
                  ? <button className="btn btn-primary" onClick={() => handleApprove(2, params.row.id)}>Duyệt đơn</button> 
                  : <button className="btn btn-danger" onClick={() => handleApprove(1, params.row.id)}>Bỏ duyệt đơn</button>}
                </div>
              );
            },
          },
    ]

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/orders/edit" style={{ textDecoration: "none" }} state={{ id: params.row.MaDonHang }}><div className="viewButton">Sửa</div></Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id, params.row.MaDonHang)}
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
                Thêm mới đơn hàng
                {addAction}
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={dataColumns.concat(approveColumn).concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default OrderDatatable;