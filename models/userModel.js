const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['admin', 'supervisor', 'user'], required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
