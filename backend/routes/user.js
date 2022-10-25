var express = require("express");
const UserController = require("../controllers/UserController");

var router = express.Router();

router.get("/", UserController.userList);
router.post("/create", UserController.userCreate);
router.put("/update/:id", UserController.userUpdate);
router.delete("/delete/:id", UserController.userDelete);
module.exports = router;