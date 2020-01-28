const bcrypt = require('bcrypt');
const User = require('../models/User');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all users
// @route   GET /
// @access  Private
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password']
    }
  });
  if (!users) {
    return next(new ErrorResponse('no users found', 404));
  }
  res.status(200).json(users);
});

// @desc    Get one user
// @route   GET /:id
// @access  Private
exports.getOneUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: {
      exclude: ['password']
    }
  });
  if (!user) {
    return next(
      new ErrorResponse(`no user found with the id ${req.params.id}`, 404)
    );
  }
  res.status(200).json(user);
});

// @desc    Add a new user
// @route   POST /
// @access  Private
exports.addUser = asyncHandler(async (req, res, next) => {
  // see if user exists, send status 400 if yes
  const existingUser = await User.findOne({
    where: { username: req.body.username }
  });
  if (existingUser !== null) {
    return res.status(400).json({ error: 'User already exists!' });
  } else {
    // destructure values from req.body
    let {
      username,
      first_name,
      last_name,
      email,
      address,
      zip,
      city,
      country,
      phone,
      level,
      last_seen,
      reset_key,
      old_id
    } = req.body;

    // hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

    // create new user
    const savedUser = await User.create({
      username,
      password: passwordHash,
      first_name,
      last_name,
      email,
      address,
      zip,
      city,
      country,
      phone,
      status: 1,
      level,
      last_seen,
      reset_key,
      old_id
    });
    res.status(201).json(savedUser.toJSON());
  }
});

// @desc    Update user
// @route   PUT /:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  // see if user exists, return error if not
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return next(
      new ErrorResponse(`no user found with the id ${req.params.id}`, 404)
    );
  }

  // destructure values from req body
  let { first_name, last_name, email, status, level, last_seen } = req.body;

  // if req body password is empty string, only update other info
  if (
    req.body.password === undefined ||
    req.body.password === null ||
    req.body.password === ''
  ) {
    const updatedUser = await User.update(
      {
        first_name,
        last_name,
        email,
        status,
        level,
        last_seen
      },
      { where: { id: req.params.id } }
    );
    console.log(updatedUser);
    return res.status(200).json(`${updatedUser[0]} rows affected`);
  } else {
    // hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

    const updatedUser = await User.update(
      {
        password: passwordHash,
        first_name,
        last_name,
        email,
        status,
        level,
        last_seen
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json(`${updatedUser[0]} rows affected`);
  }
});

// @desc    Delete user
// @route   DELETE /:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return next(
      new ErrorResponse(`no user found with the id ${req.params.id}`, 404)
    );
  }
  await User.destroy({
    where: { id: req.params.id }
  });
  res.status(204).json({});
});
