var express = require("express");
var clientAuthRouter = require("./clientAuth")
var bookRouter = require("./book")
var publisherRouter = require("./publisher")
var categoryRouter = require("./category")
var adminRouter = require("./adminAuth")
var employeeRouter = require("./employee")
// var ratingRouter = require("./rating")
var authorRouter = require("./author")
var uploadRouter = require('./upload')
var userRouter = require("./user")
var paymentRouter = require("./payment")
var orderDetailRouter = require("./orderDetail")
var orderRouter = require('./order');
var orderDetailRouter = require('./orderDetail');
var shipmentRouter = require('./shipment');
var voucherRouter = require('./voucher');
var utilityRouter = require('./utility');

var app = express();

app.use("/adminAuth/", adminRouter);
app.use("/clientAuth/", clientAuthRouter);
app.use("/book/", bookRouter);
app.use('/order/', orderRouter);
app.use('/orderDetail/', orderDetailRouter);
app.use("/publisher/", publisherRouter);
app.use("/category/", categoryRouter);
app.use("/shipment/", shipmentRouter);
app.use("/voucher/",voucherRouter);
app.use("/employee", employeeRouter);
app.use("/voucher/", voucherRouter);
app.use("/employee/", employeeRouter);
// app.use("/rating/", ratingRouter);
app.use("/utility", utilityRouter);
app.use("/author/", authorRouter);
app.use("/upload/", uploadRouter);
app.use("/user/", userRouter);
app.use("/payment/", paymentRouter);

module.exports = app;