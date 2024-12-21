const Location = require('../models/Location');
const Output = require('../models/Output');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // For making requests to the ML model

// Middleware to protect supervisor routes
exports.protectSupervisor = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized access' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'supervisor') return res.status(403).json({ message: 'Access denied' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Supervisor input to the model
exports.submitLocationData = async (req, res) => {
  try {
    const { loc_name, lastReportedDate, currentPercentWaste } = req.body;

    // Fetch location details from Location model
    const location = await Location.findOne({ loc_name });
    if (!location) return res.status(404).json({ message: 'Location not found' });

    const {
      loc_id,
      popDensity,
      thresholdPercent,
      eventWastePercent,
      permanentSourcePercent,
    } = location;

    // Data to send to ML model
    const mlInput = {
      loc_id,
      popDensity,
      thresholdPercent,
      eventWastePercent,
      permanentSourcePercent,
      currentPercentWaste,
      lastReportedDate,
    };

    // Make a request to the ML model
    const mlResponse = await axios.post('http://127.0.0.1:5000/predict', mlInput);
    const { nextOverflowDate } = mlResponse.data;

    // Store the result in the Output model
    const output = new Output({
      loc_id,
      loc_name,
      lastReportedDate,
      currentPercentWaste,
      nextOverflowDate,
    });
    await output.save();

    res.status(201).json({ message: 'Data submitted successfully', output });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
