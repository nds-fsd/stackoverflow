const express = require('express');
const router = express.Router();
const { getTags } = require('../controllers/tags'); // Adjust the path to your getTags function

router.get('/tags', getTags);

module.exports = router;
