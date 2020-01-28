const db = require('../config/database');
const Report_Track = require('../models/Report_Track');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get report-tracks by report_id
// @route   GET /:id
// @access  Private
exports.getReportTracks = asyncHandler(async (req, res, next) => {
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
  res.status(200).json(report);
});

// @desc    Add a track to report-tracks list
// @route   POST /
// @access  Private
exports.addTrackToReport = asyncHandler(async (req, res, next) => {
  let { track_id, report_id, length, sortable_rank } = req.body;
  const newReportTrack = await Report_Track.create({
    track_id,
    report_id,
    length,
    sortable_rank
  });
  res.status(201).json(newReportTrack);
});

// @desc    Delete track from report-track list
// @route   DELETE /:id
// @access  Private
exports.deleteTrackFromReport = asyncHandler(async (req, res, next) => {
  const report_track = await Report_Track.findOne({
    where: { id: req.params.id }
  });
  if (!report_track) {
    return next(
      new ErrorResponse(
        `no report_track found with the id ${req.params.id}`,
        404
      )
    );
  }
  await Report_Track.destroy({
    where: { id: req.params.id }
  });
  res.status(204).json({});
});

// @desc    Update sortable ranks
// @route   PUT /:id
// @access  Private
exports.updateSortableRanks = asyncHandler(async (req, res, next) => {
  const report_track = await Report_Track.findOne({
    where: { id: req.params.id }
  });
  if (!report_track) {
    return next(
      new ErrorResponse(
        `no report_track found with the id ${req.params.id}`,
        404
      )
    );
  }
  const updatedReportTrack = await Report_Track.update(
    {
      sortable_rank: req.body.sortable_rank
    },
    { where: { id: req.params.id } }
  );
  res.status(200).json(`${updatedReportTrack[0]} rows affected`);
});
