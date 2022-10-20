var express = require("express");
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/images')
    },
    filename: (req, file, cb) => {
        const {
            body: { name }
        } = req;
        cb(null, Date.now() + name);
    }
})

const upload = multer({ storage: storage })

var router = express.Router();
router.get("/", (req, res) => {
    res.send("Trang upload ảnh");
})
router.post("/", upload.single('file'), (req, res) => {
    res.status(200).send({
        message: 'Upload thành công'
    })
});
module.exports = router;