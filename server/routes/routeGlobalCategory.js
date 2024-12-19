const express = require('express');
const router = express.Router();
const globalCategoryController = require('../controllers/globalCategoryController');

// Lấy tất cả danh mục
router.get('/', globalCategoryController.getAllCategories);

// Lấy một danh mục theo ID
router.get('/:id', globalCategoryController.getCategoryById);

// Tạo một danh mục mới
router.post('/', globalCategoryController.createCategory);

// Cập nhật danh mục theo ID
router.put('/:id', globalCategoryController.updateCategory);

// Xóa danh mục theo ID
router.delete('/:id', globalCategoryController.deleteCategory);

module.exports = router;
