const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/public', express.static('public'));

app.use('/api', apiRouter);
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
