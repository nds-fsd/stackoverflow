const Comment = require('../mongo/data/schemas/comment');

const createComment = async (req, res) => {
  const { user, text, question } = req.body;

  try {
    const newComment = new Comment({
      user,
      text,
      question,
    });

    await newComment.save();
    console.log('Comment saved successfully', newComment);
    
    // const questionData = await Question.findById(question).populate('user'); // Assuming the question has a 'user' field referring to its owner
    // if (questionData) {
    //   const ownerEmail = questionData.user.email;
    //   const ownerUsername = questionData.user.name;
    //   const commenterName = user.name;

    //   await sendCommentNotificationEmail(ownerEmail, ownerUsername, commenterName);
    // }

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error saving comment', error);
    res.status(500).json({ message: 'Error creating comment', error });
  }
};

const editComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    console.log(updatedComment);
    res.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment', error);
    res.status(500).json({ message: 'Error updating comment' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting comment', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};

module.exports = {
  createComment,
  editComment,
  deleteComment,
};
