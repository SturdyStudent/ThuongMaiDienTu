var express = require("express");
const OrderController = require("../controllers/OrderController");

var router = express.Router();

router.get("/", OrderController.orderList);

router.get("/time", function(req,res) {
    let timestamp = 
    {
        daystamp: req.body.daystamp,
        monthstamp: req.body.monthstamp,
        yearstamp: req.body.yearstamp,
    }
    if(timestamp.daystamp == null || timestamp.monthstamp == null || timestamp.yearstamp == null)
    {
        res.send('timestamp is null');
    }
    else
    {
        var time = timestamp.yearstamp + "-" + timestamp.monthstamp + "-" + timestamp.daystamp
        res.send(time);
    }
});

router.post("/create", OrderController.orderCreate);
router.put("/update/:id", OrderController.orderUpdate);
router.delete("/delete/:id", OrderController.orderDelete);

module.exports = router;