import Switch from "react-switch";
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const voucherColumns = [
  { field: "id", headerName: "CODE", width: 170 },
  {
    field: "status", headerName: "TRẠNG THÁI", width: 120, renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
  { field: "value", headerName: "GIÁ TRỊ", width: 150 },
  { field: "invokeDate", headerName: "NGÀY KÍCH HOẠT", width: 150 },
  { field: "expireDate", headerName: "NGÀY HẾT HẠN", width: 150 },
  { field: "qtyLeft", headerName: "SỐ LƯỢNG CÒN LẠI", width: 160 }
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
  { field: "id", headerName: "Mã đơn hàng", width: 170 },
  { field: "customerId", headerName: "Mã khách hàng", width: 170 },
  { field: "orderDate", headerName: "Ngày đặt hàng", width: 170 },
  { field: "totalCost", headerName: "Trị giá", width: 170 },
  { field: "isDelivered", headerName: "Đã giao", width: 70 },
  { field: "isPaid", headerName: "Đã thanh toán", width: 90 },
  { field: "deliverDate", headerName: "Ngày giao hàng", width: 170 },
  { field: "receiverName", headerName: "Tên người nhận", width: 170 },
  { field: "receiverAddress", headerName: "Địa chỉ nhận", width: 300 },
  { field: "receiverPhone", headerName: "Điện thoại nhận", width: 170 },
  { field: "paymentMethod", headerName: "Hình thức thanh toán", width: 170 },
  { field: "deliverMethod", headerName: "Hình thức giao hàng", width: 170 },
  { field: "deliverMan", headerName: "Người giao hàng", width: 170 },
  {
    field: "isApproved", headerName: "Đã duyệt", width: 170, renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.isApproved}`}>
          {<Switch checked={params.row.isApproved} />}
        </div>
      );
    },
  },
]

export const bookColumns = [
  { field: "id", headerName: "Mã sách", width: 170 },
  { field: "bookName", headerName: "Tên sách", width: 170 },
  { field: "bookPrice", headerName: "Gía bán", width: 170 },
  { field: "bookDescription", headerName: "Mô tả Nội dung", width: 170 },
  { field: "coverUrl", headerName: "Ảnh bìa", width: 70 },
  { field: "isbn", headerName: "Mã ISBN", width: 170 },
  { field: "updateDate", headerName: "Ngày cập nhật", width: 90 },
  { field: "quantityLeft", headerName: "Số lượng tồn", width: 170 },
  { field: "publisherId", headerName: "Mã nhà xuất bản", width: 170 },
  { field: "categoryId", headerName: "Mã thể loại", width: 300 },
  { field: "authorId", headerName: "Mã tác giả", width: 170 },
  { field: "soldQty", headerName: "Số lượng bán", width: 300 },
  { field: "pageViews", headerName: "Số lần xem", width: 170 }
];
export const categoryColumns = [
  { field: "id", headerName: "Mã chủ đề", width: 170 },
  { field: "categoryName", headerName: "Tên chủ đề", width: 170 }
];

export const publisherColumns = [
  { field: "id", headerName: "Mã nhà xuất bản", width: 170 },
  { field: "publisherName", headerName: "Tên nhà xuất bản", width: 170 }
];

export const authorColumns = [
  { field: "id", headerName: "Mã tác giả", width: 170 },
  { field: "authorName", headerName: "Tên tác giả", width: 170 },
  { field: "biography", headerName: "Tiểu sử", width: 170 },
  {
    field: "authorImage", headerName: "Hình tác giả", width: 170,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" width={"100px"} height={"100px"} src={params.row.authorImage} alt="avatar" />
        </div>
      );
    },
  }
];
//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
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
    receiverPhone: '98329552543',
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
