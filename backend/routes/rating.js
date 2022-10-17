var express = require("express");
const AuthorController = require("../controllers/AuthorController");
const verifyJWTMiddleware = require("../middlewares/verifyJWT");

var router = express.Router();

router.post("/", AuthorController.authorList);
router.post("/create", AuthorController.authorCreate);
router.post("/update", AuthorController.authorUpdate);
router.post("/delete", AuthorController.authorDelete);
module.exports = router;