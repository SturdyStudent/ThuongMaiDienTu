const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");

exports.voucherList = [
    function (req, res) {
        let vouchers;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                vouchers = await pool.request()
                    .execute('SelectAllVoucher');
                return vouchers;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách voucher thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.voucherItemId = [
    function (req, res) {
        let voucher;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                voucher = await pool.request()
                    .input('IdVoucher', sql.Int, req.params.id)
                    .execute('SelectIdVoucher');
                return voucher;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy voucher  thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];


exports.voucherItemName = [
    function (req, res) {
        let voucher;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                voucher = await pool.request()
                    .input('CodeVoucher', sql.NVarChar(50), req.body.CodeVoucher)
                    .execute('SelectTenVoucher');
                return voucher;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy code voucher thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];



exports.voucherCreate = [
    body("CODEVoucher").notEmpty().withMessage("Không được bỏ trống trường mã voucher"),
    body("NgayBatDau").notEmpty().withMessage("Không được bỏ trống trường ngày bắt đầu"),
    body("NgayKetThuc").notEmpty().withMessage("Không được bỏ trống trường ngày kết thúc"),
    body("TriGiaGiam").notEmpty().withMessage("Không được bỏ trống trường trị giá giảm"),
    body("DieuKienVoucher").notEmpty().withMessage("Không được bỏ trống trường điều kiện voucher"),
    body("Soluong").notEmpty().withMessage("Không được bỏ trống trường số lượng"),
    body("Hieuluc").notEmpty().withMessage("Không được bỏ trống trường hiệu lực"),
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
                    addedVoucher = await pool.request()
                        .input('CODEVoucher', sql.NVarChar(50), req.body.CODEVoucher)
                        .input('NgayBatDau', sql.Date, req.body.NgayBatDau)
                        .input('NgayKetThuc', sql.Date, req.body.NgayKetThuc)
                        .input('TriGiaGiam', sql.Money, req.body.TriGiaGiam)
                        .input('DieuKienVoucher', sql.NVarChar(50), req.body.DieuKienVoucher)
                        .input('SoLuong', sql.Int, req.body.Soluong)
                        .input('Hieuluc', sql.Bit, req.body.Hieuluc)
                        .execute('InsertVoucher');
                    return addedVoucher;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Thêm Voucher thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }

    }
];

exports.voucherDelete = [
    function (req, res) {
        try {
            let deletedVoucher;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    deletedVoucher = await pool.request()
                        .input('IDVoucher', sql.Int, req.params.id)
                        .execute('DeleteVoucher');
                    return deletedVoucher;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "xóa tác giả thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.voucherUpdate = [
    body("CODEVoucher").notEmpty().withMessage("Không được bỏ trống trường mã voucher"),
    body("NgayBatDau").notEmpty().withMessage("Không được bỏ trống trường ngày bắt đầu"),
    body("NgayKetThuc").notEmpty().withMessage("Không được bỏ trống trường ngày kết thúc"),
    body("TriGiaGiam").notEmpty().withMessage("Không được bỏ trống trường trị giá giảm"),
    body("DieuKienVoucher").notEmpty().withMessage("Không được bỏ trống trường điều kiện voucher"),
    body("SoLuong").notEmpty().withMessage("Không được bỏ trống trường số lượng"),
    body("Hieuluc").notEmpty().withMessage("Không được bỏ trống trường hiệu lực"),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let updatedVoucher;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    updatedVoucher = await pool.request()
                        .input('IDVoucher', sql.Int, req.params.id)
                        .input('CodeVoucher', sql.NVarChar(sl.Max), req.body.CodeVoucher)
                        .input('NgayBatDau', sql.Date, req.body.NgayBatDau)
                        .input('NgayKetThuc', sql.Date, req.body.NgayKetThuc)
                        .input('TriGiaGiam', sql.Money, req.body.TriGiaGiam)
                        .input('DieuKienVoucher', sql.NVarChar(50), req.body.DieuKienVoucher)
                        .input('Soluong', sql.BigInt, req.body.SoLuong)
                        .input('HieuLuc', sql.Int, req.body.HieuLuc)
                        .execute('UpdateTacGia');
                    return updatedVoucher;
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