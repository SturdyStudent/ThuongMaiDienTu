const BookController = require('../controllers/BookController')
const express = require('express');
const sql = require('mssql')
const config = require("../dbConfig");
const router = express.Router();

router.get('/', BookController.bookList);
// router.get('/:id', BookController.bookListById);
router.get('/:id',async function(req,res){
    try {
        let book;
        let pool = await sql.connect(config);
        book = await pool.request()
                .input('idSach', sql.Int, req.params.id)
                .execute('SelectSachById');
        res.json(book.recordset[0]);
    } catch (err) {
        return console.log(err);
    }
});
router.get('/bestseller/:limit', BookController.bookListBySales);
router.get('/mostviewed/:limit', BookController.bookListByViews);
router.post('/create', BookController.bookCreate);
router.put('/update/:id', BookController.bookUpdate);
router.delete('/delete/:id', BookController.bookDelete);

module.exports = router;