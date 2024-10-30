const mongoose = require('mongoose');

// Định nghĩa schema cho model YeuThich
const LikeSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true
  },
  ProductList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product' // Tham chiếu tới model SanPham
  }]
});

// Tạo model từ schema

const Like = mongoose.model('Like', LikeSchema);


module.exports = Like;
