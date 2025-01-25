const express = require('express');
const { getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook } = require('../controllers/bookControllers');
const router = express.Router();


router.get('/',getAllBooks);
router.get('/:id',getSingleBookById);
router.post('/',addNewBook);
router.put('/:id',updateBook);
router.delete('/:id',deleteBook);


module.exports = router;