const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

// get one user
usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
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

    const saltRounds = 10;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    console.log('hashed password: ', password);
    console.log('hashed password type: ', typeof password);
    console.log('hashed password length: ', password.length);

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
    console.log(savedUser);
    res.status(201).json(savedUser.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
