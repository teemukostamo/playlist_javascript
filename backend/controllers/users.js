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

module.exports = usersRouter;
