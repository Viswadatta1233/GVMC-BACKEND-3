const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  loc_id: { type: String, required: true, unique: true },
  loc_name: { type: String, required: true },
  popDensity: { type: Number, required: true },
  thresholdPercent: { type: Number, required: true },
  eventWastePercent: { type: Number, required: true },
  permanentSourcePercent: { type: Number, required: true },
});

module.exports = mongoose.model('Location', locationSchema);
