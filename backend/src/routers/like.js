const express = require('express');
const { createLike, deleteLike, getLikeCountByCommentId, getLikesByUserId } = require('../controllers/like');
const router = express.Router();

router.post('/likes', createLike);
router.delete('/likes', deleteLike); // Add this line
router.get('/likes/:commentId', getLikeCountByCommentId);
router.get('/user-likes/:userId', getLikesByUserId);

module.exports = router;
