const express = require('express');
const router = express.Router();
const { createComment, deleteComment, getCommentsByQuestionId } = require('../controllers/comments');
const validateCommentInput = require('../middlewares/comments');
const { jwtMiddleware } = require('../middlewares/jwt');

router.post('/comments', jwtMiddleware, validateCommentInput, createComment);
router.get('/comments/:questionId', getCommentsByQuestionId);
router.delete('/comments/:commentId', jwtMiddleware, deleteComment);

module.exports = router;
