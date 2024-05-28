const Tags = require('../mongo/data/schemas/tags'); // Adjust the path to your tags model

const getTags = async (req, res) => {
  console.log('Request received to get tags:'); // Log request body

  try {
    const allTags = await Tags.find({});
    res.json(allTags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tags', error });
  }
};

module.exports = {
  getTags,
};
