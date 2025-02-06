const express = require('express');
const { adminPage } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.get('/welcome',authMiddleware,adminMiddleware,adminPage);


module.exports = router;