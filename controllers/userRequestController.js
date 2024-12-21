const UserRequest = require('../models/UserRequest');

// Normal User - Create a Request
const createUserRequest = async (req, res) => {
  const { userLocation, requestStatement, requestDescription, createdBy } = req.body;

  if (!userLocation || !requestStatement || !requestDescription || !createdBy) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newRequest = await UserRequest.create({
      userLocation,
      requestStatement,
      requestDescription,
      createdBy,  // Storing username here
    });

    res.status(201).json({ message: 'Request created successfully.', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating request.', error });
  }
};

// Supervisor - Get Requests by Location
const getRequestsByLocation = async (req, res) => {
  const { userLocation } = req.body;

  if (!userLocation) {
    return res.status(400).json({ message: 'User location is required.' });
  }

  try {
    const requests = await UserRequest.find({ userLocation });
    res.status(200).json(
      requests.map((request) => ({
        requestId: request._id,
        userLocation: request.userLocation,
        requestStatement: request.requestStatement,
        requestDescription: request.requestDescription,
        status: request.status,
        createdBy: request.createdBy,  // Now directly accessing the username
      }))
    );
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests.', error });
  }
};

// Supervisor - Update Request Status
const updateRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;

  if (!requestId || !status) {
    return res.status(400).json({ message: 'Request ID and status are required.' });
  }

  try {
    const updatedRequest = await UserRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found.' });
    }
    res.status(200).json({ message: 'Request status updated.', request: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error updating request status.', error });
  }
};

// Admin - Get Accepted Requests
const getAcceptedRequestsForAdmin = async (req, res) => {
  try {
    const acceptedRequests = await UserRequest.find({ status: 'accepted' });
    res.status(200).json(
      acceptedRequests.map((request) => ({
        userLocation: request.userLocation,
        requestStatement: request.requestStatement,
        requestDescription: request.requestDescription,
        status: request.status,
        createdBy: request.createdBy,  // Now directly accessing the username
      }))
    );
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accepted requests.', error });
  }
};

module.exports = {
  createUserRequest,
  getRequestsByLocation,
  updateRequestStatus,
  getAcceptedRequestsForAdmin,
};
