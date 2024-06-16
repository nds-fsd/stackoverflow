const User = require('../mongo/data/schemas/user'); // Asegúrate de importar el esquema de usuario

const validateQuestion = async (req, res, next) => {
  console.log('Request Type:', req.method);
  const { title, body, author } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).send({ message: 'Title is required' });
  }

  if (!body || body.trim().length === 0) {
    return res.status(400).send({ message: 'Body is required' });
  }

  if (!author || !author.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({ message: 'Author must have a valid ObjectId' });
  }

  try {
    const userExists = await User.findById(author);
    if (!userExists) {
      return res.status(404).send({ message: 'Author not found' });
    }
  } catch (error) {
    console.error('Error validating author:', error);
    return res.status(500).send({ message: 'Error checking author validity', error });
  }

  next();
};

module.exports = validateQuestion;
