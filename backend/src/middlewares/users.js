const mongoose = require('mongoose');

const logRequest = (req, res, next) => {
  console.log(`${new Date().toISOString()} - Received ${req.method} request for ${req.originalUrl}`);
  next();
};

const validateUserId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invlid user ID format' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  next();
};

module.exports = {
  logRequest,
  validateUserId,
  validateEmail: validateEmail,
};
