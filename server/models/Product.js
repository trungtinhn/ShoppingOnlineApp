const mongoose = require('mongoose');
const natural = require('natural');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// Schema cho Color
const ColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

// Schema cho Type (biến thể sản phẩm)
const TypeSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    }
});

// Schema chính cho Product
const ProductSchema = new mongoose.Schema({
    productName: { // Đặt tên field chuẩn và camelCase
        type: String,
        required: true,
        trim: true
    },
    originalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discountPrice: {
        type: Number,
        default: 0,
        min: 0
    },
    discountRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    productImages: {
        type: [String], // URL hoặc đường dẫn ảnh
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, // ID danh mục tham chiếu
        ref: 'Category',
        required: true
    },
    globalCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GlobalCategory',
        required: true
    },
    colors: {
        type: [ColorSchema], // Danh sách màu sắc
        required: true
    },
    sizes: {
        type: [String], // Danh sách các size (M, L, XL,...)
        required: true
    },
    types: {
        type: [TypeSchema], // Biến thể (size + color + quantity)
        required: true
    },
    reviewCount: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    soldQuantity: {
        type: Number,
        default: 0,
        min: 0
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    viewCount: {
        type: Number,
        default: 0,
        min: 0
    },
    wishlistCount: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        enum: ['available', 'outofstock', 'onwait'], // Trạng thái sản phẩm
        required: true,
        default: 'available'
    },
    trending: {
        type: Boolean,
        default: false
    },
    onsale: {
        type: Boolean,
        default: true
    },
    productDescription: {
        type: String,
        default: "Không có mô tả cho sản phẩm này",
        trim: true
    },
    storeId: { // Tham chiếu đến cửa hàng
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }
}, { timestamps: true });

// Tạo các đặc trưng từ giá gốc, giá giảm và tên sản phẩm
ProductSchema.virtual('features').get(function() {
    const priceFeature = this.originalPrice;
    const discountPriceFeature = this.discountPrice;
    
    // Tạo mảng các giá trị TF-IDF
    const tfidfValues = [];
    tfidf.addDocument(this.productName);
    tfidf.tfidfs(this.productName, function(i, measure) {
        tfidfValues.push(measure);
    });

    // Chuyển đổi tfidfValues thành mảng 1 chiều
    const flattenedTfidfValues = [].concat(...tfidfValues);

    return [priceFeature, discountPriceFeature, ...flattenedTfidfValues];
  });



module.exports = mongoose.model('Product', ProductSchema);
