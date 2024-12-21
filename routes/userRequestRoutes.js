const express = require('express');
const router = express.Router();
const {
  createUserRequest,
  getRequestsByLocation,
  updateRequestStatus,
  getAcceptedRequestsForAdmin,
} = require('../controllers/userRequestController');
const { verifyToken } = require('../middleware/authMiddleware');

// User routes
router.post('/create', verifyToken, createUserRequest); // For normal users
router.post('/getRequests', verifyToken, getRequestsByLocation); // For supervisors
router.post('/updateStatus', verifyToken, updateRequestStatus); // For supervisors
router.post('/getAcceptedRequests', verifyToken, getAcceptedRequestsForAdmin); // For admin

module.exports = router;
