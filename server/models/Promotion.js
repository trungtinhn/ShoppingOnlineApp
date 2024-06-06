const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    ChiTietKM: {
        type: String,
        required: true
    },
    TiLe:{
        type: Number,
        default: 0,
    },
    DonToiThieu: {
        type: Number,
        required: false
    },
    HinhAnhKM: {
        type: String,
        required: false
    },
    SoLuotSuDung: {
        type: Number,
        required: false,
    },
    SoLuong: {
        type: Number,
        required: false,
    },
    HinhAnhKhuyenMai: {
        type: String,
        required: true
    },
    Loai: {
        type: String,
        required: true
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
        required: false
    },
    ThoiGianTao: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);
