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
            res.status(500).json({ message: 'Failed to get products!', error });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id).populate('categoryId').populate('storeId');
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
            const products = await Product.find({ trending: true, status: 'available' });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get trending products!', error });
        }
    },

    getProductOnSale: async (req, res) => {
        try {
            const products = await Product.find({ onsale: true, status: 'available' });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get on-sale products!', error });
        }
    },

    getProductByCategory: async (req, res) => {
        try {
            const products = await Product.find({ categoryId: req.params.categoryId });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get products by category!', error });
        }
    },

    getProductByStatus: async (req, res) => {
        try {
            const products = await Product.find({ status: req.params.status });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get products by status!', error });
        }
    },

    setProductStatus: async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Failed to set product status!', error });
        }
    },

    checkAvailability: async (req, res) => {
        try {
            const products = req.body; // Array of products to check

            const productAvailability = await Promise.all(products.map(async (item) => {
                const product = await Product.findById(item.productId);

                if (!product) {
                    return { productId: item.productId, available: false, message: 'Product not found' };
                }

                const color = product.colors.find(c => c.name === item.color);
                if (!color) {
                    return { productId: item.productId, available: false, message: 'Color not found' };
                }

                const type = product.types.find(t => t.size === item.size && t.color === color.code);
                if (!type) {
                    return { productId: item.productId, available: false, message: 'Type not found' };
                }

                if (type.quantity >= item.quantity) {
                    return { productId: item.productId, available: true, quantityAvailable: type.quantity };
                } else {
                    return { productId: item.productId, available: false, quantityAvailable: type.quantity };
                }
            }));

            res.status(200).json(productAvailability);
        } catch (error) {
            res.status(500).json({ message: 'Failed to check product availability!', error });
        }
    },
};

module.exports = productController;
