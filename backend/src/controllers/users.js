const User = require('../mongo/data/schemas/user');

const getUsers = async (req, res) => {
  try {
    const queryStrings = req.query || {};
    const allUsers = await User.find(queryStrings).where('deleted_at').equals(null);
    res.json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.deleted_at) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
};
