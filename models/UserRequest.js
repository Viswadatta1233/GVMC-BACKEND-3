const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  userLocation: { type: String, required: true },
  requestStatement: { type: String, required: true },
  requestDescription: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'denied'],
    default: 'pending',
  },
  createdBy: { type: String, required: true },  // Storing username as a string
});

const UserRequest = mongoose.model('UserRequest', requestSchema);

module.exports = UserRequest;
