const mongoose = require('mongoose');
const Like = require('../mongo/data/schemas/like');

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

const deleteLike = async (req, res) => {
  const { userId, commentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid userId or commentId' });
  }

  try {
    const existingLike = await Like.findOneAndDelete({ userId, commentId });
    if (!existingLike) {
      return res.status(404).json({ message: 'Like not found' });
    }

    res.status(200).json({ message: 'Like deleted successfully' });
  } catch (error) {
    console.error('Error deleting like:', error);
    res.status(500).json({ message: 'Error deleting like', error: error.message });
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

const getLikesByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  try {
    const likes = await Like.find({ userId }).select('commentId');
    res.json(likes);
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ message: 'Error fetching likes', error });
  }
};

module.exports = {
  createLike,
  deleteLike,
  getLikeCountByCommentId,
  getLikesByUserId,
};
