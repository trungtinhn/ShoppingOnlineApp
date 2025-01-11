const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    PromotionDetails: {
        type: String,
        required: true
    },
    Rate:{
        type: Number,
        default: 0,
    },
    MinimumOrder: {
        type: Number,
        required: false
    },
    PromotionImage: {
        type: String,
        required: false
    },
    Quantity:{
        type: Number,
        default: 0,
    },
    UsageLimit: {
        type: Number,
        required: false,
    },
    RemainingUses: {
        type: Number,
        required: false,
    },
    AnhNenKhuyenMai: {
        type: String,
        required: false,
    },
    Type: {
        type: String,
        required: true
    },
    StartDate: {
        type: Date,
        required: true
    },
    EndDate: {
        type: Date,
        required: true
    },
    PromotionName: {
        type: String,
        required: false
    },
    StoreID: {
        type: String,
        default: "none"
    },
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);