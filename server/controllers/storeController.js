const Store = require('../models/Store');
const User = require('../models/User');
const storeController = {
    addStore: async (req, res) => {
        try {
            const { name, address, phoneNumber, email, description, image, status, ownerId, latitude, longitude } = req.body;
            const newStore = new Store({
                name,
                address,
                phoneNumber,
                email,
                description,
                image,
                status,
                ownerId,
                latitude,
                longitude
            });

            await newStore.save();
            await User.findByIdAndUpdate(ownerId, { storeId: newStore._id });
            res.status(201).json({ message: 'Store created successfully', store: newStore });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllStores: async (req, res) => {
        try {
            const stores = await Store.find();
            res.status(200).json(stores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getStoreById: async (req, res) => {
        try {
            const store = await Store.findById(req.params.id);
            if (!store) {
                return res.status(404).json({ error: 'Store not found' });
            }
            res.status(200).json(store);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateStore: async (req, res) => {
        try {
            const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedStore) {
                return res.status(404).json({ error: 'Store not found' });
            }
            res.status(200).json({ message: 'Store updated successfully', store: updatedStore });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteStore: async (req, res) => {
        try {
            const deletedStore = await Store.findByIdAndDelete(req.params.id);
            if (!deletedStore) {
                return res.status(404).json({ error: 'Store not found' });
            }
            res.status(200).json({ message: 'Store deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = storeController;
