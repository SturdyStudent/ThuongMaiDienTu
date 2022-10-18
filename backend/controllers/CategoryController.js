const Category = require("../models/categoryModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

function CategoryData(data) {
    this.categoryName = data.categoryName;
}

exports.categoryList = [
    function (req, res) {
        try {
            Category.find().then((categories) => {
                return apiResponse.successResponseWithData(res, "Operation success", categories);
            });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.categoryCreate = [
    (req, res) => {
        try {
            const errors = validationResult(req);
            var category = new Category(
                {
                    categoryName: req.body.categoryName,
                });
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            }
            else {
                category.save(function (err) {
                    if (err) { return apiResponse.ErrorResponse(res, err); }
                    let categoryData = new CategoryData(category);
                    return apiResponse.successResponseWithData(res, "Thêm thể loại thành công.", categoryData);
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.categoryDelete = [
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
        }
        try {
            Category.findById(req.params.id, function (err, foundcategory) {
                if (foundcategory === null) {
                    return apiResponse.notFoundResponse(res, "Thể loại không tồn tại");
                } else {
                    Category.findByIdAndRemove(req.params.id, function (err) {
                        if (err) {
                            return apiResponse.ErrorResponse(res, err);
                        } else {
                            return apiResponse.successResponse(res, "Xóa nhà xuất bản thành công.");
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
exports.categoryUpdate = [
    body("categoryName").isLength({ min: 1 }).trim().withMessage("Tên nhà xuất bản không được bỏ trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var category = new Category(
                {
                    categoryName: req.body.categoryName,
                    _id: req.params.id
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                    return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
                } else {
                    Category.findById(req.params.id, function (err, foundcategory) {
                        if (foundcategory === null) {
                            return apiResponse.notFoundResponse(res, "Thể loại không tồn tại với id này");
                        } else {
                            Category.findByIdAndUpdate(req.params.id, category, {}, function (err) {
                                if (err) {
                                    return apiResponse.ErrorResponse(res, err);
                                } else {
                                    let categoryData = new CategoryData(category);
                                    return apiResponse.successResponseWithData(res, "Cập nhật thể loại thành công.", categoryData);
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