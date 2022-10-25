const BookController = require('../controllers/BookController')
const express = require('express');

const router = express.Router();

router.get('/', BookController.bookList);
router.get('/:id', BookController.bookListById);
router.post('/create', BookController.bookCreate);
router.put('/update/:id', BookController.bookUpdate);
router.delete('/delete/:id', BookController.bookDelete);

module.exports = router;