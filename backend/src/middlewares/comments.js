const Comment = require('../mongo/data/schemas/comment');
const mongoose = require('mongoose');

const validateCommentInput = (req, res, next) => {
  const { user, text, question } = req.body;
  if (user && !mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  if (text && !text.trim()) {
    return res.status(400).json({ message: 'Invalid text' });
  }
  if (question && !mongoose.Types.ObjectId.isValid(question)) {
    return res.status(400).json({ message: 'Invalid question ID' });
  }
  next();
};

module.exports = validateCommentInput;
