const express = require('express');
const { protectAdmin, getPredictions } = require('../controllers/adminController');

const router = express.Router();

// Protected route to get all predictions
router.get('/predictions', protectAdmin, getPredictions);

module.exports = router;
