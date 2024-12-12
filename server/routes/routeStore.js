const express = require('express');
const router = express.Router();

const routerController = require('../controllers/routeController');
const verifyToken = require('../middleware/verifyToken');

router.post('/addStore', verifyToken ,routerController.addStore);
router.get('/getStores', verifyToken ,routerController.getAllStores);
router.get('/getStoreById/id=:id', verifyToken ,routerController.getStoreById);
router.put('/updateStore/id=:id', verifyToken ,routerController.updateStore);
router.delete('/deleteStore/id=:id', verifyToken ,routerController.deleteStore);

module.exports = router;


