const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ where: { username: body.username } });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password);

  console.log('is password correcr', passwordCorrect);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
