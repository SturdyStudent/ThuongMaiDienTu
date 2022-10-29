const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");

exports.GiaoThanhCong = [
    body("MaDonHang").notEmpty().withMessage("Mã đơn hàng không tồn tại hoặc trống"),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let shipSuccess;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    shipSuccess = await pool.request()
                        .input('MaDonHang', sql.Int, req.body.id)
                        .execute('GiaoThanhCong');
                    return shipSuccess;
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
]

exports.DescVoucher = [
    (req, res) => {
        try {
            let SubstractVoucher;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    SubstractVoucher = await pool.request()
                        .input('IDVoucher', sql.Int, req.body.IDVoucher)
                        .execute('DescVoucher');
                    return SubstractVoucher;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "số lượng voucher đã giảm", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
]