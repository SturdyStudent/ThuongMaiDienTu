import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  authorColumns, authorRows, publisherColumns, publisherRows, categoryColumns,
  categoryRows, bookColumns, bookRows, orderColumns, orderRows, ratingColumns, ratingsRows,
  userColumns, userRows, voucherColumns, voucherRows
} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import normalizeId from 'normalize-mongodb-id';
const Datatable = ({ objectName }) => {
  const getDataUrl = "http://127.0.0.1:3002/api/";

  const [data, setData] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);
  let editAction = <div></div>;
  let addAction = <div></div>;

  useEffect(() => {
    axios.get("http://127.0.0.1:3002/api/author/")
      .then(data => {
        setData(data.data.data);
        console.log(data.data.data);
      })
  }, [dataColumns])
  useEffect(() => {
    switch (objectName) {
      case "Voucher":
        setDataColumns(voucherColumns);
        editAction = <Link to="/vouchers/edit" style={{ textDecoration: "none" }}>
          <div className="viewButton">Sửa</div>
        </Link>;
        addAction = <Link to="/vouchers/new" className="link">
          Thêm
        </Link>
        break;
      case "Người dùng":
        setDataColumns(userColumns);
        editAction = <Link to="/users/test" style={{ textDecoration: "none" }}>
          <div className="viewButton">Xem</div>
        </Link>;
        addAction = <Link to="/users/new" className="link">
          Thêm
        </Link>
        break;
      case "Đánh giá":
        setDataColumns(ratingColumns);
        editAction = <Link to="/ratings/edit" style={{ textDecoration: "none" }}>
          <div className="viewButton">Xem</div>
        </Link>;
        addAction = <Link to="/ratings/new" className="link">
          Thêm
        </Link>
        break;
      case "Đơn hàng":
        setDataColumns(orderColumns);
        editAction = <Link to="/orders/edit" style={{ textDecoration: "none" }}>
          <div className="viewButton">Sửa</div>
        </Link>;
        addAction = <Link to="/orders/new" className="link">
          Thêm
        </Link>
        break;
      case "Sách":
        setDataColumns(bookColumns);
        editAction = <Link to="/books/edit" style={{ textDecoration: "none" }}>
          <div className="viewButton">Sửa</div>
        </Link>;
        addAction = <Link to="/books/new" className="link">
          Thêm
        </Link>
        break;
      case "Tác giả":
        editAction = <Link to="/authors/edit" style={{ textDecoration: "none" }}>
          <div className="viewButton">Sửa</div>
        </Link>;
        addAction = <Link to="/authors/new" className="link">
          Thêm
        </Link>;
        setDataColumns(authorColumns);
        break;
      case "Thể loại":
        editAction = <Link to="/categories/edit" style={{ textDecoration: "none" }}>
          <div className="viewButton">Sửa</div>
        </Link>;
        addAction = <Link to="/categories/new" className="link">
          Thêm
        </Link>;
        setDataColumns(categoryColumns);
        break;
      case "Nhà xuất bản":
        editAction = <Link to="/publishers/edit" style={{ textDecoration: "none" }}>
          <div className="viewButton">Sửa</div>
        </Link>;
        addAction = <Link to="/publishers/new" className="link">
          Thêm
        </Link>
        setDataColumns(publisherColumns);
        break;
      default:
        break;
    }
  }, [data])

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {editAction}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
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
        Thêm mới {objectName}
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

export default Datatable;
