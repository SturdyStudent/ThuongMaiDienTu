const BookController = require('../controllers/BookController')
const express = require('express');

const router = express.Router();

router.get('/', BookController.bookList);
router.get('/:id', BookController.bookListById);
router.get('/bestseller/:limit', BookController.bookListBySales);
router.get('/mostviewed/:limit', BookController.bookListByViews);
router.post('/create', BookController.bookCreate);
router.put('/update/:id', BookController.bookUpdate);
router.delete('/delete/:id', BookController.bookDelete);

module.exports = router;