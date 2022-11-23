const { body, validationResult } = require("express-validator")
const { sanitizeBody } = require("express-validator")
const config = require("../dbConfig");
const apiResponse = require("../helpers/apiResponse")
const sql = require('mssql')

exports.adminRegister = [
    body("HoTen").notEmpty().withMessage("Không được bỏ trống tên khách hàng").isLength({ min: 3 }).trim().withMessage("Số lượng kí tự phải lớn hơn 3."),
    body("DiaChi").notEmpty().withMessage("Không được bỏ trống địa chỉ").isLength({ min: 5 }).trim()
        .withMessage("Số lượng kí tự phải lớn hơn 5"),
    body("Sdt").isLength({ min: 10 }).notEmpty().withMessage("Không được bỏ trống tên điện thoại").withMessage("Số điện thoại không đúng định dạng"),
    body("Email").notEmpty().withMessage("Không được bỏ trống email").isLength({ min: 1 }).trim().withMessage("Số lượng kí tự phải lớn hơn 1")
        .isEmail().withMessage("Email không đúng định dạng."),
    body("TaiKhoan").notEmpty().withMessage("Không được bỏ trống tài khoản"),
    body("GioiTinh").notEmpty().withMessage("Không được bỏ trống giới tính"),
    body("TaiKhoan").notEmpty().withMessage("Không được bỏ trống tài khoản"),
    body("MatKhau").notEmpty().withMessage("Không được bỏ trống mật khẩu").isLength({ min: 6 }).trim().withMessage("Mật khẩu phải ít nhất 6 kí tự").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage("Password phải có ít nhất 1 chữ viết hoa, 1 chữ viết thường và 1 số bất kì, và không chứa kí tự đặc biệt"),
    body("XacNhanMatKhau").notEmpty().withMessage("Không được bỏ trống xác nhận mật khẩu").custom((value, { req }) => {
        if (value !== req.body.MatKhau) {
            throw new Error("Xác nhận mật khẩu không đúng");
        }
        return true;
    }),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let addedUser;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            } else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    addedUser = await pool.request()
                        .input('HoTen', sql.NVarChar(50), req.body.HoTen)
                        .input('TaiKhoan', sql.VarChar(50), req.body.TaiKhoan)
                        .input('MatKhau', sql.NVarChar(50), req.body.MatKhau)
                        .input('Email', sql.NVarChar(100), req.body.Email)
                        .input('DiaChi', sql.NVarChar(200), req.body.DiaChi)
                        .input('DienThoai', sql.VarChar(50), req.body.DienThoai)
                        .input('GioiTinh', sql.NVarChar(3), req.body.GioiTinh)
                        .input('NgaySinh', sql.DateTime, req.body.NgaySinh)
                        .execute('InsertKhachHang')
                    return addedUser;
                }
                waitPool().then(data => {
                    return apiResponse.successResponseWithData(res, "Thêm người dùng thành công", data.recordsets[0]);
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        };
    }
]

exports.adminLogin = [
    body("Email").isLength({ min: 4 }).trim().withMessage("Email phải được định nghĩa rõ.")
        .isEmail().withMessage("Email phải đúng định dạng.").normalizeEmail(),
    body("MatKhau").isLength({ min: 8 }).trim().withMessage("Mật khẩu phải có ít nhất 8 kí tự."),
    body("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            let addedUser;
            if (!errors.isEmpty()) {
                return apiResponse.unauthorizedResponse(res, "Sai tài khoản hoặc mật khẩu");
            } else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    addedUser = await pool.request()
                        .input('Email', sql.NVarChar(50), req.body.HoTen)
                        .input('MatKhau', sql.VarChar(50), req.body.TaiKhoan)
                        .execute('DangNhapKhachHang')
                    return addedUser;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Đăng nhập thành công", data.recordsets[0]);
                }).catch(err => apiResponse.ErrorResponse(res, err));
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

