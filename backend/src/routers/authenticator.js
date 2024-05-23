const express = require('express');
const { register, login } = require('../controllers/authenticator');
const { isValidEmail } = require('../middlewares/users');
const router = express.Router();

router.post('/register', isValidEmail, register);
router.post('/login', login);

module.exports = router;
