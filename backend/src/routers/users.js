const express = require('express');
const { getUsers, getUserById } = require('../controllers/users');
const { logRequest, validateUserId } = require('../middlewares/users');

const router = express.Router();

router.get('/users', logRequest, getUsers);
router.get('/users/:id', logRequest, validateUserId, getUserById);

module.exports = router;
