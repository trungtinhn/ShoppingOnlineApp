const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

router.post('/addPromotion', promotionController.addPromotion);
router.get('/getAllPromotions', promotionController.getAllPromotions);
router.get('/getPromotionById/id=:id', promotionController.getPromotionById);
router.put('/updatePromotion/id=:id', promotionController.updatePromotion);
router.delete('/deletePromotion/id=:id', promotionController.deletePromotion);

module.exports = router;
