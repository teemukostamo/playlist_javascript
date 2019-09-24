const artistsRouter = require('express').Router();
const Artist = require('../models/Artist');

// get all artists
artistsRouter.get('/', async (req, res) => {
  const artists = await Artist.findOne();
  console.log('artistrouter log', artists);
  response.json(artists.map(artist => artist.toJSON()));
});

module.exports = artistsRouter;
