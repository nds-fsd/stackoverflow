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

const router = express.Router();

router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestionById);
router.post('/questions', validateQuestion, createQuestion);
router.put('/questions/:id', validateQuestion, editQuestion);
router.delete('/questions/:id', deleteQuestion);
router.post('/questions/:id/like', likeQuestion); // Add route for liking
router.post('/questions/:id/unlike', unlikeQuestion); // Add route for unliking

module.exports = router;
