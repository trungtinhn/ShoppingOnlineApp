const express = require('express');
const router = express.Router();
const parameterController = require('../controllers/parameterController');

router.get('/get' , parameterController.getParameter);

router.put('/update', parameterController.updateParameter);

module.exports = router;
