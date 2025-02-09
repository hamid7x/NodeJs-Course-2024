const express = require('express');
const { createAuthor, createBook, getBookWithAuthor } = require('../controllers/bookController');
const router = express.Router();



router.post('/author',createAuthor);
router.post('/book',createBook)
router.get('/:id',getBookWithAuthor)

module.exports = router;