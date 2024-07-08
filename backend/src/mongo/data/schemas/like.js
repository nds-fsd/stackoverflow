const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const likeSchema = new Schema({
  likeId: { type: Schema.Types.ObjectId, auto: true }, // Explicit unique identifier
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  commentId: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the like was created
});

module.exports = model('Like', likeSchema);
