const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const config = require("../dbConfig");
const apiResponse = require("../helpers/apiResponse")
const sql = require('mssql')

exports.userList = [
    (req, res) => {
        let customers;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                customers = await pool.request()
                    .execute('SelectAllKhachHang');
                return customers;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách khách hàng thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.userListById = [
    (req, res) => {
        let customers;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                customers = await pool.request()
                    .input("idKhachHang", sql.Int, req.params.id)
                    .execute('SelectIdKhachHang');
                return customers;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách khách hàng thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.userCreate = [
    body("HoTen").notEmpty().withMessage("Không được bỏ trống tên khách hàng").isLength({ min: 3 }).trim().withMessage("Số lượng kí tự phải lớn hơn 3."),
    body("DiaChi").notEmpty().withMessage("Không được bỏ trống địa chỉ").isLength({ min: 5 }).trim()
        .withMessage("Số lượng kí tự phải lớn hơn 5"),
    body("DienThoai").isLength({ min: 10 }).notEmpty().withMessage("Không được bỏ trống tên điện thoại").withMessage("Số điện thoại không đúng định dạng"),
    body("Email").notEmpty().withMessage("Không được bỏ trống email").isLength({ min: 1 }).trim().withMessage("Số lượng kí tự phải lớn hơn 1")
        .isEmail().withMessage("Email không đúng định dạng.").custom(async (value) => {
            return sql.connect(config).then(async pool => {
                let result = await pool.request()
                    .input("Email", sql.NVarChar(50), value)
                    .query("SELECT * FROM KhachHang WHERE Email = @Email");
                if (result.recordset.length > 0) {
                    return Promise.reject("Email đã được sử dụng");
                }
            })
        }),
    body("TaiKhoan").notEmpty().withMessage("Không được bỏ trống tài khoản"),
    body("GioiTinh").notEmpty().withMessage("Không được bỏ trống giới tính"),
    body("MatKhau").notEmpty().withMessage("Không được bỏ trống mật khẩu").isLength({ min: 6 }).trim().withMessage("Mật khẩu phải ít nhất 6 kí tự").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage("Password phải có ít nhất 1 chữ viết hoa, 1 chữ viết thường và 1 số bất kì, và không chứa kí tự đặc biệt và có nhiều hơn 6 kí tự"),
    sanitizeBody("*").escape(),
    (req, res) => {
        let customers;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                customers = await pool.request()
                    .input('HoTen', sql.NVarChar(50), req.body.HoTen)
                    .input('TaiKhoan', sql.VarChar(50), req.body.TaiKhoan)
                    .input('MatKhau', sql.NVarChar(50), req.body.MatKhau)
                    .input('Email', sql.NVarChar(100), req.body.Email)
                    .input('DiaChi', sql.NVarChar(200), req.body.DiaChi)
                    .input('DienThoai', sql.VarChar(50), req.body.DienThoai)
                    .input('GioiTinh', sql.NVarChar(3), req.body.GioiTinh)
                    .input('NgaySinh', sql.Date, req.body.NgaySinh)
                    .execute('InsertKhachHangFromAdmin');
                return customers;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Thêm khách hàng thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.userDelete = [
    function (req, res) {
        let deletedUser;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                deletedUser = await pool.request()
                    .input('MaKH', sql.NVarChar(50), req.params.id)
                    .execute('DeleteKhachHang');
                return deletedUser;
            }
            waitPool().then((data) => {
                return apiResponse.successResponseWithData(res, "Xóa khách hàng thành công", data.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.userUpdate = [
    body("HoTen").notEmpty().withMessage("Không được bỏ trống tên khách hàng").isLength({ min: 3 }).trim().withMessage("Số lượng kí tự phải lớn hơn 3."),
    body("DiaChi").notEmpty().withMessage("Không được bỏ trống địa chỉ").isLength({ min: 5 }).trim()
        .withMessage("Số lượng kí tự phải lớn hơn 5"),
    body("DienThoai").isLength({ min: 10 }).notEmpty().withMessage("Không được bỏ trống tên điện thoại").withMessage("Số điện thoại không đúng định dạng"),
    body("Email").notEmpty().withMessage("Không được bỏ trống email").isLength({ min: 1 }).trim().withMessage("Số lượng kí tự phải lớn hơn 1")
        .isEmail().withMessage("Email không đúng định dạng."),
    body("TaiKhoan").notEmpty().withMessage("Không được bỏ trống tài khoản"),
    body("GioiTinh").notEmpty().withMessage("Không được bỏ trống giới tính"),
    body("TaiKhoan").notEmpty().withMessage("Không được bỏ trống tài khoản"),
    body("MatKhau").notEmpty().withMessage("Không được bỏ trống mật khẩu").isLength({ min: 6 }).trim().withMessage("Mật khẩu phải ít nhất 6 kí tự").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage("Password phải có ít nhất 1 chữ viết hoa, 1 chữ viết thường và 1 số bất kì, và không chứa kí tự đặc biệt"),
    sanitizeBody("*").escape(),
    (req, res) => {
        let customers;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                customers = await pool.request()
                    .input("MaKH", sql.Int, req.params.id)
                    .input('HoTen', sql.NVarChar(50), req.body.HoTen)
                    .input('TaiKhoan', sql.VarChar(50), req.body.TaiKhoan)
                    .input('MatKhau', sql.NVarChar(50), req.body.MatKhau)
                    .input('Email', sql.NVarChar(100), req.body.Email)
                    .input('DiaChi', sql.NVarChar(200), req.body.DiaChi)
                    .input('DienThoai', sql.VarChar(50), req.body.DienThoai)
                    .input('GioiTinh', sql.NVarChar(3), req.body.GioiTinh)
                    .input('NgaySinh', sql.Date, req.body.NgaySinh)
                    .execute('UpdateKhachHang');
                return customers;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Cập nhật khách hàng thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];