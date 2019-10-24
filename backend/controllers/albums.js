const jwt = require('jsonwebtoken');
const albumsRouter = require('express').Router();
const Album = require('../models/Album');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get one album
albumsRouter.get('/:id', async (req, res, next) => {
  try {
    // see if token is valid
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const album = await Album.findOne({
      where: { id: req.params.id }
    });
    if (album) {
      console.log('Albumsrouter log', album);
      res.json(album.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// add album

module.exports = albumsRouter;
