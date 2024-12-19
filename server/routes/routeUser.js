const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken')

router.post('/register', userController.registerEmailPassword);
router.get('/userId=:userId', verifyToken, userController.getUserTypeByUserId);
router.put('/userId=:userId', verifyToken, userController.updateUser);
router.delete('/userId=:userId', verifyToken, userController.deleteUser);
router.get('/getUser/userId=:userId', verifyToken, userController.getCurrentUserData);
router.get('/users', verifyToken, userController.getAllUsers);

module.exports = router;