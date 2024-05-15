const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    GiaSP: {
        type: Number,
        required: true
    },
    HinhAnhSP: {
        type: [String], // Array of strings for image URLs or paths
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
        default: 0
    },
    SoLuongSP: {
        type: Number,
        required: true
    },
    SoLuotXem: {
        type: Number,
        default: 0
    },
    SoLuotYeuThich: {
        type: Number,
        default: 0
    },
    TenSP: {
        type: String,
        required: true
    },
    TrangThai: {
        type: String,
        required: true
    },
    Trending: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
