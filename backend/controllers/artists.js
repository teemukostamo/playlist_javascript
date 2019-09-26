const artistsRouter = require('express').Router();
const Artist = require('../models/Artist');

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
  try {
    if (req.body.name === undefined) {
      return res.status(400).json({ error: 'content missing' });
    }

    let { name, spotify_id, old_id, user_id } = req.body;

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
