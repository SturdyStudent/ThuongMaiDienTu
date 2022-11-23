var express = require("express");
const AdminAuthController = require("../controllers/AdminAuthController");

var router = express.Router();

router.post("/register", AdminAuthController.adminRegister);
router.post("/login", AdminAuthController.adminLogin);

module.exports = router;