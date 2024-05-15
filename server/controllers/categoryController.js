const { updateLocale } = require('moment');
const Category = require('../models/Category')

const categoryController = {
    addCategory: async (req, res) => {
        try {
            const newCategory = new Category(req.body)
            await newCategory.save();
            res.status(200).json('Created new category successfully!')
        } catch (error) {
            res.status(500).json('Failed to create new category!', error)
        }
    },
    updateCategory: async (req, res) => {
        try {
            const updateCategory = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updateCategory)
        } catch (error) {
            res.status(500).json('Failed to update category!', error)
        }
    },
    deleteCategory: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.status(200).json('Delete category successfully!')
        } catch (error) {
            res.status(500).json('Failed to delete category!', error)
        }
    },
    getCategory: async (req, res) => {
        try {
            const category = await Category.find()
            res.status(200).json(category)
        } catch (error) {
            res.status(500).json('Failed to get category!', error)
        }
    }
};

module.exports = categoryController