const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true,
        unique: true, // Đảm bảo ID là duy nhất
    },
    name: {
        type: String,
        required: true,
        trim: true, // Loại bỏ khoảng trắng đầu và cuối
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10,15}$/, // Định dạng số điện thoại hợp lệ
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Định dạng email hợp lệ
    },
    description: {
        type: String,
        default: '', // Mặc định là chuỗi rỗng nếu không có mô tả
        maxlength: 500, // Giới hạn độ dài
    },
    image: {
        type: String,
        default: 'default_image_url', // Có thể thay đổi bằng đường dẫn hình ảnh mặc định
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'suspended'], // Các trạng thái hợp lệ
        default: 'pending',
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu đến bảng User nếu có
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5, // Đánh giá từ 0-5
    },
    reviewCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    latidude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

module.exports = mongoose.model('Store', storeSchema);
