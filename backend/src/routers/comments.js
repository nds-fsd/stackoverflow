const express = require('express');
const { createComment, editComment, deleteComment, getCommentsByQuestionId } = require('../controllers/comments');
const validateCommentInput = require('../middlewares/comments');
const { jwtMiddleware } = require('../middlewares/jwt');

const router = express.Router();

router.use(jwtMiddleware);

router.post('/comments', validateCommentInput, createComment);
router.put('/comments/:id', validateCommentInput, editComment);
router.delete('/comments/:id', deleteComment);
router.get('/comments/:questionId', getCommentsByQuestionId);

module.exports = router;
