const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

// get all users
usersRouter.get('/', async (req, res) => {
  const users = await User.findAll();
  console.log('users length', users.length);
  res.json(users.map(user => user.toJSON()));
});

// get one user
usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    console.log(user);
    if (user) {
      console.log('usersrouter log', user);
      res.json(user.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// add a user
usersRouter.post('/', async (req, res, next) => {
  try {
    let {
      username,
      password,
      first_name,
      last_name,
      email,
      address,
      zip,
      city,
      country,
      phone,
      status,
      level,
      last_seen,
      reset_key,
      old_id
    } = req.body;

    // see if user exists
    const existingUser = await User.findOne({
      where: { username: req.body.username }
    });

    if (existingUser !== null) {
      return res.status(400).json({ error: 'User already exists!' });
    } else {
      // hash password
      // const saltRounds = 10;
      // const password = await bcrypt.hash(req.body.password, saltRounds);

      // create new user
      const savedUser = await User.create({
        username,
        password,
        first_name,
        last_name,
        email,
        address,
        zip,
        city,
        country,
        phone,
        status,
        level,
        last_seen,
        reset_key,
        old_id
      });
      console.log('saved new user from userRouter', savedUser);
      res.status(201).json(savedUser.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
