const Output = require('../models/Output');
const jwt = require('jsonwebtoken');

// Middleware to protect admin routes
exports.protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized access' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Get all predictions for the admin dashboard
exports.getPredictions = async (req, res) => {
  try {
    const predictions = await Output.find({}, { 
      loc_name: 1, 
      lastReportedDate: 1, 
      currentPercentWaste: 1, 
      nextOverflowDate: 1 
    });

    if (!predictions.length) {
      return res.status(404).json({ message: 'No predictions found' });
    }

    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
