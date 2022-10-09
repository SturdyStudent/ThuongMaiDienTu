// const BookController = require('../controllers/BookController')
const express = require('express');
const sql = require('mssql');
const config = require('./../dbConfig');
const router = express.Router();

// router.get('/book', BookController.bookList);

// router.get('/books', async (req,res,next) => {
//     try{
//         await sql.connect("Server=DESKTOP-7CMNV94\\SQLEXPRESS;Database=FGO;Trusted_Connection=True;")
//         var result = await sql.query('SELECT * FROM servantInfo', (err, result) =>{
//         res.json(result[0]);
//     });
//     } catch(err)
//     {
//         res.status(404).send(err);
//     }
// });

router.get('/books', (req,res) => {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from dummy', function (err, recordsets) {
            if (err) console.log(err)
            // send records as a response
            res.json(recordsets);
            sql.close();
        });
    });
});

module.exports = router;