const express = require('express');
const { homePage } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();



router.use('/welcome',authMiddleware,homePage);

module.exports = router;