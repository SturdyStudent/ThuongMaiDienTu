const Author = require("../models/AuthorModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");

function AuthorData(data) {
    this.authorName = data.authorName;
    this.biography = data.biography;
    this.authorImage = data.authorImage;
}

exports.authorList = [
    function (req, res) {
        try {
            Author.find().then((authors) => {
                return apiResponse.successResponseWithData(res, "Operation success", authors);
            });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.authorCreate = [
    body("authorName").notEmpty().withMessage("Không được bỏ trống trường tên tác giả"),
    body("biography").notEmpty().withMessage("Không được bỏ trống trường tiểu sử"),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const correctImage = String(req.body.authorImage).replace(/&#x2F;/g, "/");
            const errors = validationResult(req);
            var author = new Author(
                {
                    authorName: req.body.authorName,
                    biography: req.body.biography,
                    authorImage: correctImage
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            }
            else {
                //Save book.
                author.save(function (err) {
                    if (err) { return apiResponse.ErrorResponse(res, err); }
                    return apiResponse.successResponseWithData(res, "Thêm tác giả thành công.", author);
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.authorDelete = [
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
        }
        try {
            Author.findById(req.params.id, function (err, foundauthor) {
                if (foundauthor === null) {
                    return apiResponse.notFoundResponse(res, "Tác giả không tồn tại");
                } else {
                    Author.findByIdAndRemove(req.params.id, function (err) {
                        if (err) {
                            return apiResponse.ErrorResponse(res, err);
                        } else {
                            return apiResponse.successResponse(res, "Xóa tác giả thành công.");
                        }
                    });
                }
            });
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.authorUpdate = [
    body("authorName").isLength({ min: 1 }).trim().withMessage("Tên tác giả không được bỏ trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const correctImage = String(req.body.authorImage).replace(/&#x2F;/g, "/");
            const errors = validationResult(req);
            var author = new Author(
                {
                    authorImage: correctImage,
                    authorName: req.body.authorName,
                    biography: req.body.biography,
                    _id: req.params.id
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                    return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
                } else {
                    Author.findById(req.params.id, function (err, foundauthor) {
                        if (foundauthor === null) {
                            return apiResponse.notFoundResponse(res, "Tác giả không tồn tại với id này");
                        } else {
                            Author.findByIdAndUpdate(req.params.id, author, {}, function (err) {
                                if (err) {
                                    return apiResponse.ErrorResponse(res, err);
                                } else {
                                    let authorData = new AuthorData(author);
                                    return apiResponse.successResponseWithData(res, "Cập nhật tác giả thành công.", authorData);
                                }
                            })
                        }
                    });
                }
            }
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];