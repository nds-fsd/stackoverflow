const express = require('express');
const { register, login } = require('../controllers/authenticator');
const { validateEmail } = require('../middlewares/users');
const router = express.Router();

router.post('/register', validateEmail, register);
router.post('/login', login);

module.exports = router;
