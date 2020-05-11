require('dotenv').config()
const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
  // get the token
  const token = req.header('x-auth-token');

  // check if it exists
  if (!token) {
    return res.status(401).json({ msg: 'No token. Authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token.' });
  }
};
