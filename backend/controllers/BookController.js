const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const sql = require('mssql')
const config = require("../dbConfig");

exports.bookList = [
    (req, res) => {
        try {
            const waitPool = async () => {
                let pool = await sql.connect(config);
                categories = await pool.request()
                    .execute('SelectAllSach');
                return categories;
            }
            waitPool().then((result) => {
                return apiResponse.successResponseWithData(res, "Lấy danh sách chủ đề thành công", result.recordsets[0]);
            }).catch(err => { return apiResponse.ErrorResponse(res, err) });
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.bookCreate = [
    body("title").notEmpty().withMessage("Không được bỏ trống trường tựa đề"),
    body("price").notEmpty().withMessage("Không được bỏ trống trường giá sách"),
    body("description").notEmpty().withMessage("Không được bỏ trống trường miêu tả"),
    body("coverImageUrl").notEmpty().withMessage("Chưa chọn hình"),
    body("quantityLeft").notEmpty().withMessage("Chưa có số lượng hàng tồn"),
    body("authorId").notEmpty().withMessage("Chưa chọn tác giả"),
    body("categoryId").notEmpty().withMessage("Chưa chọn thể loại"),
    body("isbn").notEmpty().withMessage("Không được bỏ trống isbn"),
    sanitizeBody("*").escape(),
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
                    publisherId: req.body.publisherId,
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
exports.bookDelete = [];
exports.bookUpdate = [
    body("title").notEmpty().withMessage("Không được bỏ trống trường tựa đề"),
    body("price").notEmpty().withMessage("Không được bỏ trống trường giá sách"),
    body("description").notEmpty().withMessage("Không được bỏ trống trường miêu tả"),
    body("coverImageUrl").notEmpty().withMessage("Chưa chọn hình"),
    body("quantityLeft").notEmpty().withMessage("Chưa có số lượng hàng tồn"),
    body("authorId").notEmpty().withMessage("Chưa chọn tác giả"),
    body("categoryId").notEmpty().withMessage("Chưa chọn thể loại"),
    body("isbn").notEmpty().withMessage("Không được bỏ trống isbn"),
    sanitizeBody("*").escape(),
];