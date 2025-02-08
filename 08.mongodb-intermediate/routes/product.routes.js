const express = require('express');
const {insertSimpleProducts, getProductStats, getProductsAnalysis} = require('../controllers/productController');
const router = express.Router();



router.post('/insert',insertSimpleProducts);
router.get('/stats',getProductStats)
router.get('/analysis',getProductsAnalysis)

module.exports = router;