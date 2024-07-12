const { User } = require('../mongo/data/schemas/user');
const { validateJWT } = require('../service/auth.service');

exports.jwtMiddleware = async (req, res, next) => {
  console.log('JWT Middleware Invoked');

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token is invalid' });
  }

  const token = authorization.split(' ')[1];
  try {
    const payload = validateJWT(token);
    const user = await User.findOne({ email: payload.email });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token is invalid' });
  }
};
