const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Signup Controller
const signup = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    if (role !== 'user') {
      return res.status(400).json({ message: 'Only normal users can sign up.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User signed up successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error during signup', error: err.message });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password.' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};

module.exports = { signup, login };
