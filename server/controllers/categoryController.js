const Category = require('../models/Category');

const categoryController = {
  // Thêm danh mục mới
  addCategory: async (req, res) => {
    try {
      const { description, name, image, numProduct, storeId, globalCategoryId } = req.body;

      const newCategory = new Category({
        description,
        name,
        image,
        numProduct,
        storeId,
        globalCategoryId,
      });

      const saveCategory = await newCategory.save();
      res.status(201).json(saveCategory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create new category!', error: error.message });
    }
  },

  // Cập nhật danh mục
  updateCategory: async (req, res) => {
    try {
      const { description, name, image, numProduct, storeId, globalCategoryId } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            description,
            name,
            image,
            numProduct,
            storeId,
            globalCategoryId
          }
        },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found!' });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update category!', error: error.message });
    }
  },

  // Xóa danh mục
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found!' });
      }

      res.status(200).json({ message: 'Delete category successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete category!', error: error.message });
    }
  },

  // Lấy tất cả danh mục
  getCategory: async (req, res) => {
    try {
      const categories = await Category.find().populate('storeId', 'name');  // Populate storeId để lấy tên cửa hàng nếu cần
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get categories!', error: error.message });
    }
  },

  // Lấy tất cả danh mục của một cửa hàng cụ thể
  getCategoriesByStore: async (req, res) => {
    try {
      const { storeId } = req.params;

      // Tìm tất cả danh mục của cửa hàng theo storeId
      const categories = await Category.find({ storeId });

      if (categories.length === 0) {
        return res.status(404).json({ message: 'No categories found for this store!' });
      }

      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get categories!', error: error.message });
    }
  },

  // Cập nhật số lượng sản phẩm trong danh mục
  updateProductAmountInCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { productAmount } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { $set: { numProduct: productAmount } },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found!' });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update product amount!', error: error.message });
    }
  },
};

module.exports = categoryController;
