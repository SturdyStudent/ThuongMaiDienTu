import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { publisherColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import baseUrl from '../../helpers/baseUrl'
import axios from 'axios'

const UserDatatable = () => {
    let dataRows = [];
    let dataColumns = publisherColumns;
    let addAction = <Link to="/publishers/new" className="link" state>Thêm</Link>
    const [data, setData] = useState(dataRows);

    useEffect(() => {
        axios.get(`${baseUrl}/publisher/`)
            .then(data => {
                let count = 0;
                let dataObj = [];
                data.data.data.forEach(element => {
                    dataObj[count] = {
                        id: data.data.data[count].MaNXB,
                        ...element
                    }
                    count++;
                });
                setData(dataObj);
            })
    }, [dataColumns])

    const handleDelete = (id, MaNXB) => {
        axios.delete(`${baseUrl}/publisher/delete/${MaNXB}`)
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
                        <Link to="/publishers/edit" style={{ textDecoration: "none" }} state={{ id: params.row.MaNXB }}><div className="viewButton">Sửa</div></Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id, params.row.MaNXB)}
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

export default UserDatatable;
