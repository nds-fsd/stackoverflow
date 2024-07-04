const express = require('express');
const { getUsers, getUserById } = require('../controllers/users');
const { validateUserId } = require('../middlewares/users');
const { jwtMiddleware } = require('../middlewares/jwt');

const router = express.Router();

//router.use(jwtMiddleware);

router.get('/users', getUsers);
router.get('/users/:id', validateUserId, getUserById);

module.exports = router;
