const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments.js');

router.post('/comments', commentController.createComment);
router.get('/comments/:questionId', commentController.getCommentsByQuestionId);
router.delete('/comments/:commentId', commentController.deleteComment); // Add this line
module.exports = router;
