const BookController = require('../controllers/BookController')
const express = require('express');
const sql = require('mssql')
const config = require("../dbConfig");
const router = express.Router();

router.get('/', BookController.bookList);
router.get('/:id', BookController.bookListById);
router.get('/orderedBooks/:orderId', BookController.bookListByOrderId);
router.get('/bestseller/:limit', BookController.bookListBySales);
router.get('/mostviewed/:limit', BookController.bookListByViews);
router.post('/search', BookController.findBookBySearchTerm);
router.post('/create', BookController.bookCreate);
router.put('/update/:id', BookController.bookUpdate);
router.delete('/delete/:id', BookController.bookDelete);

module.exports = router;