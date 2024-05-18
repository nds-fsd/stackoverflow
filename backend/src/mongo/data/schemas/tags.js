const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const tagsSchema = new Schema({
  name: { type: String, required: true },
});

const Tags = model('tags', tagsSchema);

module.exports = Tags;
