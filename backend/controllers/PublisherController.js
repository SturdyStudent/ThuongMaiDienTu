const Publisher = require("../models/PublisherModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

function PublisherData(data) {
    this.publisherName = data.publisherName;
}

exports.publisherList = [
    function (req, res) {
        try {
            Publisher.find().then((publishers) => {
                return apiResponse.successResponseWithData(res, "Operation success", publishers);
            });
        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.publisherCreate = [
    (req, res) => {
        try {
            const errors = validationResult(req);
            var publisher = new Publisher(
                {
                    publisherName: req.body.publisherName,
                });
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Lỗi xác thực", errors.array());
            }
            else {
                publisher.save(function (err) {
                    if (err) { return apiResponse.ErrorResponse(res, err); }
                    let publisherData = new PublisherData(publisher);
                    return apiResponse.successResponseWithData(res, "Thêm nhà xuất bản thành công.", publisherData);
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];
exports.publisherDelete = [
    function (req, res) {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
        }
        try {
            Publisher.findById(req.params.id, function (err, foundPublisher) {
                if (foundPublisher === null) {
                    return apiResponse.notFoundResponse(res, "Nhà xuất bản không tồn tại");
                } else {
                    Publisher.findByIdAndRemove(req.params.id, function (err) {
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
exports.publisherUpdate = [
    body("publisherName").isLength({ min: 1 }).trim().withMessage("Tên nhà xuất bản không được bỏ trống."),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var publisher = new Publisher(
                {
                    _id: req.params.id,
                    publisherName: req.body.publisherName,
                });

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }
            else {
                if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                    return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
                } else {

                    Publisher.findById(req.params.id, function (err, foundPublisher) {
                        if (foundPublisher === null) {
                            return apiResponse.notFoundResponse(res, "Nhà xuất bản không tồn tại với id này");
                        } else {
                            Publisher.findByIdAndUpdate(req.params.id, publisher, {}, function (err) {
                                if (err) {
                                    console.log("có lỗi");
                                    return apiResponse.ErrorResponse(res, err);
                                } else {
                                    let publisherData = new PublisherData(publisher);
                                    return apiResponse.successResponseWithData(res, "Cập nhật nhà xuất bản thành công.", publisherData);
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