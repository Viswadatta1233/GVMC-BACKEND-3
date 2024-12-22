const express = require('express');
// const {protect}=require('../middleware/authMiddleware')  // No protection middleware needed now
const { submitLocationData } = require('../controllers/supervisorController');

const router = express.Router();

// Route to submit location data
router.post('/submit', submitLocationData);

module.exports = router;
