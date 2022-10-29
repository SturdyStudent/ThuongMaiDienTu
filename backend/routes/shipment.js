var express = require("express");
const ShipmentController = require('../controllers/ShipmentController');

var router = express.Router();

router.get("/", ShipmentController.shipmentList);
router.get("/:id", ShipmentController.shipmentItemId);
router.post("/create", ShipmentController.shipmentCreate);
router.put("/update/:id", ShipmentController.shipmentUpdate);
router.delete("/delete/:id", ShipmentController.shipmentDelete);

module.exports = router;