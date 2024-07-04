const express = require('express');
const { createLike, getLikeCountByCommentId } = require('../controllers/like');
const router = express.Router();

router.post('/likes', createLike);
router.get('/likes/:commentId', getLikeCountByCommentId);

module.exports = router;
