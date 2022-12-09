const { body, validationResult } = require("express-validator")
const { sanitizeBody } = require("express-validator")
const config = require("../dbConfig");
const apiResponse = require("../helpers/apiResponse")
const sql = require('mssql')
const utility = require("../helpers/utility");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const nodeoutlook = require("nodejs-nodemailer-outlook")
const jwt = require("jsonwebtoken")

exports.register = [
    body("HoTen").notEmpty().withMessage("Không được bỏ trống tên khách hàng").isLength({ min: 3 }).trim().withMessage("Số lượng kí tự phải lớn hơn 3."),
    body("TaiKhoan").notEmpty().withMessage("Không được bỏ trống tài khoản"),
    body("MatKhau").notEmpty().withMessage("Không được bỏ trống mật khẩu").isLength({ min: 8 }).trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage("Password phải có ít nhất 8 kí tự, 1 chữ viết hoa, 1 chữ viết thường và 1 số bất kì, và không chứa kí tự đặc biệt"),
    body("XacNhanMatKhau").notEmpty().withMessage("Không được bỏ trống xác nhận mật khẩu").custom((value, { req }) => {
        if (value !== req.body.MatKhau) {
            throw new Error("Xác nhận mật khẩu không đúng");
        }
        return true;
    }),
    body("Email").notEmpty().withMessage("Không được bỏ trống email").isLength({ min: 1 }).trim().withMessage("Số lượng kí tự phải lớn hơn 1")
        .isEmail().withMessage("Email không đúng định dạng."),
    body("DiaChi").notEmpty().withMessage("Không được bỏ trống địa chỉ").isLength({ min: 5 }).trim()
        .withMessage("Số lượng kí tự ô địa chỉ phải lớn hơn 5"),
    body("DienThoai").isLength({ min: 10 }).withMessage("Vui lòng nhập đúng định dạng số điện thoại").notEmpty().withMessage("Không được bỏ trống tên điện thoại"),
    body("GioiTinh").notEmpty().withMessage("Không được bỏ trống giới tính"),
    body("NgaySinh").notEmpty().withMessage("Không được bỏ trống tài khoản"),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let addedUser;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            } else {
                bcrypt.hash(req.body.MatKhau, 10, function (err, hash) {
                    let otp = utility.randomNumber(4);
                    let html = "<p>Hãy xác thực tài khoản của bạn.</p>OTP: <h3>" + otp + "</h3>";

                    const waitPool = async () => {
                        let pool = await sql.connect(config);
                        addedUser = await pool.request()
                            .input('HoTen', sql.NVarChar(50), req.body.HoTen)
                            .input('TaiKhoan', sql.NVarChar(50), req.body.TaiKhoan)
                            .input('MatKhau', sql.NVarChar(sql.MAX), hash)
                            .input('Email', sql.NVarChar(100), req.body.Email)
                            .input('DiaChi', sql.NVarChar(200), req.body.DiaChi)
                            .input('DienThoai', sql.VarChar(50), req.body.DienThoai)
                            .input('GioiTinh', sql.NVarChar(3), req.body.GioiTinh)
                            .input('NgaySinh', sql.Date, req.body.NgaySinh)
                            .input('MaOtp', otp)
                            .execute('InsertKhachHang')
                        return addedUser;
                    }
                    waitPool().then(async (data) => {
                        let clientData = {
                            id: data.MaKH,
                            fullName: data.HoTen,
                            email: data.Email
                        };
                        await nodeoutlook.sendEmail({
                            auth: {
                                user: process.env.EMAIL_SMTP_USERNAME,
                                pass: process.env.EMAIL_SMTP_PASSWORD
                            },
                            from: process.env.EMAIL_SMTP_USERNAME,
                            to: req.body.Email,
                            subject: "Xác nhận tài khoản",
                            html: html,
                            onSuccess: () => {
                                return apiResponse.successResponseWithData(res, "Thêm người dùng thành công", clientData);
                            },
                            onerror: (err) => {
                                try {
                                    if (err.message) {
                                        return apiResponse.unauthorizedResponse(res, err.message);
                                    } else {
                                        return apiResponse.validationErrorWithData(res, err);
                                    }
                                } catch (err) {
                                    return apiResponse.ErrorResponse(res);
                                }
                            }
                        });

                    }).catch(err => {
                        try {
                            if (err.message) {
                                return apiResponse.unauthorizedResponse(res, err.message);
                            } else {
                                return apiResponse.validationErrorWithData(res, err);
                            }
                        } catch (err) {
                            return apiResponse.ErrorResponse(res);
                        }
                    });
                })
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        };
    }
]

