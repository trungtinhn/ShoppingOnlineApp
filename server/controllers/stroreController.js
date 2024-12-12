const Strore = require('../models/Store');

const stroreController = {
    addStore: async (req, res) => {
        try {
            const { StoreID, StoreName, StoreAddress, StorePhoneNumber, StoreEmail, StoreDescription, StoreImage } = req.body;
            const newStore = new Strore({
                StoreID,
                StoreName,
                StoreAddress,
                StorePhoneNumber,
                StoreEmail,
                StoreDescription,
                StoreImage
            });
            await newStore.save();
            res.status(201).json({ message: 'Store created successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllStores: async (req, res) => { 
        try {
            const stores = await Strore.find();
            res.status(200).json(stores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getStoreById: async (req, res) => {
        try {
            const store = await Strore.findById(req.params.id);
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
            const updatedStore = await Strore.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedStore) {
                return res.status(404).json({ error: 'Store not found' });
            }
            res.status(200).json(updatedStore);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteStore: async (req, res) => {
        try {
            const deletedStore = await Strore.findByIdAndDelete(req.params.id);
            if (!deletedStore) {
                return res.status(404).json({ error: 'Store not found' });
            }
            res.status(200).json({ message: 'Store deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = stroreController