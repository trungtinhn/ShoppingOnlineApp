const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

module.exports = router;
