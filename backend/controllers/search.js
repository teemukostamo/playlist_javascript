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
searchRouter.get('/tracks/:query', async (req, res, next) => {
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
      `SELECT t.name as track_title, ar.name as artist, al.name as album, t.id as track_id,
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

module.exports = searchRouter;
