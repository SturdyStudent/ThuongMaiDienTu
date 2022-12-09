const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");

exports.bookList = [
    (req, res) => {
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                books = await pool.request()
                    .execute('SelectAllSach');
                return books;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách sách thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.findBookBySearchTerm = [
    (req, res) => {
        try {
            let book;
            const waitPool = async () => {
                let pool = await sql.connect(config);
                book = await pool.request()
                    .input('TuKhoa', sql.NVarChar(50), req.body.TuKhoa)
                    .execute('FindBooksBySearchTerm');
                return book;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy sách thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];


exports.bookListById = [
    (req, res) => {
        try {
            let book;
            const waitPool = async () => {
                let pool = await sql.connect(config);
                book = await pool.request()
                    .input('MaSach', sql.Int, req.params.id)
                    .execute('SelectSachById');
                return book;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy sách thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.bookListByOrderId = [
    (req, res) => {
        try {
            let book;
            const waitPool = async () => {
                let pool = await sql.connect(config);
                book = await pool.request()
                    .input('idDonHang', sql.Int, req.params.orderId)
                    .execute('SelectBooksByOrderId');
                return book;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy sách thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.bookListByViews = [
    (req, res) => {
        try {
            let book;
            const waitPool = async () => {
                let pool = await sql.connect(config);
                book = await pool.request()
                    .input('Limit', sql.Int, req.params.limit)
                    .execute('SelectAllSachByViews');
                return book;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy sách thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.bookListBySales = [
    (req, res) => {
        try {
            let book;
            const waitPool = async () => {
                let pool = await sql.connect(config);
                book = await pool.request()
                    .input('Limit', sql.Int, req.params.limit)
                    .execute('SelectAllSachBySales');
                return book;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy sách thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.bookCreate = [
    body("TenSach").notEmpty().withMessage("Không được bỏ trống trường tựa đề"),
    body("GiaBan").notEmpty().withMessage("Không được bỏ trống trường giá sách"),
    body("MoTa").notEmpty().withMessage("Không được bỏ trống trường miêu tả"),
    body("AnhBia").notEmpty().withMessage("Chưa chọn hình"),
    body("SoLuongTon").notEmpty().withMessage("Chưa có số lượng hàng tồn"),
    body("MaNXB").notEmpty().withMessage("Chưa chọn tác giả"),
    body("MaChuDe").notEmpty().withMessage("Chưa chọn tác giả"),
    body("MaTacGia").notEmpty().withMessage("Chưa chọn tác giả"),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let addedBook;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    addedBook = await pool.request()
                        .input('TenSach', sql.NVarChar(50), req.body.TenSach)
                        .input('GiaBan', sql.Int, req.body.GiaBan)
                        .input('MoTa', sql.NVarChar(sql.MAX), req.body.MoTa)
                        .input('AnhBia', sql.NVarChar(sql.MAX), req.body.AnhBia)
                        .input('NgayCapNhat', sql.Date, req.body.NgayCapNhat)
                        .input('SoLuongTon', sql.Int, req.body.SoLuongTon)
                        .input('MaNXB', sql.Int, req.body.MaNXB)
                        .input('MaChuDe', sql.Int, req.body.MaChuDe)
                        .input('MaTacGia', sql.Int, req.body.MaTacGia)
                        .execute('InsertSach');
                    return addedBook;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Thêm sách thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });

            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.bookDelete = [
    function (req, res) {
        try {
            let deletedBook;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    deletedBook = await pool.request()
                        .input('MaSach', sql.Int, req.params.id)
                        .execute('DeleteSach');
                    return deletedBook;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "xóa sách thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.bookUpdate = [
    body("TenSach").notEmpty().withMessage("Không được bỏ trống trường tựa đề"),
    body("GiaBan").notEmpty().withMessage("Không được bỏ trống trường giá sách"),
    body("MoTa").notEmpty().withMessage("Không được bỏ trống trường miêu tả"),
    body("AnhBia").notEmpty().withMessage("Chưa chọn hình"),
    body("SoLuongTon").notEmpty().withMessage("Chưa có số lượng hàng tồn"),
    body("MaNXB").notEmpty().withMessage("Chưa chọn tác giả"),
    body("MaChuDe").notEmpty().withMessage("Chưa chọn tác giả"),
    body("MaTacGia").notEmpty().withMessage("Chưa chọn tác giả"),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let addedBook;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    addedBook = await pool.request()
                        .input('MaSach', sql.Int, req.params.id)
                        .input('TenSach', sql.NVarChar(50), req.body.TenSach)
                        .input('GiaBan', sql.Int, req.body.GiaBan)
                        .input('MoTa', sql.NVarChar(sql.MAX), req.body.MoTa)
                        .input('AnhBia', sql.NVarChar(sql.MAX), req.body.AnhBia)
                        .input('NgayCapNhat', sql.Date, req.body.NgayCapNhat)
                        .input('SoLuongTon', sql.Int, req.body.SoLuongTon)
                        .input('MaNXB', sql.Int, req.body.MaNXB)
                        .input('MaChuDe', sql.Int, req.body.MaChuDe)
                        .input('MaTacGia', sql.Int, req.body.MaTacGia)
                        .execute('UpdateSach');
                    return addedBook;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Sửa sách thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });

            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];