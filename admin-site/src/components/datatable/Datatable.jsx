import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns, orderRows, ratingColumns, ratingsRows, userColumns, userRows, voucherColumns, voucherRows,
  authorColumns,authorRows,NXBColumns
  ,NXBRows,ProductsColumns,ProductsRows } from "../../datatablesource";

import { Link } from "react-router-dom";
import { useState } from "react";

const Datatable = ({ objectName }) => {
  let dataRows = null;
  let dataColumns = null;
  let editAction = <div></div>;
  let addAction = <div></div>;

  if (objectName === 'Voucher') {
    dataRows = voucherRows;
    dataColumns = voucherColumns;
    editAction = <Link to="/vouchers/edit" style={{ textDecoration: "none" }}>
      <div className="viewButton">Sửa</div>
    </Link>;
    addAction = <Link to="/vouchers/new" className="link">
      Thêm
    </Link>
  } else if (objectName === 'Người dùng') {
    dataRows = [];
    dataColumns = userColumns;
    editAction = <Link to="/users/test" style={{ textDecoration: "none" }}>
      <div className="viewButton">Xem</div>
    </Link>;
    addAction = <Link to="/users/new" className="link">
      Thêm
    </Link>
  } else if (objectName === 'Đánh giá') {
    dataRows = ratingsRows;
    dataColumns = ratingColumns;
    editAction = <Link to="/ratings/edit" style={{ textDecoration: "none" }}>
      <div className="viewButton">Xem</div>
    </Link>;
    addAction = <Link to="/ratings/new" className="link">
      Thêm
    </Link>
  } else if (objectName === 'Đơn hàng') {
    dataRows = orderRows;
    dataColumns = orderColumns;
    editAction = <Link to="/orders/edit" style={{ textDecoration: "none" }}>
      <div className="viewButton">Sửa</div>
    </Link>;
    addAction = <Link to="/orders/new" className="link">
      Thêm
    </Link>
  }else if (objectName === 'Tác Giả') {
    dataRows = authorRows;
    dataColumns = authorColumns;
    editAction = <Link to="/authors/EditAuthors" style={{ textDecoration: "none" }}>
      <div className="viewButton">Sửa</div>
    </Link>;
    addAction = <Link to="/authors/NewAuthors" className="link">
      Thêm
    </Link>
  }else if (objectName === 'Nhà Xuất Bản') {
    dataRows = NXBRows;
    dataColumns = NXBColumns;
    editAction = <Link to="/publisher/EditNXB" style={{ textDecoration: "none" }}>
      <div className="viewButton">Sửa</div>
    </Link>;
    addAction = <Link to="/publisher/NewNXB" className="link">
      Thêm
    </Link>
    
  }else if (objectName === 'Sách') {
    dataRows = ProductsRows;
    dataColumns = ProductsColumns;
    editAction = <Link to="/products/EditProducts" style={{ textDecoration: "none" }}>
      <div className="viewButton">Sửa</div>
    </Link>;
    addAction = <Link to="/products/NewProducts" className="link">
      Thêm
    </Link>
  }
  const [data, setData] = useState(dataRows);

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
