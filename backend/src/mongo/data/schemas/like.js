const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const User = require('./user');
const Comment = require('./comment');

const likeSchema = new Schema({
  likeId: { type: Schema.Types.ObjectId, auto: true }, // Explicit unique identifier
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  commentId: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the like was created
});

likeSchema.post('save', async function (doc) {
  try {
    const comment = await Comment.findById(doc.commentId);
    await User.findByIdAndUpdate(comment.userId, { $inc: { reputation: 1 } });
  } catch (error) {
    console.error('Error updating reputation on like:', error);
  }
});

likeSchema.post('remove', async function (doc) {
  try {
    const comment = await Comment.findById(doc.commentId);
    await User.findByIdAndUpdate(comment.userId, { $inc: { reputation: -1 } });
  } catch (error) {
    console.error('Error updating reputation on unlike:', error);
  }
});

module.exports = model('Like', likeSchema);
