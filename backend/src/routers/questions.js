const express = require('express');
const {
  getQuestions,
  getQuestionById,
  createQuestion,
  editQuestion,
  deleteQuestion,
} = require('../controllers/questions');
const validateQuestion = require('../middlewares/questions');

const router = express.Router();

router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestionById);
router.post('/questions', validateQuestion, createQuestion);
router.put('/questions/:id', validateQuestion, editQuestion);
router.delete('/questions/:id', deleteQuestion);

module.exports = router;
