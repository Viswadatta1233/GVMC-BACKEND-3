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
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const UserRequest = mongoose.model('UserRequest', requestSchema);

module.exports = UserRequest;
