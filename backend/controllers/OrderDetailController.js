const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");

/* Lấy danh sách sản phẩm chi tiết của đơn hàng */
//Chức năng này có thể không cần
exports.orderDetailList = [
    function (req, res) {
        let orderDetailList;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                orderDetailList = await pool.request()
                    .input('idDonHang', sql.Int, req.body.id)
                    .execute('SelectIdDonHang');
                return orderDetailList;
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
//Chức năng này có thể không cần
exports.orderItemListId = [
    function (req, res) {
        let order;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                order = await pool.request()
                    .input('idDonHang', sql.Int, req.body.id)
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
exports.orderDetailCreate = [
    body("MaDonHang").notEmpty().withMessage("Mã đơn hàng không tồn tại."),
    body("MaSach").notEmpty().withMessage("Mã sách không tồn tại."),
    body("SoLuong").notEmpty().withMessage("Số lượng không được bỏ trống."),
    body("DonGia").notEmpty().withMessage("Đơn giá không được bỏ trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    addedOrderDetailList = await pool.request()
                    .input('MaDonHang', sql.Int, req.body.MaDonHang)
                    .input('MaSach', sql.Int, req.body.MaSach)
                    .input('SoLuong', sql.Int, req.body.SoLuong)
                    .input('DonGia', sql.Money , req.body.DonGia)
                    .execute('InsertChiTietDonHang');
                    return addedOrderDetailList;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Đã tạo chi tiết đơn hàng thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

//Xóa chi tiết đơn hàng
/*
WARNING: Xóa 1 đơn hàng có thể dẫn tới xóa hết các chi tiết 
đơn hàng có liên quan đến id đơn hàng đó nên chỉnh lại bảng chi tiết
*/
exports.orderDetailDelete = [
    function (req, res) {
        try {
            let deletedOrderListDetail;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    deletedOrderListDetail = await pool.request()
                        .input('MaCTDH', sql.Int, req.body.MaCTDH)
                        .execute('DeleteChiTietDonHang');
                    return deletedOrderListDetail;
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


exports.orderDetailUpdate = [
    body("MaDonHang").notEmpty().withMessage("Mã đơn hàng không tồn tại."),
    body("MaSach").notEmpty().withMessage("Mã sách không tồn tại."),
    body("SoLuong").notEmpty().withMessage("Số lượng không được bỏ trống."),
    body("DonGia").notEmpty().withMessage("Đơn giá không được bỏ trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let updatedOrderDetail;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    updatedOrderDetail = await pool.request()
                        .input('MaChiTietDonHang', sql.Int, req.params.id)
                        .input('MaDonHang', sql.Int, req.body.MaDonHang)
                        .input('MaSach', sql.Int, req.body.MaSach)
                        .input('SoLuong', sql.Int, req.body.SoLuong)
                        .input('DonGia', sql.Money , req.body.DonGia)
                        .execute('UpdateChiTietDonHang');
                    return updatedOrderDetail;
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