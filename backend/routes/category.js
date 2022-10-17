var express = require("express");
const CategoryController = require("../controllers/CategoryController");
const verifyJWTMiddleware = require("../middlewares/verifyJWT");

var router = express.Router();

router.post("/", CategoryController.categoryList);
router.post("/create", CategoryController.categoryCreate);
router.post("/update/:id", CategoryController.categoryUpdate);
router.post("/delete/:id", CategoryController.categoryDelete);
module.exports = router;