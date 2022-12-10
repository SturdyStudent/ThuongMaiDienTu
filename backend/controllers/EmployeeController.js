const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");


/* lấy danh sách nhân viên */
exports.employeeList = [
    function (req, res) {
        let employees;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                employees = await pool.request()
                    .execute('SelectAllNhanVien');
                return employees;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách nhân viên thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.employeeLogin = [
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
                         .input('Email', sql.NVarChar(50), req.body.Email)
                        .input('MatKhau', sql.VarChar(50), req.body.MatKhau)
                        .execute('DangNhapNhanVien')
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
/* lấy nhân viên theo Id */
exports.employeeItemId = [
    function (req, res) {
        let employee;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                employee = await pool.request()
                    .input('idNhanVien', sql.Int, req.params.id)
                    .execute('SelectIdNhanVien');
                return employee;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy id nhân viên thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

/* Lấy nhân viên theo tên */
exports.employeeItemName = [
    function (req, res) {
        let employee;
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                employee = await pool.request()
                    .input('TenNhanVien', sql.NVarChar(50), req.body.TenNhanVien)
                    .execute('SelectTenNhanVien');
                return employee;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy tên nhân viên thành công", result.recordsets[0]);
            }).catch(err => {return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

/* Tạo nhân viên mới */
exports.employeeCreate = [
    body("Email").notEmpty().withMessage("Không được bỏ trống trường email"),    
    body("HoTenNV").notEmpty().withMessage("Không được bỏ trống trường họ tên nhân viên"),
    body("Sdt").notEmpty().withMessage("Không được bỏ trống trường số điện thoại"),
    body("DiaChi").notEmpty().withMessage("Không được bỏ trống trường địa chỉ"),
    body("MatKhau").notEmpty().withMessage("Không được bỏ trống trường mật khẩu"),   
    body("XacNhanMatKhau").notEmpty().withMessage("Không được bỏ trống xác nhận mật khẩu").
    custom((value, { req }) => {
                    if (value !== req.body.MatKhau) {
                        throw new Error("Xác nhận mật khẩu không trùng khớp");
                    }
                    return true;
                }), 
    body("DiaChi").notEmpty().withMessage("Không được bỏ chọn vai trò"),
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
                    addedEmployee = await pool.request()
                        .input('HoTenNV', sql.NVarChar(50), req.body.HoTenNV)
                        .input('Email', sql.NVarChar(50), req.body.Email)
                        .input('Sdt', sql.NVarChar(50), req.body.Sdt)
                        .input('DiaChi', sql.NVarChar(50), req.body.DiaChi)
                        .input('MatKhau', sql.VarChar(50), req.body.MatKhau)
                        .input('VaiTro', sql.NVarChar(50), req.body.VaiTro)
                        .execute('InsertNhanVien');
                    return addedEmployee;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Thêm nhân viên thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }

    }
];
/* Xóa nhân viên */
exports.employeeDelete = [
    function (req, res) {
        try {
            let deletedNhanVien;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    deletedNhanVien = await pool.request()
                        .input('MaNV', sql.Int, req.params.id)
                        .execute('DeleteNhanVien');
                    return deletedNhanVien;
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
/* Cập nhật nhân viên */
exports.employeeUpdate = [
    body("HoTenNV").notEmpty().withMessage("Không được bỏ trống trường họ tên nhân viên"),
    body("NgaySinh").notEmpty().withMessage("Không được bỏ trống trường ngày sinh"),
    body("GioiTinh").notEmpty().withMessage("Không được bỏ trống trường giới tính"),
    body("Sdt").notEmpty().withMessage("Không được bỏ trống trường số điện thoại"),
    body("DiaChi").notEmpty().withMessage("Không được bỏ trống trường địa chỉ"),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let updatedEmployee;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    updatedEmployee = await pool.request()
                        .input('HoTenNV', sql.NVarChar(50), req.body.HoTenNV)
                        .input('NgaySinh', sql.Date, req.body.NgaySinh)
                        .input('GioiTinh', sql.NVarChar(3), req.body.GioiTinh)
                        .input('Sdt', sql.NVarChar(50), req.body.Sdt)
                        .input('DiaChi', sql.NVarChar(50), req.body.Diachi)
                        .execute('UpdateNhanVien');
                    return updatedEmployee;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Sửa nhân viên thành công", data.recordsets[0]);
                }).catch(err => { return apiResponse.ErrorResponse(res, err) });
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];