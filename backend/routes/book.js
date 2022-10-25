const BookController = require('../controllers/BookController')
const express = require('express');

const router = express.Router();

router.get('/', BookController.bookList);
// router.post('/create', BookController.bookCreate);
// router.put('/update', BookController.bookUpdate);
// router.delete('/delete', BookController.bookDelete);

module.exports = router;

// //---------Get all book list------------------
// router.get('/', (req, res) => {
//     sql.connect(config, function (err) {
//         if (err) console.log(err);
//         var request = new sql.Request();
//         request.execute('SelectAllSach', function (err, result) {
//             if (err) console.log(err);
//             res.json(result.recordset);
//         });
//     });
// });


// //-------------Post a book-------------------------
// router.post('/post', (req, res) => {
//     sql.connect(config, function (err) {
//         if (err) console.log(err);
//         var request = new sql.Request();
//         request.input('TenSach', sql.NVarChar(50), req.body.TenSach);
//         request.input('GiaBan', sql.Int, req.body.GiaBan);
//         request.input('MoTa', sql.NVarChar(MAX), req.body.MoTa);
//         request.input('AnhBia', sql.Image, req.body.AnhBia);
//         request.input('NgayCapNhat', sql.Date, req.body.NgayCapNhat);
//         request.input('SoLuongTon', sql.Int, req.body.SoLuongTon);
//         request.input('MaNXB', sql.Int, req.body.MaNXB);
//         request.input('MaChuDe', sql.Int, req.body.MaChuDe);
//         request.execute('InsertSach');
//     })
// })


// //-------------Put a book------------------------


// //-------------Delete a book----------------------

// module.exports = router;
