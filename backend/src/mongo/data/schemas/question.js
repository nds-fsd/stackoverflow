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

questionSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

questionSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updated_at: Date.now() });
  next();
});

const Question = model('question', questionSchema);

module.exports = Question;
