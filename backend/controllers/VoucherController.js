const Voucher = require("../models/RatingModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const { ObjectId } = require('mongodb')
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

exports.voucherList = [
    function (req, res) {

    }
];

exports.voucherCreate = [
    (req, res) => {
        const publisherId = ObjectId(req.body.publisherId);
        try {
            const errors = validationResult(req);
            var book = new Book(
                {
                    title: req.body.title,
                    price: req.body.price,
                    description: req.body.description,
                    coverImageUrl: req.body.coverImageUrl,
                    quantityLeft: req.body.quantityLeft,
                    publisherId: publisherId,
                    authorId: req.body.authorId,
                    categoryId: req.body.categoryId,
                    isbn: req.body.isbn,
                    soldQty: 0,
                    views: 0,
                    admin: req.body.admin
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            }
            else {
                //Save book.
                book.save(function (err) {
                    if (err) { return apiResponse.ErrorResponse(res, err); }
                    let bookData = new BookData(book);
                    return apiResponse.successResponseWithData(res, "Thêm sách thành công.", bookData);
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.voucherDelete = [];
exports.voucherUpdate = [];