exports.login = [
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
                        .execute('DangNhapKhachHang')
                    return addedUser;
                }
                waitPool().then((data) => {
                    if (JSON.stringify(data.recordsets[0]) !== JSON.stringify([])) {
                        let user = data.recordsets[0][0];
                        bcrypt.compare(req.body.MatKhau, user.MatKhau, (err, same) => {
                            if (same) {
                                let userData = {
                                    TaiKhoan: user.TaiKhoan,
                                    Email: user.Email
                                }
                                const jwtPayload = { id: user.MaKH };
                                const jwtData = {
                                    expiresIn: process.env.JWT_TIMEOUT_DURATION,
                                };
                                const secret = process.env.JWT_SECRET;
                                userData.token = jwt.sign(jwtPayload, secret, jwtData);
                                res.setHeader('Set-Cookie', [
                                    `accessToken=${userData.token}; HttpOnly; Max-Age=${60000 * 15};`,
                                ])
                                return apiResponse.successResponseWithData(res, "Đăng nhập thành công.", userData);
                            }
                            return apiResponse.ErrorResponse(res, "Mật khẩu không trùng khớp")
                        })
                    } else {
                        return apiResponse.ErrorResponse(res, "Sai tài khoản hoặc mật khẩu")
                    }
                }).catch(err => apiResponse.ErrorResponse(res, err));
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.verifyConfirm = [
    body("email").isLength({ min: 5 }).trim().withMessage("Email phải chứa nhiều hơn 5 kí tự.")
        .isEmail().withMessage("Email phải đúng định dạng."),
    body("otp").isLength({ min: 4, max: 4 }).trim().withMessage("OTP không hợp lệ."),
    sanitizeBody("email").escape(),
    sanitizeBody("otp").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            let validatedUser
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            } else {
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    validatedUser = await pool.request()
                        .input('email', sql.NVarChar(50), req.body.email)
                        .input('otp', sql.Int, req.body.otp)
                        .execute('XacNhanOTP')
                    return validatedUser;
                }
                waitPool().then((data) => {
                    return apiResponse.successResponseWithData(res, "Đăng kí thành công", data.recordsets[0]);
                }).catch(err => apiResponse.ErrorResponse(res, err));
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
                let otp = utility.randomNumber(4);
                const waitPool = async () => {
                    let pool = await sql.connect(config);
                    validatedUser = await pool.request()
                        .input('email', sql.NVarChar(50), req.body.email)
                        .input('otp', sql.Int, otp)
                        .execute('GuiLaiMaOTP')
                    return validatedUser;
                }

                waitPool().then(() => {
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
                            return apiResponse.successResponse(res, "Đã gửi mã xác thực.");
                        }
                    });
                }).catch(err => { return apiResponse.ErrorResponse(res, err) })
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }];
exports.isAuth = [
    (req, res) => {
        res.send({ auth: true, id: req.userId });
    }
]

