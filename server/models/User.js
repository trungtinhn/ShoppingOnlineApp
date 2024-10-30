const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    FullName: { type: String, required: true },
    Email: { type: String, unique: true },
    Phone: { type: String},
    DateOfBirth: { type: Date},
    UserID: { type: String, required: true, unique: true },
    UserType: { type: String, required: true },
    Avatar: { type: String },
    Address: { type: String },
    Gender: {type: String, default: ""}
});

module.exports = mongoose.model("User", UserSchema)