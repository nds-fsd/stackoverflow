// controllers/questions.js

const mongoose = require('mongoose');
const Question = require('../mongo/data/schemas/question');
const Tag = require('../mongo/data/schemas/tag');
const User = require('../mongo/data/schemas/user');

const createQuestion = async (req, res) => {
  const { title, body, tags, authorId } = req.body;

  console.log('Received request body:', req.body);

  try {
    // Find the user based on authorId
    const author = await User.findById(authorId);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

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

    console.log('Tag IDs:', tagIds);

    const newQuestion = new Question({
      title,
      body,
      tags: tagIds,
      author: {
        _id: author._id,
        username: author.username,
      },
    });

    await newQuestion.save();

    const populatedQuestion = await Question.findById(newQuestion._id).populate('author', 'username');

    res.status(201).json(populatedQuestion);
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
};
const getQuestions = async (req, res) => {
  try {
    const { page = 1, limit = 5, sortBy = 'popular' } = req.query;

    let sortCriteria;
    if (sortBy === 'new') {
      sortCriteria = { created_at: -1 };
    } else if (sortBy === 'popular') {
      sortCriteria = { likes: -1 };
    } else {
      sortCriteria = {};
    }

    const questions = await Question.find()
      .where('deleted_at')
      .equals(null)
      .populate('author', 'username')
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalQuestions = await Question.countDocuments().where('deleted_at').equals(null);

    res.json({ questions, totalQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate('author', 'username'); // Populate the author field with 'username'
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
    res.status(500).json({ message: 'Error deleting question' });
  }
};

const likeQuestion = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const question = await Question.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } }, // Add the userId to the likes array
      { new: true },
    );
    res.status(200).json({ likeCount: question.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error liking question', error });
  }
};

const unlikeQuestion = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const question = await Question.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } }, // Remove the userId from the likes array
      { new: true },
    );
    res.status(200).json({ likeCount: question.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error unliking question', error });
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  unlikeQuestion,
};
