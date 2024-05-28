const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: [] }], // Corrected to 'Tag'
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  votes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});

const Question = model('Question', questionSchema);

module.exports = Question;
