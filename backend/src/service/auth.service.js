const jwt = require('jsonwebtoken');

const generateJWT = (user) => {
  return jwt.sign(
    {
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );
};

const validateJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateJWT,
  validateJWT,
};
