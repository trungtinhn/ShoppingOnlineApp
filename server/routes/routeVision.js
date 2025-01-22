const express = require('express');
const router = express.Router();
const multer = require('multer');
const visionController = require('../controllers/visionController');

const upload = multer(); // Xử lý file ảnh

router.post('/analyze', upload.single('image'), visionController.analyzeImage);

module.exports = router;