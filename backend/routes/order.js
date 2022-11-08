var express = require("express");
const OrderController = require("../controllers/OrderController");

var router = express.Router();

router.get("/", OrderController.orderList);
router.post("/create", OrderController.orderCreate);
router.put("/update/:id", OrderController.orderUpdate);
router.delete("/delete/:id", OrderController.orderDelete);

module.exports = router;