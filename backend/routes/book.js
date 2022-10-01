const BookController = require('../controllers/BookController')
const express = require('express');

const router = express.Router();

router.get('/book', BookController.bookList);