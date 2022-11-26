const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");

exports.publisherList = [
    function (req, res) {
        let publishers;
        try {
            console.log("có vào nha");
            const waitPool = async () => {
                let pool = await sql.connect(config);
                publishers = await pool.request()
                    .execute('SelectAllNXB');
                return publishers;
            }
            waitPool().then((result) => {
                console.log("đúng");
                return apiResponse.successResponseWithData(res, "Lấy danh sách nhà xuất bản thành công", result.recordsets[0]);
            }).catch(err => { 
                console.log("sai", err);
                return apiResponse.ErrorResponse(res, err) 
            });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.publisherListById = [
    function (req, res) {
        let publishers;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                publishers = await pool.request()
                    .input('MaNXB', sql.Int, req.params.id)
                    .execute('SelectNXBById');
                return publishers;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách nhà xuất bản thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.publisherCreate = [
    body("TenNXB").isLength({ min: 1 }).trim().withMessage("Tên nhà xuất bản không được bỏ trống."),
    body("DiaChi").isLength({ min: 1 }).trim().withMessage("Địa chỉ không được để trống."),
    body("DienThoai").isLength({ min: 1 }).trim().withMessage("Điện thoại không được để trống."),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    addedPublisher = await pool.request()
                        .input('TenNXB', sql.NVarChar(50), req.body.TenNXB)
                        .input('DiaChi', sql.NVarChar(50), req.body.DiaChi)
                        .input('DienThoai', sql.NVarChar(50), req.body.DienThoai)
                        .execute('InsertNXB');
                    return addedPublisher;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Thêm nhà xuất bản thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.publisherDelete = [
    function (req, res) {
        let deletedPublisher;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                deletedPublisher = await pool.request()
                    .input('MaNXB', sql.NVarChar(50), req.params.id)
                    .execute('DeleteNXB');
                return deletedPublisher;
            }
            waitPool().then((data) => {
                return apiResponse.successResponseWithData(res, "Xóa nhà xuất bản thành công", data.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.publisherUpdate = [
    body("TenNXB").isLength({ min: 1 }).trim().withMessage("Tên nhà xuất bản không được bỏ trống."),
    body("DiaChi").isLength({ min: 1 }).trim().withMessage("Địa chỉ không được để trống."),
    body("DienThoai").isLength({ min: 1 }).trim().withMessage("Điện thoại không được để trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                let updatedPublisher;
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
                }
                else {
                    const waitPool = async () => {
                        let pool = await sql.connect(config);
                        updatedPublisher = await pool.request()
                            .input('MaNXB', sql.Int, req.params.id)
                            .input('TenNXB', sql.NVarChar(50), req.body.TenNXB)
                            .input('DiaChi', sql.NVarChar(50), req.body.DiaChi)
                            .input('DienThoai', sql.NVarChar(50), req.body.DienThoai)
                            .execute('UpdateNXB');
                        return updatedPublisher;
                    }
                    waitPool().then((data) => {
                        return apiResponse.successResponseWithData(res, "Sửa nhà xuất bản thành công", data.recordsets[0]);
                    }).catch(err => { return apiResponse.ErrorResponse(res, err) });
                }
            }
        } catch (err) {
            //throw error in json response with status 500.
            return apiResponse.ErrorResponse(res, err);
        }
    }
];