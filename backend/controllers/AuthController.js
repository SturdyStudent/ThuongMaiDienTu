const { body, validationResult } = require("express-validator")
const { sanitizeBody } = require("express-validator")
const { constants } = require('../helpers/constants')
const mailer = require("../helpers/mailer")
const utility = require("../helpers/utility");
const apiResponse = require("../helpers/apiResponse")
const AdminModel = require("../models/AdminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = [
    body("adminName").isLength({ min: 3 }).trim().withMessage("Số lượng kí tự phải lớn hơn 3."),
    body("email").isLength({ min: 1 }).trim().withMessage("Số lượng kí tự phải lớn hơn 1")
        .isEmail().withMessage("Email không đúng định dạng.").custom((value) => {
            return AdminModel.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject("E-mail đã được sử dụng");
                }
            });
        }),
    body("password").isLength({ min: 6 }).trim().withMessage("Mật khẩu phải ít nhất 6 kí tự"),
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
                            confirmOtp: otp
                        }
                    )
                    let html = "<p>Hãy xác thực tài khoản của bạn.</p><p>OTP: " + otp + "</p>";
                    mailer.send(
                        process.env.EMAIL_SMTP_USERNAME,
                        req.body.email,
                        "Xác nhận tài khoản",
                        html
                    ).then(function () {
                        // Save user.
                        admin.save(function (err) {
                            if (err) { return apiResponse.ErrorResponse(res, err); }
                            let adminData = {
                                _id: admin._id,
                                fullName: user.fullName,
                                email: user.email
                            };
                            return apiResponse.successResponseWithData(res, "Đăng kí thành công.", adminData);
                        });
                    }).catch(err => {
                        console.log(err);
                        return apiResponse.ErrorResponse(res, err);
                    });
                })
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
]
exports.adminLogin = [
    body("email").isLength({ min: 4 }).trim().withMessage("Email phải được định nghĩa rõ.")
        .isEmail().withMessage("Email phải đúng định dạng.").normalizeEmail(),
    body("password").isLength({ min: 6 }).trim().withMessage("Password phải có ít nhất 6 kí tự."),
    body("email").isEmpty().escape(),
    body("password").isEmpty().escape(),
    (req, res) => {
        // try {
        //     const errors = validationResult(req);
        //     if (!errors.isEmpty()) {
        //         return apiResponse.validationErrorWithData(res, "Validation Error", errors.array());
        //     } else {
        //         AdminModel.findOne({ email: req.body.email }).then(user => {
        //             if (user) {
        //                 bcrypt.compare(req.body.password, user.password, (err, same) => {
        //                     if (same) {
        //                         if (user.isConfirmed) {
        //                             if (user.isActive) {

        //                             } else {

        //                             }
        //                         } else {

        //                         }
        //                     } else {

        //                     }
        //                 })
        //             }
        //         })
        //     }
        // } catch (err) {

        // }
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     res.json(errors.array());
        // }
    }
]