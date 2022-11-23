var express = require("express");
const VoucherController = require('../controllers/VoucherController');

var router = express.Router();

router.get("/", VoucherController.voucherList);
router.get("/:id", VoucherController.voucherItemId);
router.post("/create", VoucherController.voucherCreate);
router.put("/update/:id", VoucherController.voucherUpdate);
router.delete("/delete/:id", VoucherController.voucherDelete);

module.exports = router;