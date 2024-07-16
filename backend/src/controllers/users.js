const Comment = require('../mongo/data/schemas/comment');
const Like = require('../mongo/data/schemas/like');
const User = require('../mongo/data/schemas/user');

const getUserCommentsCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const commentsCount = await Comment.countDocuments({ userId: userId });
    res.json({ commentsCount });
  } catch (error) {
    console.error('Error fetching comments count:', error);
    res.status(500).json({ message: 'Error fetching comments count', error: error.message });
  }
};

const getUserLikesCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const likesCount = await Like.countDocuments({ userId: userId });
    res.json({ likesCount });
  } catch (error) {
    console.error('Error fetching likes count:', error);
    res.status(500).json({ message: 'Error fetching likes count', error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const queryStrings = req.query || {};
    const allUsers = await User.find(queryStrings).where('deleted_at').equals(null);
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.deleted_at) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  getUserCommentsCount,
  getUserLikesCount,
};
