const express = require('express');
const { protectSupervisor, submitLocationData } = require('../controllers/supervisorController');

const router = express.Router();

// Protected route for supervisor to submit location data
router.post('/submit', protectSupervisor, submitLocationData);

module.exports = router;
