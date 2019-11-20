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
      `
      SELECT rt.sortable_rank
      , ar.name as artist_name
      , tr.name as track_title
      , tr.length as length
      , tr.id as track_id
      , ar.id as artist_id
      , al.id as album_id
      , al.name as album_name
      , tr.side as disc_no
      , tr.track_no
      , al.identifier as cat_id
      , tr.country
      , tr.isrc
      , al.label
      , tr.people
      , tr.record_country
      , al.year
      , rt.id as report_track_id
     FROM playlist__track as tr
     INNER JOIN playlist__artist as ar ON ar.id = tr.artist_id
     INNER JOIN playlist__report_track as rt ON rt.track_id = tr.id
     INNER JOIN playlist__album as al ON tr.album_id = al.id
     WHERE rt.report_id = ${req.params.id}
     ORDER BY sortable_rank asc
      `,
      {
        type: db.QueryTypes.SELECT
      }
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

// delete track from report-track list
reportsRouter.delete('/:id', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const deleteReportTrack = await Report_Track.destroy({
      where: { id: req.params.id }
    });
    console.log('deleted report track', deleteReportTrack);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

// update sortable ranks
reportsRouter.put('/:id', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    console.log(req.body);
    const updatedReportTrack = await Report_Track.update(
      {
        sortable_rank: req.body.sortable_rank
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json(`${updatedReportTrack[0]} rows affected`);
  } catch (exception) {
    next(exception);
  }
});

module.exports = reportsRouter;
