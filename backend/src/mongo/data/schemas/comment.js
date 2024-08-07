const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Comment', commentSchema);
