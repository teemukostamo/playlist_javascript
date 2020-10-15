/* eslint-disable indent */
const mysql = require('mysql');
const db = require('../config/database');

const Track = require('../models/Track');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Report_Track = require('../models/Report_Track');

const asyncHandler = require('../middleware/async');

// @desc    Get results for autocomplete search
// @route   GET autocomplete/:query
// @access  Private
exports.autocompleteResults = asyncHandler(async (req, res) => {
  // eslint-disable-next-line
  const searchString = req.params.query.replace(/'/g, "\\'");
  if (searchString.length < 3) {
    return res.status(400).json({ error: 'query too short' });
  }
  const escapeSearchString = mysql.escape(`%${searchString}%`);
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
     WHERE (t.name like ${escapeSearchString} or ar.name like ${escapeSearchString})
     ORDER BY t.name ASC 
     LIMIT 100
      `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  res.status(200).json(results);
});

// @desc    Get advanced search results
// @route   GET /advanced
// @access  Private
exports.advancedResults = asyncHandler(async (req, res) => {
  const { kind, query } = req.query;
  // eslint-disable-next-line quotes
  const searchString = query.replace(/'/g, "\\'");
  if (searchString.length < 3) {
    return res.status(400).json({ error: 'query too short' });
  }
  const escapeSearchString = mysql.escape(`%${searchString}%`);
  let escapedKind;
  switch (kind) {
    case 'al':
      escapedKind = 'al';
      break;
    case 'ar':
      escapedKind = 'ar';
      break;
    case 'tr':
      escapedKind = 'tr';
      break;
    default:
      escapedKind = '';
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
      WHERE ${escapedKind}.name like ${escapeSearchString}
      GROUP BY tr.id
      ORDER BY track_title asc
      LIMIT 1000
      `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  res.status(200).json(results);
});

// @desc    Merge tracks, albums or artists
// @route   PUT /advanced
// @access  Private
exports.merge = asyncHandler(async (req, res) => {
  const { type, merge, mergeTo } = req.body;

  if (type === 'track') {
    let transaction;
    try {
      transaction = await db.transaction();
      await Report_Track.update(
        {
          track_id: mergeTo,
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
          album_id: mergeTo,
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
          artist_id: mergeTo,
        },
        { where: { artist_id: merge } }
      );
      await Track.update(
        {
          artist_id: mergeTo,
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
});

// @desc    Get change artist options
// @route   GET /changeartist/:query
// @access  Private
exports.changeArtistOptions = asyncHandler(async (req, res) => {
  const query = mysql.escape(`%${req.params.query}%`);
  const results = await db.query(
    `
    SELECT name as artist_name, id as artist_id
    FROM playlist__artist
    WHERE name like ${query}
    `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  res.status(200).json(results);
});

// @desc    Get change album options
// @route   GET /changealbum/:query
// @access  Private
exports.changeAlbumOptions = asyncHandler(async (req, res) => {
  const query = mysql.escape(`%${req.params.query}%`);

  const results = await db.query(
    `
    SELECT al.name as album_name, al.id as album_id, al.identifier as cat_id, ar.name as artist_name
    FROM playlist__album as al
    INNER JOIN playlist__artist as ar ON al.artist_id = ar.id
    WHERE al.name like ${query}
    ORDER BY album_name asc
    `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  res.status(200).json(results);
});
