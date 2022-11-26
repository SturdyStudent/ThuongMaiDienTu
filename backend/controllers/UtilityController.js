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
                waitPool().then((result) => {
                    return apiResponse.successResponseWithData(res, "số lượng voucher đã giảm", result);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.HienTenNXB = [
    (req,res) => {
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                let TenNXB = await pool.request()
                    .input('idNXB', sql.Int, req.headers.idnxb)
                    .query('select dbo.fn_getTenNXB(@idNXB) as TenNXB');
                return TenNXB;
            }
            waitPool().then((data) => {
                return apiResponse.successResponseWithData(res, "Lấy tên thành công", data.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        }
        catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]
exports.HienTenChuDe = [
    (req,res) => {
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                let TheLoai = await pool.request()
                    .input('idChuDe', sql.Int, req.headers.idChuDe)
                    .query('select dbo.fn_getTenNXB(@idChuDe) as ChuDe');
                return TheLoai;
        }
        waitPool().then((data) => {
            return apiResponse.successResponseWithData(res, "Hiện chủ đề thành công", data.recordsets[0]);
        }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        }
        catch(err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]
exports.HienTenTacGia = [
    (req, res) => {
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                let TacGia = await pool.request()
                    .input('idTacGia', sql.Int, req.headers.idTacGia)
                    .query('select dbo.fn_getTenTacGia(@idTacGia) as TacGia');
                return TacGia;
            }
            waitPool().then((data) => {
                return apiResponse.successResponseWithData(res, 'Hiện tên tác giả thành công', data.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        }
        catch(err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]