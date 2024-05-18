const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    ChiTietKM: {
        type: String,
        required: true
    },
    DonToiThieu: {
        type: Number,
        required: true
    },
    HinhAnhKM: {
        type: String,
        required: true
    },
    HinhAnhKhuyenMai: {
        type: String,
        required: true
    },
    Loai: {
        type: String,
        required: true
    },
    MaKM: {
        type: String,
        required: true,
        unique: true
    },
    NgayBatDau: {
        type: Date,
        required: true
    },
    NgayKetThuc: {
        type: Date,
        required: true
    },
    TenKM: {
        type: String,
        required: true
    },
    ThoiGianTao: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);
