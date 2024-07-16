const express = require('express');
const {
  getUsers,
  getUserById,
  getUserByUsername,
  getUserCommentsCount,
  getUserLikesCount,
} = require('../controllers/users');
const { validateUserId } = require('../middlewares/users');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', validateUserId, getUserById);
router.get('/users/username/:username', getUserByUsername);
router.get('/users/:userId/comments-count', getUserCommentsCount);
router.get('/users/:userId/likes-count', getUserLikesCount);

module.exports = router;
