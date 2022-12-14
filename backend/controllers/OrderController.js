const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");

/* Lấy danh sách đơn hàng */
exports.orderList = [
    function (req, res) {
        let orders;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                orders = await pool.request()
                    .execute('SelectAllDonHang');
                return orders;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách đơn hàng thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.orderListByUser = [
    function (req, res) {
        let orders;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                orders = await pool.request()
                    .input('MaKH', sql.Int, req.params.id)
                    .execute('SelectAllDonHangByUser');
                return orders;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách đơn hàng thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.updateDeliveryState = [
    body("TinhTrangDonHang").notEmpty().withMessage("Không được bỏ trống tình trạng đơn hàng"),
    body("NgayGiao").notEmpty().withMessage("Không được bỏ trống ngày giao"),
    body("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            let addedUser;
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi", errors.array());
            } else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    addedUser = await pool.request()
                        .input('TinhTrangDonHang', sql.SmallInt, req.body.TinhTrangDonHang)
                        .input('NgayGiao', sql.Date, req.body.NgayGiao)
                        .input('MaDonHang', sql.Int, req.params.id)
                        .execute('UpdateDeliveryState')
                    return addedUser;
                }
                waitPool()
                    .then((data) => {
                    return apiResponse.successResponseWithData(res, "Cập nhật tình trạng giao hàng thành công", data.recordsets[0]);
                }).catch(err => apiResponse.ErrorResponse(res, err));
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]
exports.orderListForTransport = [
    (req, res) => {
        try {
            const errors = validationResult(req);
            let addedUser;
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi", errors.array());
            } else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    addedUser = await pool.request()
                        .input('MaNV', sql.Int, req.params.id)
                        .execute('SelectAllDonHangForTransport')
                    return addedUser;
                }
                waitPool()
                    .then((data) => {
                    return apiResponse.successResponseWithData(res, "Lấy danh sách đơn hàng cần giao thành công", data.recordsets[0]);
                }).catch(err => apiResponse.ErrorResponse(res, err));
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]
exports.sendOrderApproveState = [
    body("ChoPhepDuyet").notEmpty().withMessage("Không được bỏ trống cho phép duyệt"),
    body("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            let addedUser;
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi", errors.array());
            } else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    addedUser = await pool.request()
                        .input('ChoPhepDuyet', sql.SmallInt, req.body.ChoPhepDuyet)
                        .input('MaDonHang', sql.Int, req.params.id)
                        .execute('DuyetDonHang')
                    return addedUser;
                }
                waitPool()
                    .then((data) => {
                    return apiResponse.successResponseWithData(res, "Duyệt đơn hàng thành công", data.recordsets[0]);
                }).catch(err => apiResponse.ErrorResponse(res, err));
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]
/* lấy đơn hàng theo Id */
exports.orderItemId = [
    function (req, res) {
        let order;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                order = await pool.request()
                    .input('idDonHang', sql.Int, req.params.id)
                    .execute('SelectIdDonHang');
                return order;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy đơn hàng thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

/* Tạo đơn hàng mới */
exports.orderCreate = [
    body("DaThanhToan").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("TinhTrangGiaoHang").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("NgayDat").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("MaKH").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("TenNguoiNhan").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("DienThoaiNguoiNhan").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("DiaChiGiao").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("HinhThucThanhToan").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("HinhThucGiaoHang").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("ThanhTien").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());  
            }
            else {
                const waitPool = async () => {
                 
                    let addedOrder;
                    let timestamp = "";
                    let daystamp = new Date().getDate();
                    let monthstamp = new Date().getMonth();
                    let yearstamp = new Date().getFullYear();
                    timestamp = yearstamp + "-" + monthstamp + "-" + daystamp;
                    let pool = await sql.connect(config);
                    

                    const orderDetail = String(req.body.ChitietDH).replace(/&quot;/g, '"').replace(/&#x5C;/g, '\\');
                    const orderedBooks = JSON.parse(orderDetail);
    
                    console.log("order",orderedBooks);
                    const Chitiet_donhang_type = new sql.Table('Chitiet_donhang_type');
    
                    Chitiet_donhang_type.create = true;
                    Chitiet_donhang_type.columns.add('MaSach', sql.Int)
                    Chitiet_donhang_type.columns.add('SoLuong', sql.Int);
                    Chitiet_donhang_type.columns.add('DonGia', sql.Int);
                    
                    orderedBooks.forEach(item => {
                        if(item.idSach !== null){
                            Chitiet_donhang_type.rows.add(item.idSach, item.soLuong, item.tongTien);
                        }else{
                            Chitiet_donhang_type.rows.add(item.MaSach, item.SoLuong, item.GiaBan);
                        }
                    })
                      

                    let Order = {
                        DaThanhToan: req.body.DaThanhToan,
                        TinhTrangGiaoHang: req.body.TinhTrangGiaoHang,
                        NgayDat: req.body.NgayDat,
                        MaKH: req.body.MaKH,
                        TenNguoiNhan: req.body.TenNguoiNhan,
                        DienThoaiNguoiNhan: req.body.DienThoaiNguoiNhan,
                        DiaChiGiao: req.body.DiaChiGiao,
                        HinhThucThanhToan: req.body.HinhThucThanhToan,
                        HinhThucGiaoHang: req.body.HinhThucGiaoHang,
                        IDVoucher: req.body.IDVoucher,
                        ThanhTien: req.body.ThanhTien
                    }
                    if (Order.IDVoucher == null || Order.IDVoucher == "") //Dùng để kiểm tra có sử dụng voucher hay không
                    {
                        addedOrder = await pool.request()
                        .input('DaThanhToan', sql.Bit, Order.DaThanhToan)
                        .input('TinhTrangGiaoHang', sql.SmallInt, Order.TinhTrangGiaoHang)
                        .input('NgayDat', sql.Date, Order.NgayDat)
                        .input('MaKH', sql.Int, Order.MaKH)
                        .input('TenNguoiNhan', sql.NVarChar(50), Order.TenNguoiNhan)
                        .input('DienThoaiNguoiNhan', sql.NVarChar(50), Order.DienThoaiNguoiNhan)
                        .input('DiaChiGiao', sql.NVarChar(sql.MAX), Order.DiaChiGiao)
                        .input('HinhThucThanhToan', sql.NVarChar(50), Order.HinhThucThanhToan)
                        .input('HinhThucGiaoHang', sql.NVarChar(50), Order.HinhThucGiaoHang)
                        .input('ThanhTien', sql.Money, Order.ThanhTien)
                        .input('MaNV', sql.Int, req.body.MaNV)
                        .input('ChiTietDH', sql.TYPES.TVP, Chitiet_donhang_type)
                        .execute('InsertDonHangNotVoucher');
                    }
                    else {
                        addedOrder = await pool.request()
                        .input('DaThanhToan', sql.Bit, Order.DaThanhToan)
                        .input('TinhTrangGiaoHang', sql.SmallInt, Order.TinhTrangGiaoHang)
                        .input('NgayDat', sql.Date, Order.NgayDat)
                        .input('MaKH', sql.Int, Order.MaKH)
                        .input('TenNguoiNhan', sql.NVarChar(50), Order.TenNguoiNhan)
                        .input('DienThoaiNguoiNhan', sql.NVarChar(50), Order.DienThoaiNguoiNhan)
                        .input('DiaChiGiao', sql.NVarChar(sql.MAX), Order.DiaChiGiao)
                        .input('HinhThucThanhToan', sql.NVarChar(50), Order.HinhThucThanhToan)
                        .input('HinhThucGiaoHang', sql.NVarChar(50), Order.HinhThucGiaoHang)
                        .input('ThanhTien', sql.Money, Order.ThanhTien)
                        .input('MaNV', sql.Int, req.body.MaNV)
                        .input('IDVoucher', sql.Int, req.body.IDVoucher)
                        .input('ChiTietDH', sql.TYPES.TVP, Chitiet_donhang_type)
                        .execute('InsertDonHangHaveVoucher');
                    }
                    return addedOrder;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Thêm đơn hàng thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.orderDelete = [
    function (req, res) {
        try {
            let deletedCategory;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    deletedCategory = await pool.request()
                        .input('MaDonHang', sql.Int, req.params.id)
                        .execute('DeleteDonHang');
                    return deletedCategory;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "xóa đơn hàng thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.orderUpdate = [
    body("DaThanhToan").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("TinhTrangGiaoHang").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("NgayDat").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("MaKH").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("TenNguoiNhan").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("DienThoaiNguoiNhan").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("DiaChiGiao").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("HinhThucThanhToan").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("HinhThucGiaoHang").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    body("ThanhTien").notEmpty().withMessage("Tên thể loại không được bỏ trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let updatedOrder;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const orderDetail = String(req.body.ChitietDH).replace(/&quot;/g, '"');
                const orderedBooks = JSON.parse(orderDetail);

                const Chitiet_donhang_type = new sql.Table('Chitiet_donhang_type');

                Chitiet_donhang_type.create = true;
                Chitiet_donhang_type.columns.add('MaSach', sql.Int)
                Chitiet_donhang_type.columns.add('SoLuong', sql.Int);
                Chitiet_donhang_type.columns.add('DonGia', sql.Int);

                orderedBooks.forEach(item => {
                    Chitiet_donhang_type.rows.add(item.MaSach, item.SoLuong, item.DonGia);
                })

                let Order = {
                    DaThanhToan: req.body.DaThanhToan,
                    TinhTrangGiaoHang: req.body.TinhTrangGiaoHang,
                    NgayDat: req.body.NgayDat,
                    MaKH: req.body.MaKH,
                    TenNguoiNhan: req.body.TenNguoiNhan,
                    DienThoaiNguoiNhan: req.body.DienThoaiNguoiNhan,
                    DiaChiGiao: req.body.DiaChiGiao,
                    HinhThucThanhToan: req.body.HinhThucThanhToan,
                    HinhThucGiaoHang: req.body.HinhThucGiaoHang,
                    IDVoucher: req.body.IDVoucher,
                    ThanhTien: req.body.ThanhTien
                }

                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    updatedOrder = await pool.request()
                        .input('MaDonHang', sql.Int, req.params.id)
                        .input('DaThanhToan', sql.Bit, Order.DaThanhToan)
                        .input('TinhTrangGiaoHang', sql.SmallInt, Order.TinhTrangGiaoHang)
                        .input('NgayDat', sql.Date, Order.NgayDat)
                        .input('MaKH', sql.Int, Order.MaKH)
                        .input('TenNguoiNhan', sql.NVarChar(50), Order.TenNguoiNhan)
                        .input('DienThoaiNguoiNhan', sql.NVarChar(50), Order.DienThoaiNguoiNhan)
                        .input('DiaChiGiao', sql.NVarChar(50), Order.DiaChiGiao)
                        .input('HinhThucThanhToan', sql.NVarChar(50), Order.HinhThucThanhToan)
                        .input('HinhThucGiaoHang', sql.NVarChar(50), Order.HinhThucGiaoHang)
                        .input('ThanhTien', sql.Money, Order.ThanhTien)
                        .input('MaNV', sql.Int, req.body.MaNV)
                        .input('IDVoucher', sql.Int, req.body.IDVoucher)
                        .input('ChiTietDH', sql.TYPES.TVP, Chitiet_donhang_type)
                        .execute('UpdateDonHang');
                    return updatedOrder;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Sửa đơn hàng thành công", data.recordsets[0]);
                }).catch(err => { 
                    console.log("detail", err);
                    return apiResponse.ErrorResponse(res, err);
                });
            }
        } catch (err) {
            console.log("500", err);
            return apiResponse.ErrorResponse(res, err);
        }
    }
];