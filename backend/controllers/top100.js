const jwt = require('jsonwebtoken');
const top100Router = require('express').Router();
const db = require('../config/database');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get top100 tracks or artists
top100Router.get('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const result = await db.query(
      `
        SELECT COUNT(*) as count, rt.track_id, tr.name as track_title, al.name as album, ar.name as artist,
        al.id as album_id, ar.id as artist_id
        FROM playlist__artist as ar, playlist__album as al, playlist__track as tr, 
        playlist__report_track as rt, playlist__report as re
        WHERE re.id = rt.report_id and tr.id = rt.track_id
        and ar.id = tr.artist_id and al.id = tr.album_id
        and tr.id = rt.track_id and re.status = 1
        and re.program_date between "${req.query.start_date}" and "${req.query.end_date}"
        GROUP BY ${req.query.list}
        ORDER BY COUNT(*) DESC
        limit 100
        `,
      {
        type: db.QueryTypes.SELECT
      }
    );
    console.log(req.query.list);
    console.log(req.query.start_date);
    console.log(req.query.end_date);
    if (result) {
      res.json(result);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = top100Router;
