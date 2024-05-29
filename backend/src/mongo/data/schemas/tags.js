const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  questionCount: { type: Number, default: 0 },
  askedThisYear: { type: Number, default: 0 },
});

const Tag = model('Tag', tagSchema);

module.exports = Tag;
