const jwt = require('jsonwebtoken');
const albumsRouter = require('express').Router();
const Album = require('../models/Album');
const db = require('../config/database');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get one album
albumsRouter.get('/albumdetails/:id', async (req, res, next) => {
  try {
    // see if token is valid
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const album = await db.query(
      `
      SELECT al.name as album_name
      , al.id as album_id
      , al.label
      , al.identifier as cat_id
      , al.spotify_id
      , al.year
      , ar.name as artist_name
      , ar.id as artist_id
      FROM playlist__artist as ar
      INNER JOIN playlist__album as al ON al.artist_id = ar.id
      WHERE al.id = ${req.params.id}
    `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    if (album) {
      console.log('Albumsrouter log', album);
      res.json(album);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// get one albums tracklist & report count
albumsRouter.get('/tracklist/:id', async (req, res, next) => {
  try {
    // see if token is valid
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const album = await db.query(
      `
      SELECT tr.id as track_id
      , tr.isrc
      , tr.side as disc_no
      , tr.track_no
      , tr.name as track_title
      , ar.name as artist_name
      , count(rt.track_id) as report_occurrence
     FROM playlist__album as al
     INNER JOIN  playlist__artist as ar ON al.artist_id = ar.id
     INNER JOIN  playlist__track as tr ON tr.album_id = al.id
     INNER JOIN  playlist__report_track as rt ON  rt.track_id = tr.id
     WHERE al.id = ${req.params.id}
     group by track_id
     order by track_no asc, track_title asc
    `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    if (album) {
      console.log('Albumsrouter log', album);
      res.json(album);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// add album

module.exports = albumsRouter;
