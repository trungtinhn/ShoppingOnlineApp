const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    ReviewImages: {
        type: [String],
    },
    UserID: {
        type: String,
        required: true
    },
    ProductID: {
        type: String,
        required: true
    },
    ReviewContent: {
        type: String,
        required: true
    },
    ReviewDate: {
        type: Date,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    },
    StoreID: {
        type: String,
        default: "none",
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
