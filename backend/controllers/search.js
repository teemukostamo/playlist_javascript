const jwt = require('jsonwebtoken');
const searchRouter = require('express').Router();
const db = require('../config/database');

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
      `SELECT t.name as track_title, ar.name as artist, al.name as album, t.id as track_id, t.length,
      al.id as album_id, ar.id as artist_id, t.label as label
      FROM playlist__artist as ar, playlist__album as al, playlist__track as t
      WHERE t.album_id = al.id
      and t.artist_id = ar.id
      and (t.name like "%${searchString}%" or ar.name like "%${searchString}%")
      order by t.name asc limit 100`,
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
      ORDER BY program_date desc
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

module.exports = searchRouter;
