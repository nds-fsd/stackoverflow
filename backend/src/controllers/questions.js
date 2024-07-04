const mongoose = require('mongoose');
const Question = require('../mongo/data/schemas/question');
const Tag = require('../mongo/data/schemas/tag');
const user = require('../mongo/data/schemas/user'); // Ensure User model is imported

const createQuestion = async (req, res) => {
  const { title, body, tags, authorId } = req.body;

  console.log('Received request body:', req.body);

  try {
    const author = mongoose.Types.ObjectId(authorId);

    if (!Array.isArray(tags)) {
      console.error('Tags must be an array');
      return res.status(400).json({ message: 'Tags must be an array' });
    }

    const tagIds = await Promise.all(
      tags.map(async (tagName) => {
        let tag = await Tag.findOne({ name: tagName });
        if (!tag) {
          tag = new Tag({ name: tagName });
          await tag.save();
        }
        return tag._id;
      }),
    );

    const newQuestion = new Question({
      title,
      body,
      tags: tagIds,
      author,
    });

    await newQuestion.save();

    const populatedQuestion = await Question.findById(newQuestion._id).populate('author', 'username');

    res.status(201).json(populatedQuestion);
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('author', 'username'); // Populate the author field with the username
    if (!question || question.deleted_at) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching question', error });
  }
};

const editQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate(
      'author',
      'username',
    ); // Populate the author field with the username
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    console.log(updatedQuestion);
    res.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question', error);
    res.status(500).json({ message: 'Error updating question' });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting question', error);
    res.status500.json({ message: 'Error deleting question' });
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  editQuestion,
  deleteQuestion,
};
