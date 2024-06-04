const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  text: { type: String, required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
