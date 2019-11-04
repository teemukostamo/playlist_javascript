const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

// login route
loginRouter.post('/', async (req, res) => {
  const body = req.body;

  // check if user exists, return 401 if not
  const user = await User.findOne({ where: { username: body.username } });
  console.log(user);
  if (!user) {
    return res.status(401).json({
      error: 'user not found!'
    });
  }

  // check if password is correct, return 401 if not
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password'
    });
  }

  // create user object for token
  const userForToken = {
    username: user.username,
    id: user.id
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  // update last seen field
  const updatedUser = await User.update(
    { last_seen: new Date() },
    { where: { username: body.username } }
  );

  console.log(updatedUser);

  // response ok with token and username
  res.status(200).send({
    token,
    username: user.username,
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    level: user.level,
    status: user.status
  });
});

module.exports = loginRouter;
