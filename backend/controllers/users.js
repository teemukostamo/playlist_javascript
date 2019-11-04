const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRouter = require('express').Router();
const User = require('../models/User');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get all users
usersRouter.get('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const users = await User.findAll();
    console.log('users length', users.length);
    res.json(users.map(user => user.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

// get one user
usersRouter.get('/:id', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
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
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
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
  } catch (exception) {
    next(exception);
  }
});

// update user
usersRouter.put('/:id', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const body = req.body;

    let { first_name, last_name, email, status, level, last_seen } = body;

    // req body password is empty string, only update other info
    if (req.body.password === '') {
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
      res.status(200).json(`${updatedUser[0]} rows affected`);
    }
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
    console.log(updatedUser);
    res.status(200).json(`${updatedUser[0]} rows affected`);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
