require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); // Import Morgan
const authRoutes = require('./routes/authRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRequestRoutes = require('./routes/userRequestRoutes');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(morgan('dev'));   // Log HTTP requests in 'dev' format

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/supervisor', supervisorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/userRequest', userRequestRoutes);

// Connect to Database and Start Server
const startServer = async () => {
  try {
    await connectDB();  // Await the database connection
    console.log('Database connected successfully.');

    // Start the Server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);  // Exit the process if DB connection fails
  }
};

// Start the server
startServer();

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});
