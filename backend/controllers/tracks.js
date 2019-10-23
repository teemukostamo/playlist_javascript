const jwt = require('jsonwebtoken');
const tracksRouter = require('express').Router();
const Track = require('../models/Track');
const Album = require('../models/Album');
const Artist = require('../models/Artist');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

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
tracksRouter.post('/', async (req, res, next) => {
  try {
    // see if token is valid
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    // destructure values from req.body
    let {
      track_title,
      artist_name,
      album_name,
      label,
      cat_id,
      year,
      disc_no,
      track_no,
      length,
      country,
      record_country,
      people,
      comment,
      isrc
    } = req.body;

    // see if artist exists
    const artist = await Artist.findOne({ where: { name: artist_name } });
    // see if album exists
    const album = await Album.findOne({
      where: { artist_id: artist.id, name: album_name }
    });

    if (!artist && !album) {
      // create new artist
      const newArtist = await Artist.create({
        name: artist_name
      });
      console.log('created new artist', newArtist);
      // create new album
      const newAlbum = await Album.create({
        name: album_name,
        artist_id: newArtist.id,
        identifier: cat_id,
        label: label,
        year: year
      });
      console.log('created new album', newAlbum);

      // create new track
      const newTrack = await Track.create({
        artist_id: newArtist.id,
        album_id: newAlbum.id,
        identifier: cat_id,
        label,
        name: track_title,
        disc_no,
        track_no,
        length,
        country,
        record_country,
        people,
        comment,
        isrc
      });
      console.log('created new track', newTrack);
      res.status(201).json(newTrack.toJSON());
    } else if (!album) {
      // create new album
      const newAlbum = await Album.create({
        name: album_name,
        artist_id: artist.id,
        identifier: cat_id,
        label: label,
        year: year
      });
      console.log('created new album', newAlbum);

      // create new track
      const newTrack = await Track.create({
        artist_id: artist.id,
        album_id: newAlbum.id,
        identifier: cat_id,
        label,
        name: track_title,
        disc_no,
        track_no,
        length,
        country,
        record_country,
        people,
        comment,
        isrc
      });
      console.log('created new track', newTrack);
      res.status(201).json(newTrack.toJSON());
    } else {
      // see if track exists
      const track = await Track.findOne({
        where: { artist_id: artist.id, album_id: album.id, name: track_title }
      });

      if (track) {
        return res.status(409).json({ error: 'track already exists!' });
      }

      // create new track
      const newTrack = await Track.create({
        artist_id: artist.id,
        album_id: album.id,
        identifier: cat_id,
        label,
        name: track_title,
        disc_no,
        track_no,
        length,
        country,
        record_country,
        people,
        comment,
        isrc
      });
      console.log('created new track', newTrack);
      res.status(201).json(newTrack.toJSON());
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = tracksRouter;
