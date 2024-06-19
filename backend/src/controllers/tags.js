const Tag = require('../mongo/data/schemas/tag');

const getTags = async (req, res) => {
  try {
    const allTags = await Tag.find({});
    res.json(allTags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tags', error });
  }
};

const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tag', error });
  }
};

const createTag = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(409).json({ message: 'Tag already exists' });
    }

    const newTag = new Tag({
      name,
      description: description || '', // Use an empty string if no description is provided
    });

    await newTag.save();
    console.log('Tag saved successfully', newTag);
    res.status(201).json(newTag);
  } catch (error) {
    console.error('Error saving tag', error);
    res.status(500).json({ message: 'Error creating tag', error });
  }
};

const deleteTag = async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting tag', error);
    res.status(500).json({ message: 'Error deleting tag' });
  }
};

module.exports = {
  getTags,
  getTagById,
  createTag,
  deleteTag,
};
