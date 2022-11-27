var express = require("express");
const UtilityController = require('../controllers/UtilityController');
var router = express.Router();

router.post('/shipComplete', UtilityController.GiaoThanhCong);
router.post('/subVoucher', UtilityController.DescVoucher);

module.exports = router;