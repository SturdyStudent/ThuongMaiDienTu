const BookController = require('../controllers/BookController')
const express = require('express');
const verifyJWTMiddleware = require("../middlewares/verifyJWT");

const router = express.Router();

router.get('/', verifyJWTMiddleware, BookController.bookList);
router.post('/create', BookController.bookCreate);

module.exports = router;