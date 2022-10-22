var express = require("express");
var authRouter = require("./auth");
var bookRouter = require("./book");

var app = express();

app.use("/auth/", authRouter);
app.get('/', (req, res) => {
    res.send("hi");
    console.log("hi");
})

module.exports = app;