import Switch from "react-switch";
import { format } from 'date-fns'

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
  { field: "id", headerName: "#", width: 170 },
  // {
  //   field: "status", headerName: "TRẠNG THÁI", width: 120, renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
  {field: "CodeVoucher", headerName:"Mã Áp Dụng", width: 150},
  // { field: "value", headerName: "GIÁ TRỊ", width: 150 },
  { field: "NgayBatDau", headerName: "NGÀY KÍCH HOẠT", width: 150 },
  { field: "NgayKetThuc", headerName: "NGÀY HẾT HẠN", width: 150 },
  { field: "TriGiaGiam", headerName: "Mức giảm", with: 150},
  { field: "DieuKienVoucher", headerName: "Điều kiện áp dụng", with: 150},
  { field: "SoLuong", headerName: "SỐ LƯỢNG CÒN LẠI", width: 160 }
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
  { field: "MaKH", headerName: "Khách hàng", width: 170 },
  { field: "ngayDat", headerName: "Ngày đặt", width: 120 },
  { field: "ThanhTien", headerName: "Thành tiền", width: 120 },
  { field: "TinhTrangGiaoHang", headerName: "Đã giao", width: 100 },
  { field: "DaThanhToan", headerName: "Đã thanh toán", width: 100 },
  { field: "ngayGiao", headerName: "Ngày giao", width: 120 },
  { field: "TenNguoiNhan", headerName: "Tên người nhận", width: 120 },
  { field: "DiaChiGiao", headerName: "Địa chỉ nhận", width: 120 },
  { field: "DienThoaiNguoiNhan", headerName: "Điện thoại nhận", width: 150 },
  { field: "HinhThucThanhToan", headerName: "Hình thức thanh toán", width: 150 },
  { field: "HinhThucGiaoHang", headerName: "Hình thức giao hàng", width: 150 },
  { field: "MaNV", headerName: "Người giao hàng", width: 150 }
]

export const bookColumns = [
  // { field: "id", headerName: "Mã sách", width: 80 },
  { field: "TenSach", headerName: "Tên sách", width: 170 },
  { field: "GiaBan", headerName: "Giá bán", width: 100 },
  // { field: "MoTa", headerName: "Mô tả Nội dung", width: 200 },
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
  { field: "NgayCapNhat", headerName: "Ngày cập nhật", width: 115 },
  { field: "SoLuongTon", headerName: "Số lượng tồn", width: 100 },
  { field: "MaNXB", headerName: "Nhà xuất bản", width: 120 },
  { field: "MaChuDe", headerName: "Thể loại", width: 120, },
  { field: "MaTacGia", headerName: "Tác giả", width: 120 },
  { field: "SoLuotXem", headerName: "Lượt xem", width: 80 },
  { field: "SoLuongBan", headerName: "Lượng bán", width: 80 },
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
//temporary data
//temporary data
export const voucherRows = [
  {
    id: 'EFOOD-2020',
    status: "active",
    value: '10%',
    invokeDate: "19/12/2020",
    expireDate: "14/08/2021",
    qtyLeft: 35,
  }]
export const ratingsRows = [
  {
    id: '87asf594s',
    product: "Gấu bông màu hồng",
    user: 'jasp2358asdf',
    rating: 5,
    status: 'Disable',
    dateAdded: "14/08/2021",
  }]
export const orderRows = [
  {
    id: 'fahseyaasg',
    customerId: 'asgdy89qtawg',
    orderDate: "19/08/2022",
    totalCost: '190.000đ',
    isDelivered: true,
    isPaid: false,
    deliverDate: '20/09/2022',
    receiverName: "Trịnh Công Núi",
    receiverAddress: '109 đường Hoàng Thế Hiển, Phường 7, Quận Ba Đình, Hà Nội',
    paymentMethod: 'Thanh toán tiền mặt khi nhận hàng',
    deliverMethod: 'Giao hàng tiết kiệm',
    deliverMan: 'Trần Ngọc Hoàng',
    isApproved: true
  }
]

export const bookRows = [
  {
    id: "138fafa473a",
    bookName: "Người Xứ Phản",
    bookPrice: "200.000đ",
    bookDescription: "Chí Phèo là một chàng trai mạnh mẽ và can đảm, vào một ngày nọ...",
    coverUrl: 'cover.com/png/1',
    updateDate: '22/10/2022',
    quantityLeft: 12,
    publisherId: "12wera-fasdg9as",
    categoryId: "3ra09fa-fa-sfasfh",
    authorId: "r890waerafafasf",
    soldQty: 121,
    pageViews: 1200
  }
]

export const categoryRows = [
  {
    id: "qq90asffdaaaf",
    categoryName: "Kinh dị"
  }
]

export const publisherRows = [
  {
    id: "as7d0asfdasfda",
    publisherName: "NXB Kim Đồng"
  }
]

export const authorRows = [
  {
    id: "qwre09f8as-dfasfa",
    authorName: "Can Tiểu Hy",
    biography: "Đậu đại học kiến trúc với điểm số thủ khoa đầu vào, Can Tiểu Hy gây dựng sự nghiệp với một loạt các..."
  }
]
