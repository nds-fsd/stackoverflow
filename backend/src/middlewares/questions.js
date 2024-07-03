const validateQuestion = async (req, res, next) => {
  console.log('Request Type:', req.method);
  const { title, body, authorId } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).send({ message: 'Title is required' });
  }

  if (!body || body.trim().length === 0) {
    return res.status(400).send({ message: 'Body is required' });
  }

  // Temporarily skip ObjectId validation for author
  if (!authorId || authorId.trim().length === 0) {
    return res.status(400).send({ message: 'Author is required' });
  }

  /* User verification - skip for now as users schema not yet defined
    try {
        const userExists = await User.findById(author);
        if (!userExists) {
            return res.status(404).send({ message: 'Author not found' });
        }
    } catch (error) {
        console.error('Error validating author:', error);
        return res.status(500).send({ message: 'Error checking author validity', error });
    }*/

  next();
};

module.exports = validateQuestion;
