var express = require("express");
const PublisherController = require("../controllers/PublisherController");

var router = express.Router();

router.get("/", PublisherController.publisherList);
router.post("/create", PublisherController.publisherCreate);
router.delete("/delete/:id", PublisherController.publisherDelete);
router.put("/update/:id", PublisherController.publisherUpdate);

module.exports = router;