const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
require("dotenv/config");
const bok = require('./routes/book');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(cookieParser());

app.use('/book', bok);
app.listen(process.env.PORT);
