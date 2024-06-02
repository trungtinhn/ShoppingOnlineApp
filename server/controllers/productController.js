const Product = require('../models/Product');

const productController = {
    addProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(200).json('Created new product successfully!');
        } catch (error) {
            res.status(500).json({ message: 'Failed to create new product!', error });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update product!', error });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted product successfully!');
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete product!', error });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status500.json({ message: 'Failed to get products!', error });
        }
    },
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json('Product not found!');
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get product!', error });
        }
    },
    getProductTrending: async (req, res) => {
        try {
            const products = await Product.find({ Trending: true, TrangThai: "available" });
            if (!products) {
                return res.status(404).json('Product not found!');
            }
            res.status(200).json(products);
        } catch (error) {
            res.status500.json({ message: 'Failed to get products!', error });
        }
    },
    getProductOnsale: async (req, res) => {
        try {
            const products = await Product.find({ Onsale: true, TrangThai: "available" });
            if (!products) {
                return res.status(404).json('Product not found!');
            }
            res.status(200).json(products);
        } catch (error) {
            res.status500.json({ message: 'Failed to get products!', error });
        }
    },
    getProductByCategory: async (req, res) => {
        try {
            const products = await Product.find({ MaDM: req.params.MaDM });
            if (!products) {
                return res.status(404).json('Product not found!');
            }
            res.status(200).json(products);
        } catch (error) {
            res.status500.json({ message: 'Failed to get products!', error });
        }
    },
    getProductOnwait : async (req, res) => {
        try {
            const products = await Product.find({ TrangThai: "onwait" });
            if (!products) {
                return res.status(404).json('Product not found!');
            }
            res.status(200).json(products);
        } catch (error) {
            res.status500.json({ message: 'Failed to get products!', error });
        }
    },
    getProductOutofstock: async (req, res) => {
        try {
            const products = await Product.find({ TrangThai: "outofstock" });
            if (!products) {
                return res.status(404).json('Product not found!');
            }
            res.status(200).json(products);
        } catch (error) {
            res.status500.json({ message: 'Failed to get products!', error });
        }
    },
    getProductAvailable: async (req, res) => {
        try {
            const products = await Product.find({ TrangThai: "available" });
            if (!products) {
                return res.status(404).json('Product not found!');
            }
            res.status(200).json(products);
        } catch (error) {
            res.status500.json({ message: 'Failed to get products!', error });
        }
    }
};

module.exports = productController;
