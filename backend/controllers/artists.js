const jwt = require('jsonwebtoken');
const artistsRouter = require('express').Router();
const Artist = require('../models/Artist');
const db = require('../config/database');

// getTokenFrom eristää tokenin authorization -headeristä
const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get one artist
artistsRouter.get('/details/:id', async (req, res, next) => {
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

// get albums by artist
artistsRouter.get('/albumsby/:id', async (req, res, next) => {
  try {
    // see if token is valid
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const albumlist = await db.query(
      `
    SELECT al.id as album_id, ar.id as artist_id, al.name, al.identifier, ar.name as artist_name, ar.spotify_id as artist_spotify_id,
    count(distinct tr.id) as track_count, count(rt.track_id) as report_occurrence
    FROM playlist__album as al, playlist__artist as ar, playlist__track as tr,
    playlist__report_track as rt
    WHERE al.artist_id = ar.id
    and tr.album_id = al.id
    and rt.track_id = tr.id
    and ar.id = ${req.params.id}
    group by album_id
    `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    if (albumlist) {
      console.log('artistrouter log albumlist', albumlist);
      res.json(albumlist);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// update artist
artistsRouter.put('/details/:id', async (req, res, next) => {
  try {
    // see if token is valid
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    let { name, spotify_id } = req.body;

    const updatedArtist = await Artist.update(
      {
        name,
        spotify_id
      },
      { where: { id: req.params.id } }
    );
    if (updatedArtist) {
      console.log('artistrouter log', updatedArtist);
      res.json(updatedArtist);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = artistsRouter;
