const jwt = require('jsonwebtoken');
const searchRouter = require('express').Router();
const db = require('../config/database');
const Track = require('../models/Track');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Report_Track = require('../models/Report_Track');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get results for autocomplete search
searchRouter.get('/autocomplete/:query', async (req, res, next) => {
  try {
    // see if token is valid
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const searchString = req.params.query;
    console.log(searchString.length);
    if (searchString.length < 3) {
      return res.status(400).json({ error: 'query too short' });
    }
    const results = await db.query(
      `
      SELECT t.name as track_title
      , ar.name as artist
      , al.name as album
      , t.id as track_id
      , t.length
      , al.id as album_id
      , ar.id as artist_id
      , t.label as label
     FROM playlist__track as t
     INNER JOIN playlist__artist as ar ON t.artist_id = ar.id
     INNER JOIN playlist__album as al ON t.album_id = al.id
     WHERE (t.name like "%${searchString}%" or ar.name like "%${searchString}%")
     ORDER BY t.name ASC 
     LIMIT 100
      `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    console.log(results);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

// advanced search results
searchRouter.get('/advanced', async (req, res, next) => {
  try {
    // see if token is valid
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const searchString = req.query.query;
    const kind = req.query.kind;
    console.log(searchString.length);
    if (searchString.length < 3) {
      return res.status(400).json({ error: 'query too short' });
    }
    const results = await db.query(
      `
      SELECT ar.name as artist_name
      , ar.id as artist_id
      , al.name as album_name
      , al.id as album_id
      , tr.name as track_title
      , tr.id as track_id
      , tr.length
      , MAX(re.program_date) as program_date
      , MAX(re.id) as report_id
      FROM playlist__program as pr
      INNER JOIN playlist__report as re ON re.program_id = pr.id
      INNER JOIN playlist__report_track as rt ON rt.report_id = re.id
      INNER JOIN playlist__track as tr ON rt.track_id = tr.id
      INNER JOIN playlist__album as al ON tr.album_id = al.id
      INNER JOIN playlist__artist as ar ON tr.artist_id = ar.id AND al.artist_id = ar.id
      WHERE ${kind}.name like "%${searchString}%"
      GROUP BY tr.id
      ORDER BY track_title asc
      LIMIT 1000
      `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    console.log(results);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

// merge tracks, albums or artists
searchRouter.put('/advanced', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    let { type, merge, mergeTo } = req.body;

    if (type === 'track') {
      let transaction;
      try {
        transaction = await db.transaction();
        await Report_Track.update(
          {
            track_id: mergeTo
          },
          { where: { track_id: merge } }
        );
        await Track.destroy({ where: { id: merge } });
        res.status(200).json('1 table affected');
      } catch (err) {
        if (transaction) await transaction.rollback();
      }
    } else if (type === 'album') {
      let transaction;
      try {
        transaction = await db.transaction();
        await Track.update(
          {
            album_id: mergeTo
          },
          { where: { album_id: merge } }
        );
        await Album.destroy({ where: { id: merge } });
        res.status(200).json('1 table affected');
      } catch (err) {
        if (transaction) await transaction.rollback();
      }
    } else if (type === 'artist') {
      let transaction;
      try {
        transaction = await db.transaction();
        await Album.update(
          {
            artist_id: mergeTo
          },
          { where: { artist_id: merge } }
        );
        await Track.update(
          {
            artist_id: mergeTo
          },
          { where: { artist_id: merge } }
        );
        await Artist.destroy({ where: { id: merge } });
        res.status(200).json('2 tables affected');
      } catch (err) {
        if (transaction) await transaction.rollback();
      }
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

// change artist options
searchRouter.get('/changeartist/:query', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const results = await db.query(
      `
    SELECT name as artist_name, id as artist_id
    FROM playlist__artist
    WHERE name like "%${req.params.query}%"
    `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    res.status(200).json(results);
  } catch (exception) {
    next(exception);
  }
});

// change album options
searchRouter.get('/changealbum/:query', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const results = await db.query(
      `
    SELECT al.name as album_name, al.id as album_id, al.identifier as cat_id, ar.name as artist_name
    FROM playlist__album as al
    INNER JOIN playlist__artist as ar ON al.artist_id = ar.id
    WHERE al.name like "%${req.params.query}%"
    ORDER BY album_name asc
    `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    res.status(200).json(results);
  } catch (exception) {
    next(exception);
  }
});

module.exports = searchRouter;
