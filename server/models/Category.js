const mongoose = require("mongoose")

const useSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    numProduct: {
        type: Number
    }
}, {timestamps: true})

module.exports = mongoose.model("Category", useSchema)
