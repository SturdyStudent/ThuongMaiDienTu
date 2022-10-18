var express = require("express");
var authRouter = require("./auth");
var bookRouter = require("./book");
var publisherRouter = require("./publisher")
var categoryRouter = require("./category")
var ratingRouter = require("./rating")
var authorRouter = require("./author")


var app = express();

app.use("/auth/", authRouter);
// app.use("/book/", bookRouter);
// app.use("/publisher/", publisherRouter);
// app.use("/category", categoryRouter);
// app.use("/rating/", ratingRouter);
// app.use("/author/", authorRouter);

module.exports = app;