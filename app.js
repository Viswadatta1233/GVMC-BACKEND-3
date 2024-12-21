
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./config/db');
const supervisorRoutes = require('./routes/supervisorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRequestRoutes = require('./routes/userRequestRoutes');




const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/supervisor', supervisorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/userRequest', userRequestRoutes);


// Connect to Database
connectDB()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Database connection error:', err));

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
