const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");

function CategoryData(data) {
    this.categoryName = data.categoryName;
}

exports.categoryList = [
    function (req, res) {
        let categories;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                categories = await pool.request()
                    .execute('SelectAllChuDe');
                return categories;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách chủ đề thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.categoryCreate = [
    body("TenChuDe").isLength({ min: 1 }).trim().withMessage("Tên thể loại không được bỏ trống."),
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
                    addedCategory = await pool.request()
                        .input('TenChuDe', sql.NVarChar(50), req.body.TenChuDe)
                        .execute('InsertChuDe');
                    return addedCategory;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Thêm chủ đề thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.categoryDelete = [
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
                        .input('MaChuDe', sql.Int, req.params.id)
                        .execute('DeleteCD');
                    return deletedCategory;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "xóa chủ đề thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.categoryUpdate = [
    body("TenChuDe").isLength({ min: 1 }).trim().withMessage("Tên chủ đề không được bỏ trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let updatedCategory;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    updatedCategory = await pool.request()
                        .input('MaChuDe', sql.Int, req.params.id)
                        .input('TenChuDe', sql.NVarChar(50), req.body.TenChuDe)
                        .execute('UpdateChuDe');
                    return updatedCategory;
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