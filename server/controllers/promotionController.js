const Promotion = require('../models/Promotion');

const promotionController = {
    addPromotion: async (req, res) => {
        try {
            const newPromotion = new Promotion(req.body);
            await newPromotion.save();
            res.status(200).json({ message: 'Created new promotion successfully!', data: newPromotion });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create new promotion!', error });
        }
    },

    updatePromotion: async (req, res) => {
        try {
            const updatedPromotion = await Promotion.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            if (!updatedPromotion) {
                return res.status(404).json({ message: 'Promotion not found!' });
            }

            res.status(200).json({ message: 'Updated promotion successfully!', data: updatedPromotion });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update promotion!', error });
        }
    },

    deletePromotion: async (req, res) => {
        try {
            const deletedPromotion = await Promotion.findByIdAndDelete(req.params.id);

            if (!deletedPromotion) {
                return res.status(404).json({ message: 'Promotion not found!' });
            }

            res.status(200).json({ message: 'Deleted promotion successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete promotion!', error });
        }
    },

    getAllPromotions: async (req, res) => {
        try {
            const promotions = await Promotion.find();
            res.status(200).json({ data: promotions });
        } catch (error) {
            res.status(500).json({ message: 'Failed to get promotions!', error });
        }
    },

    getPromotionById: async (req, res) => {
        try {
            const promotion = await Promotion.findById(req.params.id);

            if (!promotion) {
                return res.status(404).json({ message: 'Promotion not found!' });
            }

            res.status(200).json({ data: promotion });
        } catch (error) {
            res.status(500).json({ message: 'Failed to get promotion!', error });
        }
    },

    getPromotionCurrent: async (req, res) => {
        try {
            const currentDate = new Date();
            const promotions = await Promotion.find({
                startDate: { $lte: currentDate },
                endDate: { $gte: currentDate },
                remainingUses: { $gt: 0 },
            });

            if (!promotions.length) {
                return res.status(404).json({ message: 'No current promotions found!' });
            }

            res.status(200).json({ data: promotions });
        } catch (error) {
            res.status(500).json({ message: 'Failed to get current promotions!', error });
        }
    },

    checkPromotion: async (req, res) => {
        try {
            const { id } = req.params;
            const promotion = await Promotion.findOne({
                _id: id,
                startDate: { $lte: new Date() },
                endDate: { $gte: new Date() },
                remainingUses: { $gt: 0 },
            });

            if (!promotion) {
                return res.status(404).json({ message: 'Promotion not found or not valid!' });
            }

            res.status(200).json({ data: promotion });
        } catch (error) {
            res.status(500).json({ message: 'Failed to check promotion!', error });
        }
    },
};

module.exports = promotionController;
