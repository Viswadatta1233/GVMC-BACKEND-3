const mongoose = require('mongoose');

const outputSchema = new mongoose.Schema({
  loc_id: { type: String, required: true },
  loc_name: { type: String, required: true },
  lastReportedDate: { type: Date, required: true },
  currentPercentWaste: { type: Number, required: true },
  nextOverflowDate: { type: Date, required: true },
});

module.exports = mongoose.model('Output', outputSchema);
