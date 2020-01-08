const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

const verifyUser = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().startsWith('bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Token missing or invalid!', 401));
  }
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log('decoded token', decoded);
    req.user = await User.findOne({ where: { id: decoded.id } });
    next();
  } catch (error) {
    return next(new ErrorResponse('Token missing or invalid!', 401));
  }
});

module.exports = verifyUser;
