const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken')

router.post('/register', userController.registerEmailPassword);
router.get('/MaND=:MaND', verifyToken, userController.getUserTypeByMaND);

module.exports = router;