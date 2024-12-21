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
      "location_id": loc_id,  // Send loc_id as string
      "date": lastReportedDate,  // Send the string date as is to Flask
      "population_density": popDensity,  // Send as number
      "threshold_frequency_percent": thresholdPercent,  // Send as number
      "expected_event_waste_percent": eventWastePercent,  // Send as number
      "permanent_source_waste_percent": permanentSourcePercent,  // Send as number
      "waste_already_present_percent": currentPercentWaste  // Send as number
    };

    // Make a request to the ML model
    const mlResponse = await axios.post('http://127.0.0.1:5000/predict', mlInput);
    const { nextOverflowDate } = mlResponse.data;  // This will be a string date

    // Convert the string date to a JavaScript Date object before saving it to MongoDB
    const nextOverflowDateObj = new Date(nextOverflowDate);  // Convert string to Date object
    const lastReportedDateObj = new Date(lastReportedDate);  // Convert string to Date object

    // Store the result in the Output model
    const output = new Output({
      loc_id,
      
      loc_name,
      lastReportedDate: lastReportedDateObj,  // Save as Date object
      currentPercentWaste,
      nextOverflowDate: nextOverflowDateObj,  // Save as Date object
    });
    await output.save();

    res.status(201).json({ message: 'Data submitted successfully', output });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
