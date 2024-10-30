const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    Address: {
        type: String,
        required: true
    },
    UserID: {
        type: String,
        required: true
    },
    Ward: {
        type: String,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    BuyerName: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
