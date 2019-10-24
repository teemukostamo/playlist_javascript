const jwt = require('jsonwebtoken');
const artistsRouter = require('express').Router();
const Artist = require('../models/Artist');

// getTokenFrom eristää tokenin authorization -headeristä
const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get one artist
artistsRouter.get('/:id', async (req, res, next) => {
  try {
    // see if token is valid
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const artist = await Artist.findOne({ where: { id: req.params.id } });
    if (artist) {
      console.log('artistrouter log', artist);
      res.json(artist.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = artistsRouter;
