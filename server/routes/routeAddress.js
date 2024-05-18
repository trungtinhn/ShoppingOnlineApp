const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.post('/addAddress', addressController.addAddress);
router.put('/updateAddress/id=:id', addressController.updateAddress);
router.delete('/deleteAddress/id=:id', addressController.deleteAddress);
router.get('/getAddresses', addressController.getAllAddresses);
router.get('/getAddress/id=:id', addressController.getAddressById);

module.exports = router;
