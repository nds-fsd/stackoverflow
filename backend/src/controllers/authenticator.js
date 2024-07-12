require('dotenv').config();
const User = require('../mongo/data/schemas/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { sendWelcomeEmail } = require('../service/email.service');
require('dotenv').config();

const register = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    console.log('entro en register');
    return res.status(400).json({ message: 'Email, password and username are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must have at least 6 characters' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'This email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.status(201).json({ token, user: { email: newUser.email, username: newUser.username } });

    await sendWelcomeEmail(email, username);

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email or password are incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email or password are incorrect' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in' });
  }
};

module.exports = {
  register,
  login,
};
