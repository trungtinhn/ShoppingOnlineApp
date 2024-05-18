const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/addProduct', productController.addProduct);
router.put('/updateProducts/id=:id', productController.updateProduct);
router.delete('/deleteProducts/id=:id', productController.deleteProduct);
router.get('/getProducts', productController.getAllProducts);
router.get('/getProduct/id=:id', productController.getProductById);

module.exports = router;
