const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');

router.post('/addProduct', verifyToken , productController.addProduct);
router.put('/updateProducts/id=:id', verifyToken ,productController.updateProduct);
router.delete('/deleteProducts/id=:id', verifyToken ,productController.deleteProduct);
router.get('/getProducts', verifyToken ,productController.getAllProducts);
router.get('/getProduct/id=:id', verifyToken ,productController.getProductById);

module.exports = router;
