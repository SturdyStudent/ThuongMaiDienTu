var express = require("express");
const PublisherController = require("../controllers/PublisherController");
const verifyJWTMiddleware = require("../middlewares/verifyJWT");

var router = express.Router();

router.get("/", PublisherController.publisherList);
router.post("/create", PublisherController.publisherCreate);
router.post("/delete/:id", PublisherController.publisherDelete);
router.post("/update/:id", PublisherController.publisherUpdate);

module.exports = router;