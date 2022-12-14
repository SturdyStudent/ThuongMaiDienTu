import { format } from 'date-fns'
import './common.css'

export const userColumns = [
  { field: "id", headerName: "id", width: 170 },
  { field: "HoTen", headerName: "Họ tên", width: 170 },
  { field: "TaiKhoan", headerName: "Tài khoản", width: 170 },
  { field: "Email", headerName: "Email", width: 170 },
  { field: "DiaChi", headerName: "Địa chỉ", width: 170 },
  { field: "DienThoai", headerName: "Điện thoại", width: 170 },
  { field: "GioiTinh", headerName: "Giới tính", width: 100 },
  {
    field: "NgaySinh", headerName: "Ngày sinh", width: 170, renderCell: (params) => {
      let birthday = format(new Date(params.row.NgaySinh), 'dd/MM/yyyy');
      return (
        <div>{birthday}</div>
      )
    }
  },
];

export const voucherColumns = [
  { field: "id", headerName: "CODE", width: 170 },
  {
    field: "CodeVouher", headerName: "TRẠNG THÁI", width: 120, renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
  { field: "TriGiaGiam", headerName: "GIÁ TRỊ", width: 150 },
  { field: "NgayBatDau", headerName: "NGÀY KÍCH HOẠT", width: 150 },
  { field: "NgayKetThuc", headerName: "NGÀY HẾT HẠN", width: 150 },
  { field: "SoLuong", headerName: "SỐ LƯỢNG CÒN LẠI", width: 160 },
  { field: "HieuLuc", headerName: "HIỆU LỰC", width: 160 },
  { field: "LoaiVoucher", headerName: "ĐIỀU KIỆN VOUCHER", width: 160 },
  { field: "MucToiThieuCan", headerName: "MỨC ÁP DỤNG TỐI THIỂU", width: 160 },
  { field: "MucToiDaCan", headerName: "MỨC GIẢM TỐI ĐA", width: 160 },

];
export const ratingColumns = [
  { field: "id", headerName: "Id", width: 170 },
  { field: "product", headerName: "Sản phẩm", width: 170 },
  { field: "user", headerName: "Người viết", width: 170 },
  { field: "rating", headerName: "Đánh giá", width: 170 },
  { field: "status", headerName: "Trạng thái", width: 170 },
  { field: "dateAdded", headerName: "Ngày thêm vào", width: 170 },
]
export const orderColumns = [
  { field: "id", headerName: "Mã đơn hàng", width: 100 },
  { field: "MaKH", headerName: "Mã khách hàng", width: 130 },
  { field: "NgayDat", headerName: "Ngày đặt hàng", width: 140 },
  { field: "ThanhTien", headerName: "Trị giá", width: 110 },
  { field: "TinhTrangGiaoHang", headerName: "Tình trạng giao hàng", width: 170, renderCell: (params) => {
    return (
      <div className={`orderStatus status${String(params.row.TinhTrangGiaoHang)}`}>
        {
          (Number(params.row.TinhTrangGiaoHang) === 0 ) ? 
          'Không giao/ hủy đơn' : 
          (Number(params.row.TinhTrangGiaoHang) === 1 ) ? 
          'Đặt hàng thành công' : 
          (Number(params.row.TinhTrangGiaoHang) === 2 ) ? 
          'Đã duyệt đơn' : 
          (Number(params.row.TinhTrangGiaoHang) === 3 ) ?
          'Đang giao' : 
          (Number(params.row.TinhTrangGiaoHang) === 4 ) ?
          'Giao thành công' : null
        }
      </div>
    );
  }},
  { field: "DaThanhToan", headerName: "Đã thanh toán", width: 130, renderCell: function (params){
    return (
      <div className={`orderStatus payment${String(params.row.DaThanhToan)}`}>
        {
          (Number(params.row.DaThanhToan) === 0 ) ?
          'Chưa thanh toán' : 'Đã thanh toán' 
        }
      </div>
    )
  }},
  { field: "NgayGiao", headerName: "Ngày giao hàng", width: 170 },
  { field: "TenNguoiNhan", headerName: "Tên người nhận", width: 170 },
  { field: "DiaChiGiao", headerName: "Địa chỉ nhận", width: 300 },
  { field: "DienThoaiNguoiNhan", headerName: "Điện thoại nhận", width: 170 },
  { field: "HinhThucThanhToan", headerName: "Hình thức thanh toán", width: 170 },
  { field: "HinhThucGiaoHang", headerName: "Hình thức giao hàng", width: 170 },
  { field: "IDVoucher", headerName: "ID Voucher", width: 170 },
  { field: "MaNV", headerName: "Nhân viên giao", width: 170 }
]

export const transportColumns = [
  { field: "id", headerName: "Mã đơn hàng", width: 100 },
  { field: "MaKH", headerName: "Mã khách hàng", width: 130 },
  { field: "NgayDat", headerName: "Ngày đặt hàng", width: 140 },
  { field: "ThanhTien", headerName: "Trị giá", width: 110 },
  { field: "TinhTrangGiaoHang", headerName: "Tình trạng giao hàng", width: 170, renderCell: (params) => {
    return (
      <div className={`orderStatus status${String(params.row.TinhTrangGiaoHang)}`}>
        {
          (Number(params.row.TinhTrangGiaoHang) === 0 ) ? 
          'Không giao/ hủy đơn' : 
          (Number(params.row.TinhTrangGiaoHang) === 2 ) ? 
          'Đã duyệt đơn' : 
          (Number(params.row.TinhTrangGiaoHang) === 3 ) ?
          'Đang giao' : 
          (Number(params.row.TinhTrangGiaoHang) === 4 ) ?
          'Giao thành công' : null
        }
      </div>
    );
  }},
  { field: "NgayGiao", headerName: "Ngày giao hàng", width: 170 },
  { field: "TenNguoiNhan", headerName: "Tên người nhận", width: 170 },
  { field: "DiaChiGiao", headerName: "Địa chỉ nhận", width: 300 },
  { field: "DienThoaiNguoiNhan", headerName: "Điện thoại nhận", width: 170 },
  { field: "HinhThucThanhToan", headerName: "Hình thức thanh toán", width: 170 },
  { field: "HinhThucGiaoHang", headerName: "Hình thức giao hàng", width: 170 },
  { field: "IDVoucher", headerName: "ID Voucher", width: 170 }
]

export const bookColumns = [
  { field: "id", headerName: "Mã sách", width: 70 },
  { field: "TenSach", headerName: "Tên sách", width: 170 },
  { field: "GiaBan", headerName: "Giá bán", width: 100 },
  {
    field: "AnhBia", headerName: "Ảnh bìa", width: 70,
    renderCell: (params) => {
      return (
        <div className="p-2 text-center d-flex justify-content-center">
          <div style={{ width: "fitContent" }}>
            <img width={"35px"} height={"50px"} src={`http://127.0.0.1:3002/public/${params.row.AnhBia}`} alt="avatar" />
          </div>
        </div >
      );
    },
  },
  { field: "NgayCapNhat", headerName: "Ngày cập nhật", width: 170 },
  { field: "SoLuongTon", headerName: "Số lượng tồn", width: 90 },
  { field: "MaNXB", headerName: "Mã nhà xuất bản", width: 90 },
  { field: "MaChuDe", headerName: "Mã thể loại", width: 90 },
  { field: "MaTacGia", headerName: "Mã tác giả", width: 90 },
];
export const categoryColumns = [
  { field: "id", headerName: "Mã chủ đề", width: 170 },
  { field: "TenChuDe", headerName: "Tên chủ đề", width: 170 }
];

export const publisherColumns = [
  { field: "id", headerName: "Mã nhà xuất bản", width: 170 },
  { field: "TenNXB", headerName: "Tên nhà xuất bản", width: 170 },
  { field: "DiaChi", headerName: "Địa chỉ", width: 170 },
  { field: "DienThoai", headerName: "Điện thoại", width: 170 }
];

export const authorColumns = [
  { field: "id", headerName: "Mã tác giả", width: 170 },
  { field: "TenTacGia", headerName: "Tên tác giả", width: 170 },
  { field: "DiaChi", headerName: "Địa chỉ", width: 170 },
  { field: "TieuSu", headerName: "Tiểu sử", width: 170 },
  { field: "DienThoai", headerName: "Điện thoại", width: 170 },
  {
    field: "HinhTacGia", headerName: "Hình tác giả", width: 170,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" width={"100px"} height={"100px"} src={`http://127.0.0.1:3002/public/${params.row.authorImage}`} alt="avatar" />
        </div>
      );
    },
  }
];
