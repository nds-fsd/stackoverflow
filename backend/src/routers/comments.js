const express = require('express');
const { createComment, editComment, deleteComment } = require('../controllers/comments');
const validateCommentInput = require('../middlewares/comments');

const router = express.Router();

router.post('/comments', validateCommentInput, createComment);
router.put('/comments/:id', validateCommentInput, editComment);
router.delete('/comments/:id', deleteComment);

module.exports = router;
