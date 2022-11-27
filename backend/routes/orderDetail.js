var express = require("express");
const OrderDetailController = require("../controllers/OrderDetailController");

var router = express.Router();

router.get("/", OrderDetailController.orderDetailList);
router.post("/create", OrderDetailController.orderDetailCreate);
router.put("/update/:id", OrderDetailController.orderDetailUpdate);
router.delete("/delete/:id", OrderDetailController.orderDetailDelete);

module.exports = router;