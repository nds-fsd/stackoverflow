const mongoose = require('mongoose');

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
  validateUserId,
  validateEmail: validateEmail,
};
