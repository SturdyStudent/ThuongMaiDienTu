var express = require("express");
// const multer = require('multer')
// const apiResponse = require('../helpers/apiResponse')

var fileName;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        const {
            body: { name }
        } = req;
        fileName = Date.now() + name;
        cb(null, fileName);
    }
})

// const upload = multer({ storage: storage })

var router = express.Router();
// router.get("/", (req, res) => {
//     res.send("Trang upload ảnh");
// })
// router.post("/", upload.single('file'), (req, res) => {
//     return apiResponse.successResponseWithData(res, "Upload ảnh thành công", fileName);
// });
module.exports = router;