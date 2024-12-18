const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/verifyToken');

router.post('/addProduct', verifyToken , productController.addProduct);
router.put('/updateProducts/id=:id', verifyToken ,productController.updateProduct);
router.delete('/deleteProducts/id=:id', verifyToken ,productController.deleteProduct);
router.get('/getProducts', verifyToken ,productController.getAllProducts);
router.get('/getProduct/id=:id', verifyToken ,productController.getProductById);
router.get('/getProductTrending', verifyToken ,productController.getProductTrending);
router.get('/getProductOnsale', verifyToken ,productController.getProductOnSale);
router.get('/getProductByCategory/categoryId=:categoryId', verifyToken ,productController.getProductByCategory);
router.get('/getProducts/status/:status', verifyToken, productController.getProductsByStatus);
router.put('/setProductStatus/status/:id',verifyToken, productController.setProductStatus);
router.put('/checkAvailable', verifyToken ,productController.checkAvailability);

router.get('/products/store/:storeId', verifyToken, productController.getProductsByStoreId);

router.get('/products/store/:storeId/status/:status', verifyToken, productController.getProductsByStatusAndStoreId);

module.exports = router;
