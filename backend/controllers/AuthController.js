const { body, validationResult } = require("express-validator")
const { sanitizeBody } = require("express-validator")
const config = require("../dbConfig");
const apiResponse = require("../helpers/apiResponse")
const bcrypt = require("bcrypt")
const sql = require('mssql')

exports.register = [
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
                    addedUser = pool.request()
                        .input('HoTen', sql.NVarChar(50), req.body.HoTen)
                        .input('TaiKhoan', sql.VarChar(50), req.body.TaiKhoan)
                        .input('MatKhau', sql.NVarChar(50), req.body.MatKhau)
                        .input('Email', sql.NVarChar(100), req.body.Email)
                        .input('DiaChi', sql.NVarChar(200), req.body.DiaChi)
                        .input('DienThoai', sql.VarChar(50), req.body.DienThoai)
                        .input('GioiTinh', sql.NVarChar(3), req.body.GioiTinh)
                        .input('NgaySinh', sql.DateTime, req.body.NgaySinh)
                        .execute('InsertKhachHang')
                    return addedUser.recordsets;
                }
                waitPool().then(data => {
                    return apiResponse.successResponseWithData(res, "Thêm người dùng thành công", data);
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        };
    }
]
exports.test = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let tests = pool.request()
            .input('TenChuDe', sql.NVarChar(50), "Shounen")
            .query("INSERT INTO ChuDe(TenChuDe) VALUES (@TenChuDe)")
        res.send(tests.recordsets);
    } catch (err) {
        console.log(err);
    }
}
exports.login = [
    body("email").isLength({ min: 4 }).trim().withMessage("Email phải được định nghĩa rõ.")
        .isEmail().withMessage("Email phải đúng định dạng.").normalizeEmail(),
    body("password").isLength({ min: 8 }).trim().withMessage("Password phải có ít nhất 8 kí tự."),
    body("email").escape(),
    body("password").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.unauthorizedResponse(res, "Sai tài khoản hoặc mật khẩu");
            } else {
                AdminModel.findOne({ email: req.body.email }).then(user => {
                    if (user) {
                        bcrypt.compare(req.body.password, user.password, (err, same) => {
                            if (same) {
                                if (user.isConfirmed) {
                                    if (user.isActive) {
                                        let userData = {
                                            _id: user._id,
                                            userName: user.adminName,
                                            email: user.email,
                                        };
                                        return apiResponse.successResponseWithData(res, "Đăng nhập thành công.", userData);
                                    } else {
                                        return apiResponse.unauthorizedResponse(res, "Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên để biết thêm thông tin.");
                                    }
                                } else {
                                    return apiResponse.unauthorizedResponse(res, "Tài khoản chưa được xác thực. Vui lòng xác thực tài khoản");
                                }
                            } else {
                                return apiResponse.unauthorizedResponse(res, "Sai tài khoản hoặc mật khẩu");
                            }
                        })
                    } else {
                        return apiResponse.unauthorizedResponse(res, "Sai tài khoản hoặc mật khẩu.");
                    }
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.verifyConfirm = [
    body("email").isLength({ min: 5 }).trim().withMessage("Email phải chứa nhiều hơn 5 kí tự.")
        .isEmail().withMessage("Email phải đúng định dạng."),
    body("otp").isLength({ min: 4 }).trim().withMessage("OTP không hợp lệ.").custom((value) => {
        return AdminModel.findOne({ confirmOtp: value }).then((otp) => {
            if (otp) {
                return true;
            }
            return Promise.reject("Mã otp không trùng khớp");
        });
    }),
    sanitizeBody("email").escape(),
    sanitizeBody("otp").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            } else {
                var query = { email: req.body.email };
                AdminModel.findOne(query).then(user => {
                    if (user) {
                        if (!user.isConfirmed) {
                            if (user.confirmOtp == req.body.otp) {
                                AdminModel.findOneAndUpdate(query, {
                                    isConfirmed: true,
                                    confirmOtp: null
                                }).catch(err => {
                                    return apiResponse.ErrorResponse(res, err);
                                });
                                return apiResponse.successResponse(res, "Account confirmed success.");
                            } else {
                                console.log("Otp not match" + user.confirmOtp + " " + req.body.otp);

                                return apiResponse.unauthorizedResponse(res, "Otp does not match");
                            }
                        } else {
                            return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
                        }
                    } else {
                        console.log(`Không có user với email ${req.body.email} trong database`)
                        return apiResponse.unauthorizedResponse(res, "Specified email not found.");
                    }
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }];
exports.resendConfirmOtp = [
    body("email").isLength({ min: 5 }).trim().withMessage("Email không được để trống và có trên 5 kí tự.")
        .isEmail().withMessage("Email không hợp lệ."),
    sanitizeBody("email").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực.", errors.array());
            } else {
                var query = { email: req.body.email };
                AdminModel.findOne(query).then(user => {
                    if (user) {
                        if (!user.isConfirmed) {
                            let html = "<p>Hãy xác thực tài khoản của bạn.</p>OTP: <h3>" + otp + "</h3>";
                            nodeoutlook.sendEmail({
                                auth: {
                                    user: process.env.EMAIL_SMTP_USERNAME,
                                    pass: process.env.EMAIL_SMTP_PASSWORD
                                },
                                from: process.env.EMAIL_SMTP_USERNAME,
                                to: req.body.email,
                                subject: "Xác nhận tài khoản",
                                html: html,
                                onSuccess: () => {
                                    user.isConfirmed = false;
                                    user.confirmOtp = otp;
                                    user.save(function (err) {
                                        if (err) { return apiResponse.ErrorResponse(res, err); }
                                        return apiResponse.successResponse(res, "Đã gửi mã xác thực.");
                                    });
                                }
                            });
                        } else {
                            return apiResponse.unauthorizedResponse(res, "Tài khoản đã được xác nhận.");
                        }
                    } else {
                        return apiResponse.unauthorizedResponse(res, "Email không tìm thấy.");
                    }
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }];
exports.isAuth = [
    (req, res) => {
        res.send({ auth: true });
    }
]