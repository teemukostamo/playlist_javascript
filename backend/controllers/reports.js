const jwt = require('jsonwebtoken');
const reportsRouter = require('express').Router();
const db = require('../config/database');
const Report_Track = require('../models/Report_Track');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get report-tracks by report_id
reportsRouter.get('/:id', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    console.log('req params id at reports controller', req.params.id);
    let report = await db.query(
      `SELECT rt.sortable_rank, ar.name as artist_name, tr.name as track_title, tr.length as length,
      tr.id as track_id, ar.id as artist_id
      FROM playlist__track as tr, playlist__artist as ar, playlist__report_track as rt
      WHERE rt.report_id = ${req.params.id}
      and ar.id = tr.artist_id
      and rt.track_id = tr.id
      order by sortable_rank asc`,
      {
        type: db.QueryTypes.SELECT
      }
      // {
      //   replacements: { report_id: req.params.id },
      //   type: db.QueryTypes.SELECT
      // }
    );
    res.json(report);
  } catch (exception) {
    next(exception);
  }
});

// add a track to report-tracks list
reportsRouter.post('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    // destructure values from req.body
    let { track_id, report_id, length, sortable_rank } = req.body;
    const newReportTrack = await Report_Track.create({
      track_id,
      report_id,
      length,
      sortable_rank
    });
    res.status(201).json(newReportTrack.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = reportsRouter;
