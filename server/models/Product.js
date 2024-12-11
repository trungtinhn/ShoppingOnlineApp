const mongoose = require('mongoose');
const natural = require('natural');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();
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
        required: true
    }
});

const ProductSchema = new mongoose.Schema({
    OriginalPrice: {
        type: Number,
        required: true
    },
    DiscountPrice:{
        type: Number,
        default: 0
    },
    ProductImages: {
        type: [String], // Array of strings for image URLs or paths
        required: true
    },
    CategoryId: {
        type: String,
        required: true
    },
    Colors: {
        type: [ColorSchema],
        required: true
    },
    Size: {
        type: [String],
        required: true
    },
    Type: {
        type: [TypeSchema],
        required: true
    },
    ReviewCount: {
        type: Number,
        default: 0
    },
    Rating: {
        type: Number,
        default: 0
    },
    SoldQuantity: {
        type: Number,
        default: 0
    },
    StockQuantity: {
        type: Number,
        required: true
    },
    ViewCount: {
        type: Number,
        default: 0
    },
    WishlistCount: {
        type: Number,
        default: 0
    },
    ProductName: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ['available', 'outofstock', 'onwait'],
        required: true
    },
    Trending: {
        type: Boolean,
        default: false
    },
    Onsale: {
        type: Boolean,
        default: true
    },
    DiscountRate: {
        type: Number,
        default: 0
    },
    ProductDescription: {
        type: String,
        default: "Không có mô tả cho sản phẩm này",
        required: true
    },
    StoreID: {
        type: String,
        default: "none",
    }
}, { timestamps: true });

// Tạo các đặc trưng từ giá gốc, giá giảm và tên sản phẩm
ProductSchema.virtual('features').get(function() {
    const priceFeature = this.GiaGoc;
    const discountPriceFeature = this.GiaGiam;
    
    // Tạo mảng các giá trị TF-IDF
    const tfidfValues = [];
    tfidf.addDocument(this.TenSP);
    tfidf.tfidfs(this.TenSP, function(i, measure) {
        tfidfValues.push(measure);
    });

    // Chuyển đổi tfidfValues thành mảng 1 chiều
    const flattenedTfidfValues = [].concat(...tfidfValues);

    return [priceFeature, discountPriceFeature, ...flattenedTfidfValues];
  });



module.exports = mongoose.model('Product', ProductSchema);
