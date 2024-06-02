const mongoose = require('mongoose');

// Định nghĩa schema cho model YeuThich
const LikeSchema = new mongoose.Schema({
  MaND: {
    type: String,
    required: true
  },
  danhSachSanPham: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SanPham' // Tham chiếu tới model SanPham
  }]
});

// Tạo model từ schema
const YeuThich = mongoose.model('YeuThich', LikeSchema);

module.exports = YeuThich;
