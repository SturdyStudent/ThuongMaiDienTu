const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");

exports.authorList = [
    function (req, res) {
        let authors;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                authors = await pool.request()
                    .execute('SelectAllTacGia');
                return authors;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách tác giả thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.authorListById = [
    (req, res) => {
        let customers;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                customers = await pool.request()
                    .input("MaTacGia", sql.Int, req.params.id)
                    .execute('SelectTacGiaById');
                return customers;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách tác giả thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.authorCreate = [
    body("TenTacGia").notEmpty().withMessage("Không được bỏ trống trường tên tác giả"),
    body("TieuSu").notEmpty().withMessage("Không được bỏ trống trường tiểu sử"),
    body("DiaChi").notEmpty().withMessage("Không được bỏ trống trường địa chỉ"),
    body("DienThoai").notEmpty().withMessage("Không được bỏ trống trường điện thoại"),
    sanitizeBody("*").escape(),
    (req, res) => {
        let addedAuthor;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    addedAuthor = await pool.request()
                        .input('TenTacGia', sql.NVarChar(50), req.body.TenTacGia)
                        .input('HinhTacGia', sql.NVarChar(sql.MAX), 'null')
                        .input('DiaChi', sql.NVarChar(50), req.body.DiaChi)
                        .input('TieuSu', sql.NVarChar(sql.MAX), req.body.TieuSu)
                        .input('DienThoai', sql.NVarChar(50), req.body.DienThoai)
                        .execute('InsertTacGia');
                    return addedAuthor;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Thêm tác giả thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }

    }
];

exports.authorDelete = [
    function (req, res) {
        try {
            let deletedAuthor;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    deletedAuthor = await pool.request()
                        .input('MaTacGia', sql.Int, req.params.id)
                        .execute('DeleteTacGia');
                    return deletedAuthor;
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
exports.authorUpdate = [
    body("TenTacGia").isLength({ min: 1 }).trim().withMessage("Tên tác giả không được bỏ trống."),
    body("TieuSu").isLength({ min: 1 }).trim().withMessage("Tiểu sử không được bỏ trống."),
    body("DienThoai").isLength({ min: 1 }).trim().withMessage("Điện thoại không được bỏ trống."),
    body("DiaChi").isLength({ min: 1 }).trim().withMessage("Địa chỉ không được bỏ trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let updatedAuthor;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    updatedAuthor = await pool.request()
                        .input('MaTacGia', sql.Int, req.params.id)
                        .input('TenTacGia', sql.NVarChar(50), req.body.TenTacGia)
                        .input('HinhTacGia', sql.NVarChar(sql.MAX), 'null')
                        .input('DiaChi', sql.NVarChar(50), req.body.DiaChi)
                        .input('TieuSu', sql.NVarChar(sql.MAX), req.body.TieuSu)
                        .input('DienThoai', sql.NVarChar(50), req.body.DienThoai)
                        .execute('UpdateTacGia');
                    return updatedAuthor;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Sửa tác giả thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];