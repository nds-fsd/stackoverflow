const Question = require('../mongo/data/schemas/question');

const getQuestions = async (req, res) => {
  try {
    const queryStrings = req.query || {};
    const allQuestions = await Question.find(queryStrings).where('deleted_at').equals(null);
    res.json(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question || question.deleted_at) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

const createQuestion = async (req, res) => {
  const { title, body, tags, author } = req.body;
  const newQuestion = new Question({ title, body, tags, author });

  console.log('Attempting to save new question:', newQuestion);

  try {
    await newQuestion.save();
    console.log('Question saved successfully', newQuestion);
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error saving question', error);
    res.status(500).json({ message: 'Error creating question' });
  }
};

const editQuestion = async (req, res) => {
  const allQuestions = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  console.log(allQuestions);
  res.json(allQuestions);
};

const deleteQuestion = async (req, res) => {
  try {
    const allQuestions = await Question.findByIdAndDelete(req.params.id);
    res.json(deleteQuestion);
  } catch (error) {
    console.error('Error saving question', error);
    res.status(500).json({ message: 'Error deleting question' });
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  editQuestion,
  deleteQuestion,
};
