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

module.exports = artistsRouter;
