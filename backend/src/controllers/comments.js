const mongoose = require('mongoose');
const Comment = require('../mongo/data/schemas/comment');
const Question = require('../mongo/data/schemas/question');
const { sendCommentNotificationEmail } = require('../service/email.service');

const createComment = async (req, res) => {
  const { questionId, userId, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(questionId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid questionId or userId' });
  }

  console.log('Received request body:', req.body);

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
    const questionData = await Question.findById(questionId).populate('author'); // Assuming the question has a 'user' field referring to its owner
    if (questionData) {
      const ownerEmail = questionData.author.email;
      const ownerUsername = questionData.author.username;
      const commenterName = newComment.userId.username;

      await sendCommentNotificationEmail(ownerEmail, ownerUsername, commenterName);
    }

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error saving comment:', error);
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

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid commentId' });
  }

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Optionally, remove the comment reference from the question
    await Question.updateOne({ _id: deletedComment.questionId }, { $pull: { comments: commentId } });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment', error: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByQuestionId,
  deleteComment,
  getCommentsByQuestionId,
};
