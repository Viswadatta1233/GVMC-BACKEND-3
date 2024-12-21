// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bcrypt = require('bcrypt');
// const User = require('./models/userModel'); // Adjust the path to your User model

// // Load environment variables from the .env file
// dotenv.config();

// // MongoDB connection string from .env
// const mongoURI = process.env.MONGO_URI;

// // Users data (with plain-text passwords)
// const users = [
//   {
//     role: 'admin',
//     email: 'datta@example.com',
//     username: 'datta',
//     password: 'admin123',
//   },
//   {
//     role: 'supervisor',
//     email: 'manoj@example.com',
//     username: 'manoj',
//     password: 'supervisor123',
//   },
//   {
//     role: 'supervisor',
//     email: 'mohan@example.com',
//     username: 'mohan',
//     password: 'supervisor123',
//   },
//   {
//     role: 'supervisor',
//     email: 'sneha@example.com',
//     username: 'sneha',
//     password: 'supervisor123',
//   },
//   {
//     role: 'supervisor',
//     email: 'farhana@example.com',
//     username: 'farhana',
//     password: 'supervisor123',
//   },
//   {
//     role: 'supervisor',
//     email: 'rahul@example.com',
//     username: 'rahul',
//     password: 'supervisor123',
//   },
//   {
//     role: 'supervisor',
//     email: 'geeta@example.com',
//     username: 'geeta',
//     password: 'supervisor123',
//   },
//   {
//     role: 'supervisor',
//     email: 'priya@example.com',
//     username: 'priya',
//     password: 'supervisor123',
//   },
//   {
//     role: 'supervisor',
//     email: 'arun@example.com',
//     username: 'arun',
//     password: 'supervisor123',
//   },
//   {
//     role: 'supervisor',
//     email: 'divya@example.com',
//     username: 'divya',
//     password: 'supervisor123',
//   },
//   {
//     role: 'supervisor',
//     email: 'vishal@example.com',
//     username: 'vishal',
//     password: 'supervisor123',
//   },
// ];

// // Function to hash passwords
// const hashPassword = async (password) => {
//   const saltRounds = 10;
//   return await bcrypt.hash(password, saltRounds);
// };

// // Connect to the database and populate users
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     console.log('Database connected successfully.');

//     try {
//       // Hash passwords and create user objects
//       const hashedUsers = await Promise.all(users.map(async (user) => {
//         const hashedPassword = await hashPassword(user.password);
//         return { ...user, password: hashedPassword };
//       }));

//       // Insert users into the database
//       await User.insertMany(hashedUsers);
//       console.log('Users successfully added to the database!');
//     } catch (error) {
//       console.error('Error inserting users:', error);
//     } finally {
//       mongoose.connection.close(); // Close the connection after insertion or in case of an error
//     }
//   })
//   .catch((error) => {
//     console.error('Database connection error:', error);
//   });
// // 