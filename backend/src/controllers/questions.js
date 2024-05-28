const Question = require('../mongo/data/schemas/question');
const Tag = require('../mongo/data/schemas/tags');

const getQuestions = async (req, res) => {
  try {
    const queryStrings = req.query || {};
    const allQuestions = await Question.find(queryStrings).where('deleted_at').equals(null);
    res.json(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question || question.deleted_at) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

const createQuestion = async (req, res) => {
  const { title, body, tags, author } = req.body;

  console.log('Request received to create question:', req.body); // Log request body

  try {
    // Find or create tags
    const tagIds = await Promise.all(
      tags.map(async (tagName) => {
        let tag = await Tag.findOne({ name: tagName });
        if (!tag) {
          tag = new Tag({ name: tagName });
          await tag.save();
        }
        return tag._id;
      }),
    );

    const newQuestion = new Question({
      title,
      body,
      tags: tagIds,
      author,
    });

    console.log('Attempting to save new question:', newQuestion);

    await newQuestion.save();
    console.log('Question saved successfully', newQuestion);
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error saving question', error);
    res.status(500).json({ message: 'Error creating question' });
  }
};

const editQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    console.log(updatedQuestion);
    res.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question', error);
    res.status(500).json({ message: 'Error updating question' });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting question', error);
    res.status(500).json({ message: 'Error deleting question' });
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  editQuestion,
  deleteQuestion,
};
