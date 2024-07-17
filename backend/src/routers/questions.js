const express = require('express');
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  unlikeQuestion,
} = require('../controllers/questions');
const validateQuestion = require('../middlewares/questions');
const { jwtMiddleware } = require('../middlewares/jwt');

const router = express.Router();

router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestionById);
router.post('/questions', jwtMiddleware, validateQuestion, createQuestion);
router.put('/questions/:id', validateQuestion, editQuestion);
router.delete('/questions/:id', deleteQuestion);
router.post('/questions/:id/like', jwtMiddleware, likeQuestion);
router.post('/questions/:id/unlike', unlikeQuestion);

module.exports = router;
