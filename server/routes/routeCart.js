const cartController = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');
const router = require('express').Router()

// Cart routes
router.post('/getCart', verifyToken ,cartController.addProductToCart);
router.put('/updateCart', verifyToken ,cartController.updateProductInCart);
router.delete('/deleteCart', verifyToken ,cartController.removeProductFromCart);
router.get('/cart/userId=:userId', verifyToken ,cartController.getCart);