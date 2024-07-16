const express = require('express');
const { getUsers, getUserById, getUserByUsername } = require('../controllers/users');
const { validateUserId } = require('../middlewares/users');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', validateUserId, getUserById);
router.get('/users/username/:username', getUserByUsername); // New endpoint to get user by username

module.exports = router;
