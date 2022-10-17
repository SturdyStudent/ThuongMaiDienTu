const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const apiRouter = require('./routes/api')
// const logger = require('morgan')
const mongoose = require('mongoose')
require("dotenv/config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

if (process.env.NODE_ENV == "test") {
    // app.use(logger("dev"));
}

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }).then(() => console.log('connected'));

app.get('/', (req, res) => {
    res.send('welcome');
})
app.use("/api", apiRouter);
app.listen(3002);
