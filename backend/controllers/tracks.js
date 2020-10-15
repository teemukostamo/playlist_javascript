/* eslint-disable prefer-const */
const mysql = require('mysql');
const Track = require('../models/Track');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Report_Track = require('../models/Report_Track');
const db = require('../config/database');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get one track
// @route   GET /details/:id
// @access  Private
exports.getOneTrack = asyncHandler(async (req, res, next) => {
  const id = mysql.escape(req.params.id);
  const track = await db.query(
    `SELECT t.name as track_title
      , ar.name as artist
      , al.name as album
      , t.id as track_id
      , al.id as album_id
      , ar.id as artist_id
      , t.label as label
      , al.identifier as cat_id
      , t.length
      , t.side as disc_no
      , t.track_no
      , t.people
      , t.isrc
      , al.year
      , t.comment
      , t.record_country
      , t.country
     FROM playlist__track as t
     INNER JOIN playlist__artist as ar ON t.artist_id = ar.id
     INNER JOIN playlist__album as al ON t.album_id = al.id
     WHERE t.id = ${id}`,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  if (track.length === 0) {
    return next(
      new ErrorResponse(`no track found with the id ${req.params.id}`, 404)
    );
  }
  res.status(200).json(track);
});

// @desc    Get play history of one track
// @route   GET /history/:id
// @access  Private
exports.getPlayhistory = asyncHandler(async (req, res) => {
  const id = mysql.escape(req.params.id);
  const track = await db.query(
    `
      SELECT pr.name as program_name
      , pr.id as program_id
      , re.id as report_id
      , re.program_date
      , rt.track_id
      FROM playlist__program as pr
      INNER JOIN playlist__report as re ON re.program_id = pr.id
      INNER JOIN playlist__report_track as rt ON rt.report_id = re.id
      WHERE rt.track_id = ${id}
      GROUP BY re.id
      ORDER BY program_date desc
      `,
    {
      type: db.QueryTypes.SELECT,
    }
  );
  // if (track.length === 0) {
  //   return next(
  //     new ErrorResponse(`no track found with the id ${req.params.id}`, 404)
  //   );
  // }
  if (track.length === 0) {
    res.status(200).json([{ result: 'No plays yet' }]);
  }
  res.status(200).json(track);
});

// @desc    Change the album of a track
// @route   PUT /updatealbum
// @access  Private
exports.changeAlbum = asyncHandler(async (req, res) => {
  const { track_id, album_id } = req.body;
  const changedAlbum = await Track.update(
    {
      album_id,
    },
    { where: { id: track_id } }
  );
  res.status(200).json(`${changedAlbum[0]} row(s) affected.`);
});

// @desc    Change the artist of a track
// @route   PUT /updateartist
// @access  Private
exports.changeArtist = asyncHandler(async (req, res) => {
  const { track_id, artist_id } = req.body;
  const changedArtist = await Track.update(
    {
      artist_id,
    },
    { where: { id: track_id } }
  );
  res.status(200).json(`${changedArtist[0]} row(s) affected.`);
});

// @desc    Update track, album, artist
// @route   PUT /
// @access  Private
exports.updateTrack = asyncHandler(async (req, res) => {
  const {
    artist_name,
    album_name,
    track_title,
    track_id,
    length,
    country,
    record_country,
    people,
    disc_no,
    track_no,
    year,
    label,
    cat_id,
    isrc,
    comment,
    user_id,
    artist_id,
    album_id,
    sortable_rank,
    report_track_id,
  } = req.body;

  const trackToUpDate = await Track.update(
    {
      name: track_title,
      length,
      country,
      record_country,
      people,
      side: disc_no,
      track_no,
      label,
      isrc,
      comment,
      user_id,
    },
    { where: { id: track_id } }
  );
  const albumToUpdate = await Album.update(
    {
      name: album_name,
      identifier: cat_id,
      year: year.toString(),
      user_id,
    },
    { where: { id: album_id } }
  );
  const artistToUpdate = await Artist.update(
    {
      name: artist_name,
      user_id,
    },
    { where: { id: artist_id } }
  );
  const updatedTrack = {
    artist_name,
    album_name,
    track_title,
    track_id,
    length,
    country,
    record_country,
    people,
    disc_no,
    track_no,
    year,
    label,
    cat_id,
    isrc,
    comment,
    user_id,
    artist_id,
    album_id,
    sortable_rank,
    report_track_id,
  };
  console.log('updated track info', trackToUpDate);
  console.log('updated album info', albumToUpdate);
  console.log('updated artist info', artistToUpdate);
  res.status(200).json(updatedTrack);
});

// @desc    Save new track and add it to current report
// @route   POST /addandreport
// @access  Private
exports.addAndReport = asyncHandler(async (req, res) => {
  // destructure values from req.body
  const {
    track_title,
    artist_name,
    album_name,
    label,
    cat_id,
    year,
    disc_no,
    track_no,
    length,
    country,
    record_country,
    people,
    comment,
    isrc,
    report_id,
    user_id,
    sortable_rank,
  } = req.body;

  // see if artist exists
  const artist = await Artist.findOne({ where: { name: artist_name } });

  if (!artist) {
    // create new artist
    const newArtist = await Artist.create({
      name: artist_name,
    });
    console.log('created new artist', newArtist);
    // create new album
    const newAlbum = await Album.create({
      name: album_name,
      artist_id: newArtist.id,
      identifier: cat_id,
      label,
      year: year.toString(),
    });
    console.log('created new album', newAlbum);

    // create new track
    const newTrack = await Track.create({
      artist_id: newArtist.id,
      album_id: newAlbum.id,
      identifier: cat_id,
      label,
      name: track_title,
      disc_no,
      track_no,
      length,
      country,
      record_country,
      people,
      comment,
      user_id,
      isrc,
    });
    console.log('created new track', newTrack);

    // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
    const newReportTrack = await Report_Track.create({
      track_id: newTrack.id,
      report_id,
      length: newTrack.length,
      sortable_rank,
    });
    const trackToReturn = {
      id: newTrack.id,
      artist_id: newTrack.artist_id,
      album_id: newTrack.album_id,
      track_title: newTrack.name,
      artist_name,
      album_name,
      label,
      cat_id,
      year,
      disc_no,
      track_no,
      length,
      country: newTrack.country,
      record_country,
      sortable_rank,
      people: newTrack.people,
      comment,
      isrc,
      report_id,
      report_track_id: newReportTrack.id,
      user_id: newTrack.user_id,
      spotify_id: newTrack.spotify_id,
    };
    console.log('adding to report track', newReportTrack);
    console.log('track to return', trackToReturn);
    res.status(201).json(trackToReturn);
  } else if (artist) {
    // see if album exists
    const album = await Album.findOne({
      where: { artist_id: artist.id, name: album_name },
    });
    if (!album) {
      // create new album
      const newAlbum = await Album.create({
        name: album_name,
        artist_id: artist.id,
        identifier: cat_id,
        label,
        year: year.toString(),
      });
      console.log('created new album', newAlbum);

      // create new track
      const newTrack = await Track.create({
        artist_id: artist.id,
        album_id: newAlbum.id,
        identifier: cat_id,
        label,
        name: track_title,
        disc_no,
        track_no,
        length,
        country,
        record_country,
        people,
        comment,
        isrc,
        user_id,
      });
      console.log('created new track', newTrack);

      // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
      const newReportTrack = await Report_Track.create({
        track_id: newTrack.id,
        report_id,
        length: newTrack.length,
        sortable_rank,
      });
      console.log('created new report-track', newReportTrack);
      const trackToReturn = {
        id: newTrack.id,
        artist_id: newTrack.artist_id,
        album_id: newTrack.album_id,
        track_title: newTrack.name,
        artist_name,
        album_name,
        label,
        cat_id,
        year,
        disc_no,
        track_no,
        length,
        country: newTrack.country,
        record_country,
        sortable_rank,
        people: newTrack.people,
        comment,
        isrc,
        report_id,
        report_track_id: newReportTrack.id,
        user_id: newTrack.user_id,
        spotify_id: newTrack.spotify_id,
      };
      console.log('track to return', trackToReturn);
      res.status(201).json(trackToReturn);
    } else {
      // see if track exists
      const track = await Track.findOne({
        where: { artist_id: artist.id, album_id: album.id, name: track_title },
      });

      if (track) {
        // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
        const newReportTrack = await Report_Track.create({
          track_id: track.id,
          report_id,
          length: track.length,
          sortable_rank,
        });
        console.log('created new report track', newReportTrack);

        const trackToReturn = {
          id: track.id,
          artist_id: track.artist_id,
          album_id: track.album_id,
          track_title: track.name,
          artist_name,
          album_name,
          label,
          cat_id,
          year,
          disc_no,
          track_no,
          length,
          country: track.country,
          record_country,
          sortable_rank,
          people: track.people,
          comment,
          isrc,
          report_id,
          report_track_id: newReportTrack.id,
          user_id: track.user_id,
          spotify_id: track.spotify_id,
        };
        console.log('track to return', trackToReturn);
        return res.status(200).json(trackToReturn);
      }

      // create new track
      const newTrack = await Track.create({
        artist_id: artist.id,
        album_id: album.id,
        identifier: cat_id,
        label,
        name: track_title,
        disc_no,
        track_no,
        length,
        country,
        record_country,
        people,
        comment,
        user_id,
        isrc,
      });
      console.log('created new track', newTrack);

      // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
      const newReportTrack = await Report_Track.create({
        track_id: newTrack.id,
        report_id,
        length: newTrack.length,
        sortable_rank,
      });

      console.log('new report-track', newReportTrack);
      const trackToReturn = {
        id: newTrack.id,
        artist_id: newTrack.artist_id,
        album_id: newTrack.album_id,
        track_title: newTrack.name,
        artist_name,
        album_name,
        label,
        cat_id,
        year,
        disc_no,
        track_no,
        length,
        country: newTrack.country,
        record_country,
        sortable_rank,
        people: newTrack.people,
        comment,
        isrc,
        report_id,
        report_track_id: newReportTrack.id,
        user_id: newTrack.user_id,
        spotify_id: newTrack.spotify_id,
      };
      console.log('track to return', trackToReturn);
      res.status(201).json(trackToReturn);
    }
  }
});

// @desc    Add new track to db
// @route   POST /addtodb
// @access  Private
exports.addNewTrack = asyncHandler(async (req, res) => {
  // destructure values from req.body
  const {
    track_title,
    artist_name,
    album_name,
    label,
    cat_id,
    year,
    disc_no,
    track_no,
    length,
    country,
    record_country,
    people,
    comment,
    isrc,
    user_id,
  } = req.body;

  // see if artist exists
  const artist = await Artist.findOne({ where: { name: artist_name } });
  // uudet artistit crashaa siihen et ao id

  if (!artist) {
    // create new artist
    const newArtist = await Artist.create({
      name: artist_name,
    });
    console.log('created new artist', newArtist);
    // create new album
    const newAlbum = await Album.create({
      name: album_name,
      artist_id: newArtist.id,
      identifier: cat_id,
      label,
      year: year.toString(),
    });
    console.log('created new album', newAlbum);

    // create new track
    const newTrack = await Track.create({
      artist_id: newArtist.id,
      album_id: newAlbum.id,
      identifier: cat_id,
      label,
      name: track_title,
      disc_no,
      track_no,
      length,
      country,
      record_country,
      people,
      comment,
      user_id,
      isrc,
    });
    console.log('created new track', newTrack);

    const trackToReturn = {
      id: newTrack.id,
      artist_id: newTrack.artist_id,
      album_id: newTrack.album_id,
      track_title: newTrack.name,
      artist_name,
      album_name,
      label,
      cat_id,
      year,
      disc_no,
      track_no,
      length,
      country: newTrack.country,
      record_country,
      people: newTrack.people,
      comment,
      isrc,
      user_id: newTrack.user_id,
      spotify_id: newTrack.spotify_id,
    };
    console.log('track to return', trackToReturn);
    res.status(201).json(trackToReturn);
  } else if (artist) {
    // see if album exists
    const album = await Album.findOne({
      where: { artist_id: artist.id, name: album_name },
    });
    if (!album) {
      // create new album
      const newAlbum = await Album.create({
        name: album_name,
        artist_id: artist.id,
        identifier: cat_id,
        label,
        year: year.toString(),
      });
      console.log('created new album', newAlbum);

      // create new track
      const newTrack = await Track.create({
        artist_id: artist.id,
        album_id: newAlbum.id,
        identifier: cat_id,
        label,
        name: track_title,
        disc_no,
        track_no,
        length,
        country,
        record_country,
        people,
        comment,
        isrc,
        user_id,
      });
      console.log('created new track', newTrack);

      const trackToReturn = {
        id: newTrack.id,
        artist_id: newTrack.artist_id,
        album_id: newTrack.album_id,
        track_title: newTrack.name,
        artist_name,
        album_name,
        label,
        cat_id,
        year,
        disc_no,
        track_no,
        length,
        country: newTrack.country,
        record_country,
        people: newTrack.people,
        comment,
        isrc,
        user_id: newTrack.user_id,
        spotify_id: newTrack.spotify_id,
      };
      console.log('track to return', trackToReturn);
      res.status(201).json(trackToReturn);
    } else {
      // see if track exists
      const track = await Track.findOne({
        where: { artist_id: artist.id, album_id: album.id, name: track_title },
      });
      console.log(track);
      if (track) {
        const trackToReturn = {
          id: track.id,
          artist_id: track.artist_id,
          album_id: track.album_id,
          track_title: track.name,
          artist_name,
          album_name,
          label,
          cat_id,
          year,
          disc_no,
          track_no,
          length,
          country: track.country,
          record_country,
          people: track.people,
          comment,
          isrc,
          user_id: track.user_id,
          spotify_id: track.spotify_id,
        };
        console.log('track to return', trackToReturn);
        return res.status(200).json(trackToReturn);
      }
      // create new track
      const newTrack = await Track.create({
        artist_id: artist.id,
        album_id: album.id,
        identifier: cat_id,
        label,
        name: track_title,
        disc_no,
        track_no,
        length,
        country,
        record_country,
        people,
        comment,
        user_id,
        isrc,
      });
      console.log('created new track', newTrack);

      const trackToReturn = {
        id: newTrack.id,
        artist_id: newTrack.artist_id,
        album_id: newTrack.album_id,
        track_title: newTrack.name,
        artist_name,
        album_name,
        label,
        cat_id,
        year,
        disc_no,
        track_no,
        length,
        country: newTrack.country,
        record_country,
        people: newTrack.people,
        comment,
        isrc,
        user_id: newTrack.user_id,
        spotify_id: newTrack.spotify_id,
      };
      console.log('track to return', trackToReturn);
      res.status(201).json(trackToReturn);
    }
  }
});

// @desc    Check if tracks fetched from djonline exist in db. Add new tracks to db and all to current report
// @route   POST /djonline
// @access  Private
exports.addDjonlineTracks = asyncHandler(async (req, res) => {
  // destructure values from req.body
  let {
    // eslint-disable-next-line prefer-const
    track_title,
    artist_name,
    album_name,
    label,
    cat_id,
    year,
    disc_no,
    track_no,
    length,
    country,
    record_country,
    sortable_rank,
    people,
    comment,
    isrc,
    report_id,
  } = req.body;

  // see if artist name ends with , the
  const lastFive = artist_name.slice(artist_name.length - 5);
  if (lastFive.toLowerCase() === ', the') {
    artist_name = artist_name.substring(0, artist_name.length - 5);
    artist_name = `THE ${artist_name.toUpperCase()}`;
  } else {
    artist_name = artist_name.toUpperCase();
  }
  if (record_country === '') {
    record_country = null;
  }

  // see if artist exists
  // const artist = await Artist.findOne({ where: { name: artist_name } });
  const artist = await Artist.findOne({
    where: db.where(
      db.fn('lower', db.col('name')),
      db.fn('lower', artist_name.toLowerCase())
    ),
  });

  console.log('add djonline tracks artist', artist);
  // uudet artistit crashaa siihen et ao id

  if (!artist) {
    // create new artist
    const newArtist = await Artist.create({
      name: artist_name,
    });
    console.log('created new artist', newArtist);
    // create new album
    const newAlbum = await Album.create({
      name: album_name,
      artist_id: newArtist.id,
      identifier: cat_id,
      label,
      year: year.toString(),
    });
    console.log('created new album', newAlbum);

    // create new track
    const newTrack = await Track.create({
      artist_id: newArtist.id,
      album_id: newAlbum.id,
      identifier: cat_id,
      label,
      name: track_title,
      disc_no,
      track_no,
      length,
      country,
      record_country,
      people,
      comment,
      isrc,
    });
    console.log('created new track', newTrack);

    // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
    const newReportTrack = await Report_Track.create({
      track_id: newTrack.id,
      report_id,
      length: newTrack.length,
      sortable_rank,
    });
    const trackToReturn = {
      id: newTrack.id,
      artist_id: newTrack.artist_id,
      album_id: newTrack.album_id,
      track_title: newTrack.name,
      artist_name,
      album_name,
      label,
      cat_id,
      year,
      disc_no,
      track_no,
      length,
      country: newTrack.country,
      record_country,
      sortable_rank,
      people: newTrack.people,
      comment,
      isrc,
      report_id,
      report_track_id: newReportTrack.id,
      user_id: newTrack.user_id,
      spotify_id: newTrack.spotify_id,
    };
    console.log('adding to report track', newReportTrack);
    console.log('track to return', trackToReturn);
    res.status(201).json(trackToReturn);
  } else if (artist) {
    // see if album exists
    // const album = await Album.findOne({
    //   where: { artist_id: artist.id, name: album_name }
    // });
    const album = await Album.findOne({
      where: {
        artist_id: artist.id,
        $col: db.where(
          db.fn('lower', db.col('name')),
          db.fn('lower', album_name.toLowerCase())
        ),
      },
    });
    console.log('add djonline tracks album', album);

    if (!album) {
      // create new album
      const newAlbum = await Album.create({
        name: album_name,
        artist_id: artist.id,
        identifier: cat_id,
        label,
        year: year.toString(),
      });
      console.log('created new album', newAlbum);

      // create new track
      const newTrack = await Track.create({
        artist_id: artist.id,
        album_id: newAlbum.id,
        identifier: cat_id,
        label,
        name: track_title,
        disc_no,
        track_no,
        length,
        country,
        record_country,
        people,
        comment,
        isrc,
      });
      console.log('created new track', newTrack);

      // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
      const newReportTrack = await Report_Track.create({
        track_id: newTrack.id,
        report_id,
        length: newTrack.length,
        sortable_rank,
      });
      console.log('created new report-track', newReportTrack);
      const trackToReturn = {
        id: newTrack.id,
        artist_id: newTrack.artist_id,
        album_id: newTrack.album_id,
        track_title: newTrack.name,
        artist_name,
        album_name,
        label,
        cat_id,
        year,
        disc_no,
        track_no,
        length,
        country: newTrack.country,
        record_country,
        sortable_rank,
        people: newTrack.people,
        comment,
        isrc,
        report_id,
        report_track_id: newReportTrack.id,
        user_id: newTrack.user_id,
        spotify_id: newTrack.spotify_id,
      };
      console.log('track to return', trackToReturn);
      res.status(201).json(trackToReturn);
    } else {
      // see if track exists
      // const track = await Track.findOne({
      //   where: { artist_id: artist.id, album_id: album.id, name: track_title }
      // });
      const track = await Track.findOne({
        where: {
          artist_id: artist.id,
          album_id: album.id,
          $col: db.where(
            db.fn('lower', db.col('name')),
            db.fn('lower', track_title.toLowerCase())
          ),
        },
      });
      console.log('add djonline tracks track', track);

      if (track) {
        // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
        const newReportTrack = await Report_Track.create({
          track_id: track.id,
          report_id,
          length: track.length,
          sortable_rank,
        });
        console.log('created new report track', newReportTrack);

        const trackToReturn = {
          id: track.id,
          artist_id: track.artist_id,
          album_id: track.album_id,
          track_title: track.name,
          artist_name,
          album_name,
          label,
          cat_id,
          year,
          disc_no,
          track_no,
          length,
          country: track.country,
          record_country,
          sortable_rank,
          people: track.people,
          comment,
          isrc,
          report_id,
          report_track_id: newReportTrack.id,
          user_id: track.user_id,
          spotify_id: track.spotify_id,
        };
        console.log('track to return', trackToReturn);
        return res.status(200).json(trackToReturn);
      }
      // create new track
      const newTrack = await Track.create({
        artist_id: artist.id,
        album_id: album.id,
        identifier: cat_id,
        label,
        name: track_title,
        disc_no,
        track_no,
        length,
        country,
        record_country,
        people,
        comment,
        isrc,
      });
      console.log('created new track', newTrack);

      // täs kohtaa lisää biisi report-träkkiin raportti-idn kans
      const newReportTrack = await Report_Track.create({
        track_id: newTrack.id,
        report_id,
        length: newTrack.length,
        sortable_rank,
      });

      console.log('new report-track', newReportTrack);
      const trackToReturn = {
        id: newTrack.id,
        artist_id: newTrack.artist_id,
        album_id: newTrack.album_id,
        track_title: newTrack.name,
        artist_name,
        album_name,
        label,
        cat_id,
        year,
        disc_no,
        track_no,
        length,
        country: newTrack.country,
        record_country,
        sortable_rank,
        people: newTrack.people,
        comment,
        isrc,
        report_id,
        report_track_id: newReportTrack.id,
        user_id: newTrack.user_id,
        spotify_id: newTrack.spotify_id,
      };
      console.log('track to return', trackToReturn);
      res.status(201).json(trackToReturn);
    }
  }
});

// @desc    Add track to an existing album
// @route   POST /addtracktoalbum
// @access  Private
exports.addTrackToAlbum = asyncHandler(async (req, res) => {
  const {
    track_title,
    artist_name,
    artist_id,
    album_id,
    cat_id,
    label,
    disc_no,
    track_no,
    length,
    country,
    record_country,
    people,
    comment,
    isrc,
    year,
    user_id,
  } = req.body;

  let stringifiedYear;
  if (year === null) {
    stringifiedYear = null;
  } else {
    stringifiedYear = year.toString();
  }

  const newTrack = await Track.create({
    artist_id,
    album_id,
    name: track_title,
    identifier: cat_id,
    label,
    side: disc_no,
    track_no,
    length,
    people,
    year: stringifiedYear,
    comment,
    record_country,
    country,
    isrc,
    user_id,
  });
  const trackToReturn = {
    track_id: newTrack.id,
    isrc,
    disc_no,
    track_no,
    track_title,
    artist_name,
    report_occurrence: 0,
  };
  res.status(201).json(trackToReturn);
});
