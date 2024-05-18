const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  name: { type: String, required: true },
});

const Tags = model('question', questionSchema);

module.exports = Tags;
