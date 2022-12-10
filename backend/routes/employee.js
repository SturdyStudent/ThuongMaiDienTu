var express = require("express");
const EmployeeController = require("../controllers/EmployeeController");

var router = express.Router();

router.get("/", EmployeeController.employeeList);
router.get("/:id", EmployeeController.employeeItemId);
// router.get("/:name", EmployeeController.employeeItemName);
router.post('/login', EmployeeController.employeeLogin);
router.post("/create", EmployeeController.employeeCreate);
router.put("/update/:id", EmployeeController.employeeUpdate);
router.delete("/delete/:id", EmployeeController.employeeDelete);

module.exports = router;