// models/UserType.js
const mongoose = require('mongoose');

const UserTypeSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true }
});

const UserType = mongoose.model('UserType', UserTypeSchema);

module.exports = UserType;
