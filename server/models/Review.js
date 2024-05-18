const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    AnhDG: {
        type: String,
        required: true
    },
    MaDG: {
        type: String,
        required: true,
        unique: true
    },
    MaND: {
        type: String,
        required: true
    },
    MaSP: {
        type: String,
        required: true
    },
    NDDG: {
        type: String,
        required: true
    },
    NgayDG: {
        type: String,
        required: true
    },
    Ratting: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
