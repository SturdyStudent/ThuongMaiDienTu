var express = require("express");
const AuthorController = require("../controllers/AuthorController");

var router = express.Router();

router.get("/", AuthorController.authorList);
router.post("/create", AuthorController.authorCreate);
router.put("/update/:id", AuthorController.authorUpdate);
router.delete("/delete/:id", AuthorController.authorDelete);

module.exports = router;