const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require("dotenv/config");
const apiRouter = require('./routes/api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api', apiRouter);
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
