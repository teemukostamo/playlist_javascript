const albumsRouter = require('express').Router();
const Album = require('../models/Album');

// get one album
albumsRouter.get('/:id', async (req, res, next) => {
  try {
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
