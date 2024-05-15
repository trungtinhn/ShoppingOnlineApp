const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    GiaSP: {
        type: Number,
        required: true
    },
    HinhAnhSP: {
        type: [String],
        required: true
    },
    MaDM: {
        type: String,
        required: true
    },
    MaSP: {
        type: String,
        required: true,
        unique: true
    },
    MauSac: {
        type: [String],
        required: true
    },
    Size: {
        type: [String],
        required: true
    },
    SoLuongDaBan: {
        type: Number,
        required: true
    },
    SoLuongSP: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
