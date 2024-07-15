const express = require('express');
const { createLike, deleteLike, getLikeCountByCommentId, getLikesByUserId } = require('../controllers/like');
const router = express.Router();
const { jwtMiddleware } = require('../middlewares/jwt');

router.post('/likes', jwtMiddleware, createLike);
router.delete('/likes', jwtMiddleware, deleteLike);
router.get('/likes/:commentId', getLikeCountByCommentId);
router.get('/user-likes/:userId', getLikesByUserId);

module.exports = router;
