const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Tag = model('Tag', tagSchema);

module.exports = Tag;
