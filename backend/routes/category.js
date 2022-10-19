var express = require("express");
const CategoryController = require("../controllers/CategoryController");

var router = express.Router();

router.get("/", CategoryController.categoryList);
router.post("/create", CategoryController.categoryCreate);
router.put("/update/:id", CategoryController.categoryUpdate);
router.delete("/delete/:id", CategoryController.categoryDelete);

module.exports = router;