exports.forgotPassword = [
    body("email").isLength({ min: 5 }).trim().withMessage("Email không được để trống và có trên 5 kí tự.")
                    .isEmail().withMessage("Email không hợp lệ."),
    sanitizeBody("email").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực.", errors.array());
            } else {
                const generatePassword = utility.randomPassword(10);
                bcrypt.hash(generatePassword, 10, function (err, hash) {
                    if(err){
                        return apiResponse.ErrorResponse(res, err);
                    }

                    const waitPool = async () => {
                        let pool = await sql.connect(config);
                        validatedUser = await pool.request()
                            .input('email', sql.NVarChar(50), req.body.email)
                            .input('matkhau', sql.VarChar(sql.MAX), hash)
                            .execute('QuenMatKhau')
                        return validatedUser;
                    }
    
                    waitPool().then(() => {
                        let html = "<p>Qúi khách vui lòng đổi mật khẩu ngay sau khi đăng nhập.</p>Mật khẩu: <h3>" + generatePassword + "</h3>";
                        nodeoutlook.sendEmail({
                            auth: {
                                user: process.env.EMAIL_SMTP_USERNAME,
                                pass: process.env.EMAIL_SMTP_PASSWORD
                            },
                            from: process.env.EMAIL_SMTP_USERNAME,
                            to: req.body.email,
                            subject: "Cấp lại mật khẩu khách hàng PowellBookStore",
                            html: html,
                            onSuccess: () => {
                                return apiResponse.successResponse(res, "Đã gửi lại mật khẩu.");
                            }
                        });
                    }).catch(err => { return apiResponse.ErrorResponse(res, err) })   
                })
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.changePassword = [
    body("email").isLength({ min: 5 }).trim().withMessage("Email không được để trống và có trên 5 kí tự.")
                    .isEmail().withMessage("Email không hợp lệ."),
    body("MatKhauCu").notEmpty().withMessage("Không được bỏ trống mật khẩu").isLength({ min: 8 }).trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                    .withMessage("Password phải có ít nhất 8 kí tự, 1 chữ viết hoa, 1 chữ viết thường và 1 số bất kì, và không chứa kí tự đặc biệt"),
    body("MatKhauMoi").notEmpty().withMessage("Không được bỏ trống xác nhận mật khẩu").isLength({ min: 8 }).trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .withMessage("Password phải có ít nhất 8 kí tự, 1 chữ viết hoa, 1 chữ viết thường và 1 số bất kì, và không chứa kí tự đặc biệt").
    custom((value, { req }) => {
                    if (value === req.body.MatKhauCu) {
                        throw new Error("Mật khẩu mới không được trùng với mật khẩu cũ");
                    }
                    return true;
                }),
    body("XacNhanMatKhauMoi").notEmpty().withMessage("Không được bỏ trống xác nhận mật khẩu").
    custom((value, { req }) => {
                    if (value !== req.body.MatKhauMoi) {
                        throw new Error("Xác nhận mật khẩu không trùng khớp");
                    }
                    return true;
                }),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            let validatedUser;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực.", errors.array());
            } else {
                const waitPoolTestLogin = async () => {
                    let pool = await sql.connect(config);
                    addedUser = await pool.request()
                        .input('email', sql.NVarChar(50), req.body.email)
                        .execute('DangNhapKhachHang')
                    return addedUser;
                }
                waitPoolTestLogin().then((data) => {
                    if (JSON.stringify(data.recordsets[0]) !== JSON.stringify([])) {
                        let user = data.recordsets[0][0];
                        bcrypt.compare(req.body.MatKhauCu, user.MatKhau, (err, same) => {
                            if (same) {
                                bcrypt.hash(req.body.MatKhauMoi, 10, function (err, hash) {
                                    if(err){
                                        return apiResponse.ErrorResponse(res, err);
                                    }
                                    
                                    const waitPool = async () => {
                                        let pool = await sql.connect(config);
                                        validatedUser = await pool.request()
                                            .input('email', sql.NVarChar(50), req.body.email)
                                            .input('matkhaumoi', sql.VarChar(sql.MAX), hash)
                                            .execute('DoiMatKhau')
                                        return validatedUser;
                                    }
                
                                    waitPool().then(() => {
                                        return apiResponse.successResponseWithData(res, "Đổi mật khẩu thành công.", validatedUser);
                                    }).catch(err => { return apiResponse.ErrorResponse(res, err) })   
                                })
                            }
                        })
                    }
                })
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]