const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },

  password: { type: String, required: true, minlength: 6 },
  username: { type: String, required: true, unique: true },
  reputation: { type: Number, default: 0 },
  profile_picture: { type: String, default: 'https://klr.ac.in/wp-content/uploads/2015/11/dummy-user-1-200x200.jpg' }, // Image URL
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});

const User = model('user', userSchema);

module.exports = User;
