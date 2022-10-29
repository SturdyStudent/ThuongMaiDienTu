const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");

/* Lấy danh sách giao hàng */
exports.shipmentList = [
    function (req, res) {
        let shipmentList;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                shipmentList = await pool.request()
                    .execute('SelectAllGiaoHang');
                return shipmentList;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách giao hàng thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

/* lấy giao hàng theo Id */
exports.shipmentItemId = [
    function (req, res) {
        let order;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                shipment = await pool.request()
                    .input('idGiaoHang', sql.Int, req.params.id)
                    .execute('SelectIdGiaoHang');
                return order;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy id giao hàng thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

/* Tạo giao hàng mới */
/*
NOTE: Cần thêm store procedure để giao hàng thành công hay không => đã xong
*/
exports.shipmentCreate = [
    body("MaNV").notEmpty().withMessage("Mã nhân viên không tồn tại hoặc trống"),
    body("MaDonHang").notEmpty().withMessage("Mã đơn hàng không tồn tại hoặc trống"),
    body("NgayGiao").notEmpty().withMessage("Ngày giao không được bỏ trống."),
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
                    shipment = await pool.request()
                    .input('MaNV', sql.Int, req.body.MaNV)
                    .input('MaDonHang', sql.Int, req.body.MaDonHang)
                    .input('NgayGiao', sql.Int, req.body.NgayGiao)
                    .execute('InsertGiaoHang');
                    return shipment;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Đã tạo giao hàng thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

//Xóa giao hàng
exports.shipmentDelete = [
    function (req, res) {
        try {
            let deletedShipment;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    deletedShipment = await pool.request()
                        .input('MaGH', sql.Int, req.body.MaGH)
                        .execute('DeleteGiaoHang');
                    return deletedShipment;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "xóa giao hàng thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

//Update giao hàng
exports.shipmentUpdate = [
    body("MaNV").notEmpty().withMessage("Mã nhân viên không tồn tại hoặc trống"),
    body("MaDonHang").notEmpty().withMessage("Mã đơn hàng không tồn tại hoặc trống"),
    body("NgayGiao").notEmpty().withMessage("Ngày giao không được bỏ trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let updatedShipment;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    updatedShipment = await pool.request()
                        .input('MaGH', sql.Int, req.params.id)
                        .input('MaNV', sql.Int, req.body.MaNV)
                        .input('MaDonHang', sql.Int, req.body.MaDonHang)
                        .input('NgayGiao', sql.Int, req.body.NgayGiao)
                        .execute('UpdateGiaoHang');
                    return updatedShipment;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Sửa giao hàng thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];