const jwt = require('jsonwebtoken');
const artistsRouter = require('express').Router();
const Artist = require('../models/Artist');
const User = require('../models/User');

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

// add artist
artistsRouter.post('/', async (req, res, next) => {
  // get authorization token from request
  const token = getTokenFrom(req);

  try {
    // verify token with jwt
    const decodedToken = jwt.verify(token, process.env.SECRET);

    // res with error if token invalid or missing
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    // res with error if artist name missing
    if (req.body.name === undefined) {
      return res.status(400).json({ error: 'content missing' });
    }

    // find user who saves new artist and get user_id
    const user = await User.findOne({ where: { id: decodedToken.id } });
    const user_id = user.id;

    // destructure other values from req body
    let { name, spotify_id, old_id } = req.body;

    // create new artist
    const savedArtist = await Artist.create({
      name,
      spotify_id,
      old_id,
      user_id
    });
    res.status(201).json(savedArtist.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = artistsRouter;
