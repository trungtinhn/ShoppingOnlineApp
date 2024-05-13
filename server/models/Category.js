const mongoose = require("mongoose")

const useSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    numProduct: {
        type: Number
    }
}, {timestamps: true})

module.exports = mongoose.model("Category", useSchema)
