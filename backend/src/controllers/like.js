const mongoose = require('mongoose');
const Like = require('../mongo/data/schemas/like');
const Comment = require('../mongo/data/schemas/comment');

const createLike = async (req, res) => {
  const { userId, commentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid userId or commentId' });
  }

  try {
    const existingLike = await Like.findOne({ userId, commentId });
    if (existingLike) {
      return res.status(400).json({ message: 'User has already liked this comment' });
    }

    const newLike = new Like({ userId, commentId });

    await newLike.save();
    res.status(201).json(newLike);
  } catch (error) {
    console.error('Error saving like:', error);
    res.status(500).json({ message: 'Error creating like', error: error.message });
  }
};

const getLikeCountByCommentId = async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid commentId' });
  }

  try {
    const likeCount = await Like.countDocuments({ commentId });
    res.json({ likeCount });
  } catch (error) {
    console.error('Error fetching like count:', error);
    res.status(500).json({ message: 'Error fetching like count', error });
  }
};

module.exports = {
  createLike,
  getLikeCountByCommentId,
};
