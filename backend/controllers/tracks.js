const tracksRouter = require('express').Router();
const Track = require('../models/Track');

// get one track
tracksRouter.get('/:id', async (req, res, next) => {
  try {
    const track = await Track.findOne({ where: { id: req.params.id } });
    if (track) {
      console.log('tracksrouter log', track);
      res.json(track.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// add track

module.exports = tracksRouter;
