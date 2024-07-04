const mongoose = require('mongoose');
const Comment = require('../mongo/data/schemas/comment');
const Question = require('../mongo/data/schemas/question');

const createComment = async (req, res) => {
  const { questionId, userId, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(questionId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid questionId or userId' });
  }

  console.log('Received request body:', req.body); // Log the entire request body

  try {
    const newComment = new Comment({
      questionId,
      userId,
      content,
    });

    console.log('Attempting to save new comment:', newComment);

    await newComment.save();
    console.log('Comment saved successfully', newComment);

    // Optionally, update the question to include this comment
    await Question.findByIdAndUpdate(questionId, { $push: { comments: newComment._id } });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error saving comment:', error); // Detailed error logging
    res.status(500).json({ message: 'Error creating comment', error: error.message });
  }
};

const getCommentsByQuestionId = async (req, res) => {
  const { questionId } = req.params;

  try {
    const comments = await Comment.find({ questionId }).populate('userId', 'username');
    if (!comments) {
      return res.status(404).json({ message: 'No comments found' });
    }
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

module.exports = {
  createComment,
  getCommentsByQuestionId,
};
