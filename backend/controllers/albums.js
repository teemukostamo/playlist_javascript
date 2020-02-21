const db = require('../config/database');
const Album = require('../models/Album');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get one album
// @route   GET /albumdetails/:id
// @access  Private
exports.getOneAlbum = asyncHandler(async (req, res, next) => {
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
  if (album.length === 0) {
    return next(
      new ErrorResponse(`no album found with the id ${req.params.id}`, 404)
    );
  }
  res.status(200).json(album);
});

// @desc    Get one album's tracklist & album occurrence in reports count
// @route   GET /tracklist/:id
// @access  Private
exports.getAlbumTracklist = asyncHandler(async (req, res, next) => {
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
  if (album.length === 0) {
    return next(
      new ErrorResponse(`no album found with the id ${req.params.id}`, 404)
    );
  }
  res.status(200).json(album);
});

// @desc    Update album name, label, cat_id, year or spotify_id
// @route   PUT /albumdetails/:id
// @access  Private
exports.updateAlbum = asyncHandler(async (req, res, next) => {
  const { name, label, cat_id, year, spotify_id } = req.body;
  const updatedAlbum = await Album.update(
    {
      name,
      label,
      cat_id,
      year,
      spotify_id
    },
    { where: { id: req.params.id } }
  );
  if (updatedAlbum[0] === 0) {
    return next(
      new ErrorResponse(`no artist found with the id ${req.params.id}`, 404)
    );
  }
  res.status(200).json(`${updatedAlbum[0]} row('s) affected`);
});

// @desc    Change the artist of a track
// @route   PUT /updateartist
// @access  Private
exports.changeArtist = asyncHandler(async (req, res) => {
  const { album_id, artist_id } = req.body;
  const changedArtist = await Album.update(
    {
      artist_id
    },
    { where: { id: album_id } }
  );
  res.status(200).json(`${changedArtist[0]} row(s) affected.`);
});
