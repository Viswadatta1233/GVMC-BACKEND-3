const axios = require('axios');
const Location = require('../models/Location'); // Assuming Location model is in models/Location
const Output = require('../models/Output'); // Assuming Output model is in models/Output

// Middleware to protect supervisor routes
exports.protectSupervisor = (req, res, next) => {
  try {
    const { role } = req.user; // Assuming `req.user` contains user details after authentication
    if (role !== 'supervisor') {
      return res.status(403).json({ message: 'Access denied: Supervisor role required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller function to handle location data submission
exports.submitLocationData = async (req, res) => {
  console.log("hi");
  try {
    const { loc_name, lastReportedDate, currentPercentWaste } = req.body;
    console.log(loc_name);

    // Fetch location details from Location model
    const location = await Location.findOne({ loc_name });
    console.log(location);
    if (!location) {
      console.log("hi");
      return res.status(404).json({ message: 'Location not found' });
    }

    const {
      loc_id, // This is the string like "LOC1", "LOC10"
      popDensity,
      thresholdPercent,
      eventWastePercent,
      permanentSourcePercent,
    } = location;

    // Extract numeric part of loc_id (e.g., "LOC1" becomes 1, "LOC10" becomes 10)
    const locIdNumber = parseInt(loc_id.replace(/\D/g, ''), 10);

    // Prepare data to send to ML model
    const mlInput = {
      "location_id": locIdNumber,
      "population_density": popDensity,
      "threshold_frequency_percent": thresholdPercent,
      "expected_event_waste_percent": eventWastePercent,
      "permanent_source_waste_percent": permanentSourcePercent,
      "waste_already_present_percent": currentPercentWaste
    };

    // Make a request to the ML model
    const mlResponse = await axios.post('http://127.0.0.1:3000/predict', mlInput);

    // Check if the response has the required data
    if (!mlResponse.data || !mlResponse.data.nextOverflowDate) {
      return res.status(400).json({ message: 'Invalid response from ML model' });
    }

    const { nextOverflowDate } = mlResponse.data;

    // Convert the string date to a JavaScript Date object before saving to MongoDB
    const nextOverflowDateObj = new Date(nextOverflowDate);
    const lastReportedDateObj = new Date(lastReportedDate);

    // Store the result in the Output model
    const output = new Output({
      loc_id,
      loc_name,
      lastReportedDate: lastReportedDateObj,
      currentPercentWaste,
      nextOverflowDate: nextOverflowDateObj,
    });

    await output.save();

    res.status(201).json({ message: 'Data submitted successfully', output });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
