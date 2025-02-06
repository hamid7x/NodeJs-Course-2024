const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const uploadImage = require('../controllers/imageController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

//uploade iamge router 
router.post('/upload',authMiddleware, adminMiddleware, uploadMiddleware.single('image'),uploadImage)

module.exports = router; 