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
                return apiResponse.successResponseWithData(res, "Lấy id đơn hàng thành công", result.recordsets[0]);
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
                    let timestamp = "";
                    let daystamp = new Date().getDate();
                    let monthstamp = new Date().getMonth();
                    let yearstamp = new Date().getFullYear();
                    timestamp = yearstamp + "-" + monthstamp + "-" + daystamp;
                    let pool = await sql.connect(config);
                    Order = {
                        DaThanhToan: req.body.DaThanhToan,
                        TinhTrangGiaoHang: req.body.TinhTrangGiaoHang,
                        NgayDat: timestamp,
                        MaKH: req.body.MaKH,
                        TenNguoiNhan: req.body.TenNguoiNhan,
                        DienThoaiNguoiNhan: req.body.DienThoaiNguoiNhan,
                        DiaChiGiao: req.body.DiaChiGiao,
                        HinhThucThanhToan: req.body.HinhThucThanhToan,
                        HinhThucGiaoHang: req.body.HinhThucGiaoHang,
                        IDVoucher: req.body.IDVoucher,
                        ThanhTien: req.body.ThanhTien
                    }
                    if(Order.IDVoucher == null || Order.IDVoucher == "") //Dùng để kiểm tra có sử dụng voucher hay không
                    {
                        addedOrder = await pool.request()
                        .input('DaThanhToan', sql.Bit, Order.DaThanhToan)
                        .input('TinhTrangGiaoHang', sql.Bit, Order.TinhTrangGiaoHang)
                        .input('NgayDat', sql.Date, Order.NgayDat)
                        .input('MaKH', sql.Int, Order.MaKH)
                        .input('TenNguoiNhan', sql.NVarChar(50), Order.TenNguoiNhan)
                        .input('DienThoaiNguoiNhan', sql.NVarChar(50), Order.DienThoaiNguoiNhan)
                        .input('DiaChiGiao', sql.NVarChar(50), Order.DiaChiGiao)
                        .input('HinhThucThanhToan', sql.NVarChar(20), Order.HinhThucThanhToan)
                        .input('HinhThucGiaoHang', sql.NVarChar(20), Order.HinhThucGiaoHang)
                        .input('ThanhTien', sql.Money, Order.ThanhTien)
                        .execute('InsertDonHangNotVoucher');
                    }
                    else
                    {
                        addedOrder = await pool.request()
                        .input('DaThanhToan', sql.Bit, Order.DaThanhToan)
                        .input('TinhTrangGiaoHang', sql.Bit, Order.TinhTrangGiaoHang)
                        .input('NgayDat', sql.Date, Order.NgayDat)
                        .input('MaKH', sql.Int, Order.MaKH)
                        .input('TenNguoiNhan', sql.NVarChar(50), Order.TenNguoiNhan)
                        .input('DienThoaiNguoiNhan', sql.NVarChar(50), Order.DienThoaiNguoiNhan)
                        .input('DiaChiGiao', sql.NVarChar(50), Order.DiaChiGiao)
                        .input('HinhThucThanhToan', sql.NVarChar(20), Order.HinhThucThanhToan)
                        .input('HinhThucGiaoHang', sql.NVarChar(20), Order.HinhThucGiaoHang)
                        .input('IDVoucher', sql.Int, Order.IDVoucher)
                        .input('ThanhTien', sql.Money, Order.ThanhTien)
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
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    updatedOrder = await pool.request()
                        .input('MaDonHang', sql.Int, req.params.id)
                        .input('DaThanhToan', sql.Int, rreq.body.DaThanhToan)
                        .input('TinhTrangGiaoHang', sql.NVarChar(50), req.body.TinhTrangGiaoHang)
                        .input('NgayGiao', sql.NVarChar(50), req.body.NgayGiao)
                        .input('TenNguoiNhan', sql.NVarChar(50), req.body.TenNguoiNhan)
                        .input('DienThoaiNguoiNhan', sql.NVarChar(50), req.body.DienThoaiNguoiNhan)
                        .input('DiaChiGiao', sql.NVarChar(50), req.body.DiaChiGiao)
                        .execute('UpdateDonHang');
                    return updatedOrder;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Sửa chủ đề thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];