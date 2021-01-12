const mysql = require('mysql');
const db = require('../config/database');
const Report_Track = require('../models/Report_Track');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get report-tracks by report_id
// @route   GET /:id
// @access  Private
exports.getReportTracks = asyncHandler(async (req, res) => {
  const id = mysql.escape(req.params.id);
  const report = await db.query(
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
     WHERE rt.report_id = ${id}
     ORDER BY sortable_rank asc
      `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  res.status(200).json(report);
});

// @desc    Add a track to report-tracks list
// @route   POST /
// @access  Private
exports.addTrackToReport = asyncHandler(async (req, res) => {
  const { track_id, report_id, length, sortable_rank } = req.body;
  const newReportTrack = await Report_Track.create({
    track_id,
    report_id,
    length,
    sortable_rank,
  });
  res.status(201).json(newReportTrack);
});

// @desc    Delete track from report-track list
// @route   DELETE /:id
// @access  Private
exports.deleteTrackFromReport = asyncHandler(async (req, res, next) => {
  const report_track = await Report_Track.findOne({
    where: { id: req.params.id },
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
    where: { id: req.params.id },
  });
  res.status(204).json({});
});

// @desc    Update sortable ranks
// @route   PUT /:id
// @access  Private
exports.updateSortableRanks = asyncHandler(async (req, res, next) => {
  const report_track = await Report_Track.findOne({
    where: { id: req.params.id },
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
      sortable_rank: req.body.sortable_rank,
    },
    { where: { id: req.params.id } }
  );
  res.status(200).json(`${updatedReportTrack[0]} rows affected`);
});

// @desc    Get 15 most recent tracklists of a program for rh site
// @route   GET /site
// @access  Public
exports.getSiteTracklist = asyncHandler(async (req, res) => {
  const programName = mysql.escape(req.query.name);

  const dateTimes = await db.query(
    `
    SELECT re.program_date
		, re.program_start_time
     FROM playlist__report as re
     INNER JOIN playlist__program as pr ON re.program_id = pr.id
     WHERE pr.name = ${programName}
     AND re.status = 1
     AND re.rerun is null
     ORDER BY re.program_date desc
     LIMIT 15
  `,
    {
      type: db.QueryTypes.SELECT,
    }
  );

  if (dateTimes.length === 0) {
    return res.status(404).json('false');
  }

  const dateArr = dateTimes.map(
    (dt) => `${dt.program_date} ${dt.program_start_time}`
  );

  let result = {};

  await Promise.all(
    dateArr.map(async (date) => {
      const tracks = await db.query(
        `
        SELECT ar.name as artist
        , tr.name as song
        , tr.spotify_id
        , rt.created_at
        , rt.sortable_rank
      FROM playlist__track as tr
      INNER JOIN playlist__artist as ar ON ar.id = tr.artist_id
      INNER JOIN playlist__report_track as rt ON rt.track_id = tr.id
      INNER JOIN playlist__report as re ON rt.report_id = re.id
      INNER JOIN playlist__album as al ON tr.album_id = al.id
      INNER JOIN playlist__program as pr ON re.program_id = pr.id
      WHERE pr.name = ${programName}
      AND re.status = 1
      AND re.program_date = "${date.substring(0, 10)}"
      ORDER BY rt.sortable_rank
      `,
        {
          type: db.QueryTypes.SELECT,
        }
      );
      result = {
        ...result,
        [date]: tracks,
      };
      return result;
    })
  );
  res.status(200).json(result);
});
