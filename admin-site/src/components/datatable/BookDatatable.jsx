import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { bookColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BaseUrl, UtiUrl } from "../../helpers/baseUrl";
import axios from "axios";

const BookDatatable = (props) => {
  let dataRows = [];
  let dataColumns = bookColumns;
  let addAction = (
    <Link to="/books/new" className="link">
      Thêm mới sách
    </Link>
  );
  const [data, setData] = useState(dataRows);

useEffect(() => {
    axios.get(`${BaseUrl}/book/`)
        .then(data => {
            let count = 0;
            let dataObj = [];
            data.data.data.forEach(element => {
                dataObj[count] = {
                    id: data.data.data[count].MaSach,
                    TenSach: data.data.data[count].TenSach,
                    GiaBan: data.data.data[count].GiaBan,
                    MoTa: data.data.data[count].MoTa,
                    AnhBia: data.data.data[count].AnhBia,
                    NgayCapNhat: data.data.data[count].NgayCapNhat,
                    SoLuongTon: data.data.data[count].SoLuongTon,
                    MaNXB: data.data.data[count].MaNXB,
                    MaChuDe: data.data.data[count].MaChuDe,
                    MaTacGia: data.data.data[count].MaTacGia,
                    SoLuotXem: data.data.data[count].SoLuotXem,
                    SoLuongBan: data.data.data[count].SoLuongBan
                }
                count++;
            });
            setData(dataObj);
        })
}, [dataColumns])

  // useEffect(async () => {
  //   const responseBookList = await axios.get(`${BaseUrl}/book/two`);
  //   const dataBookList = responseBookList.data.data;
  //   var arrayObj = [{}];
  //   var lengthResponseBookList = dataBookList.length;
  //   for (var i = 0; i < lengthResponseBookList; i++) {
  //     const dataPublisherName = await axios(`${UtiUrl}/tenNXB`, {
  //       method:'get',
  //       headers:{
  //           idNXB: dataBookList[i].MaNXB,
  //       }
      
  //     });
  //     const dataTenName = 1;
  //     if (i === 0) console.log(dataPublisherName);
  //     arrayObj[i] = {
  //       id: dataBookList[i].MaSach,
  //       TenSach: dataBookList[i].TenSach,
  //       GiaBan: dataBookList[i].GiaBan,
  //       MoTa: dataBookList[i].MoTa,
  //       AnhBia: dataBookList[i].AnhBia,
  //       NgayCapNhat: dataBookList[i].NgayCapNhat,
  //       SoLuongTon: dataBookList[i].SoLuongTon,
  //       MaNXB: dataPublisherName.data.data[0].TenNXB,
  //       MaChuDe: dataBookList[i].MaChuDe,
  //       MaTacGia: dataBookList[i].MaTacGia,
  //       SoLuotXem: dataBookList[i].SoLuotXem,
  //       SoLuongBan: dataBookList[i].SoLuongBan,
  //     };
  //   }
  //   setData(arrayObj);
  //   // .then(data => {
  //   //     let count = 0;
  //   //     let dataObj = [];
  //   //     data.data.data.forEach(element => {
  //   //         dataObj[count] = {
  //   //             id: data.data.data[count].MaSach,
  //   //             TenSach: data.data.data[count].TenSach,
  //   //             GiaBan: data.data.data[count].GiaBan,
  //   //             MoTa: data.data.data[count].MoTa,
  //   //             AnhBia: data.data.data[count].AnhBia,
  //   //             NgayCapNhat: data.data.data[count].NgayCapNhat,
  //   //             SoLuongTon: data.data.data[count].SoLuongTon,
  //   //             MaNXB: axios.get(`${UtiUrl}/TenNXB`,
  //   //             {params: {idNXB: data.data.data[count].MaNXB}})
  //   //             .then(function(response) {return response.data.data.object.Ten;}),
  //   //             MaChuDe: data.data.data[count].MaChuDe,
  //   //             MaTacGia: data.data.data[count].MaTacGia,
  //   //             SoLuotXem: data.data.data[count].SoLuotXem,
  //   //             SoLuongBan: data.data.data[count].SoLuongBan
  //   //         }
  //   //         count++;
  //   //     });
  //   //     setData(dataObj);
  //   // })
  // }, [dataColumns]);
  const handleDelete = (id, MaSach) => {
    axios
      .delete(`${BaseUrl}/book/delete/${MaSach}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to = {`/books/${params.id}`}
              style= {{textDecoration:"none"}}
              state={{id:params.row.MaSach}}
            >
              <div className="viewButton">Chi tiết</div>
            </Link>
            <Link
              to="/books/edit"
              style={{ textDecoration: "none" }}
              state={{ id: params.row.MaSach }}
            >
              <div className="viewButton">Sửa</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id, params.row.MaSach)}
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
      <div className="datatableTitle">{addAction}</div>
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

export default BookDatatable;
