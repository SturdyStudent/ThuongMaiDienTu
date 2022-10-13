const { body, validationResult } = require("express-validator")
const { sanitizeBody } = require("express-validator")
const utility = require("../helpers/utility");
const apiResponse = require("../helpers/apiResponse")
const AdminModel = require("../models/AdminModel")
const bcrypt = require("bcrypt")
const nodeoutlook = require("nodejs-nodemailer-outlook")
const jwt = require("jsonwebtoken")

exports.register = [
    body("adminName").notEmpty().withMessage("Không được bỏ trống tên admin").isLength({ min: 3 }).trim().withMessage("Số lượng kí tự phải lớn hơn 3."),
    body("address").notEmpty().withMessage("Không được bỏ trống tên địa chỉ").isLength({ min: 5 }).trim()
        .withMessage("Số lượng kí tự phải lớn hơn 5"),
    body("phoneNumber").isLength({ min: 10 }).notEmpty().withMessage("Không được bỏ trống tên điện thoại").withMessage("Số điện thoại không đúng định dạng"),
    body("email").notEmpty().withMessage("Không được bỏ trống email").isLength({ min: 1 }).trim().withMessage("Số lượng kí tự phải lớn hơn 1")
        .isEmail().withMessage("Email không đúng định dạng.").custom((value) => {
            return AdminModel.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject("E-mail đã được sử dụng");
                }
            });
        }),
    body("brandName").notEmpty().withMessage("Không được bỏ trống brand name"),
    body("password").notEmpty().withMessage("Không được bỏ trống mật khẩu").isLength({ min: 6 }).trim().withMessage("Mật khẩu phải ít nhất 6 kí tự").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage("Password phải có ít nhất 1 chữ viết hoa, 1 chữ viết thường và 1 số bất kì, và không chứa kí tự đặc biệt"),
    body("confirmPassword").notEmpty().withMessage("Không được bỏ trống xác nhận mật khẩu").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Xác nhận mật khẩu không đúng");
        }
        return true;
    }),
    sanitizeBody("adminName").escape(),
    sanitizeBody("email").escape(),
    sanitizeBody("password").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            } else {
                bcrypt.hash(req.body.password, 10, function (err, hash) { //hash password 10 round
                    let otp = utility.randomNumber(4);
                    var admin = new AdminModel(
                        {
                            adminName: req.body.adminName,
                            address: req.body.address,
                            phoneNumber: req.body.phoneNumber,
                            brandName: req.body.brandName,
                            email: req.body.email,
                            password: hash,
                            role: req.body.role,
                            confirmOtp: Number(otp),
                            isActive: true,
                            isConfirmed: false,
                        }
                    )
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
                        onSuccess: () => admin.save(function (err) {
                            if (err) { return apiResponse.ErrorResponse(res, err); }
                            let adminData = {
                                _id: admin._id,
                                fullName: admin.adminName,
                                email: admin.email
                            };
                            console.log("Đăng kí thành công");
                            return apiResponse.successResponseWithData(res, "Đăng kí thành công.", adminData);
                        })
                    });
                })
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]
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
                                        const jwtPayload = { _id: user._id };
                                        const jwtData = {
                                            expiresIn: process.env.JWT_TIMEOUT_DURATION,
                                        };
                                        const secret = process.env.JWT_SECRET;
                                        userData.token = jwt.sign(jwtPayload, secret, jwtData);
                                        res.setHeader('Set-Cookie', [
                                            `accessToken=${userData.token}; HttpOnly; Max-Age=${60000 * 15};`,
                                        ])
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
                            let otp = utility.randomNumber(4);
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