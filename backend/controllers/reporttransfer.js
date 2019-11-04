const jwt = require('jsonwebtoken');
const reportTransferRouter = require('express').Router();
const Report_Transfer = require('../models/Report_Transfer');
const path = require('path');
var fs = require('fs');
const db = require('../config/database');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// get all transfers
reportTransferRouter.get('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const transfers = await db.query(
      'SELECT rt.id, rt.user_id, us.username, us.first_name, us.last_name, rt.status, rt.filename, rt.period, rt.created_at, rt.updated_at FROM playlist__report_transfer as rt, playlist__user as us WHERE rt.user_id = us.id order by created_at desc',
      {
        type: db.QueryTypes.SELECT
      }
    );
    res.json(transfers);
  } catch (exception) {
    next(exception);
  }
});

// send file to client by filename
reportTransferRouter.get('/:filename', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    console.log('got download request for ', req.params.filename);
    res.download(path.join(__dirname, `../transfers/${req.params.filename}`));
  } catch (exception) {
    next(exception);
  }
});

// add a new transfer -get tracks from db, parse to teosto-required format and create txt-file
// generate report transfer by date
reportTransferRouter.post('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    let { user_id, status, filename, period } = req.body;
    const arrayWithTracks = await db.query(
      `SELECT re.program_date, re.program_start_time, re.program_end_time,
    pr.name as program_name, ar.name as artist_name, tr.name as track_title,
    tr.length, tr.people as copyright_holders, tr.country, tr.record_country, al.label,
    al.identifier as cat_id, tr.isrc, tr.side as disc_no, tr.track_no, al.year
    FROM playlist__report as re, playlist__program as pr, playlist__artist as ar,
    playlist__report_track as rt, playlist__track as tr, playlist__album as al
    WHERE re.program_id = pr.id
    and rt.track_id = tr.id
    and rt.report_id = re.id
    and tr.artist_id = ar.id
    and al.artist_id = ar.id
    and tr.album_id = al.id
    and re.status = 1
    and re.program_date like "${period}%"
    order by program_date asc, program_start_time asc
    limit 30000`,
      {
        type: db.QueryTypes.SELECT
      }
    );
    if (arrayWithTracks) {
      // console.log('tracks to put in report', arrayWithTracks);
      let placeholder = {
        track_title: '                                                  ',
        copyright_holder_1: '                              ',
        copyright_holder_2: '                              ',
        copyright_holder_3: '                              ',
        copyright_holder_4: '                              ',
        copyright_holder_5: '                              ',
        artist_name: '                         ',
        label: '                    ',
        cat_id: '               ',
        program_name:
          '                                                               ',
        isrc: '            ',
        comment:
          '                                                                               '
      };
      let newArr = [];

      arrayWithTracks.forEach(track => {
        // get program date, remove dashes and two first numbers
        let new_program_date = track.program_date
          .replace(/-/g, '')
          .substring(2);
        // console.log('new program date', new_program_date);
        // console.log('new program date length', new_program_date.length);

        // get program start and end time, remove colons and replace last zeroes with two spaces
        let new_program_start_time =
          track.program_start_time.replace(/:/g, '').slice(0, -2) + '  ';
        // console.log('new program start time', new_program_start_time);
        // console.log('new program start time length', new_program_start_time.length);
        let new_programm_end_time =
          track.program_end_time.replace(/:/g, '').slice(0, -2) + '  ';
        // console.log('new program end time', new_programm_end_time);
        // console.log('new program end time length', new_programm_end_time.length);

        // get track title, remove track name length from placeholder, then add to remaining placeholder
        let track_title_maxlength = 50;
        let new_track_title =
          track.track_title.toUpperCase() +
          placeholder.track_title.substring(track.track_title.length);
        new_track_title = new_track_title.substring(0, track_title_maxlength);
        // console.log('new track title', new_track_title);
        // console.log('new track title length', new_track_title.length);

        // get length, add zero to beginning if necessary
        let minutes = Math.floor(track.length / 60);
        let seconds = track.length % 60;
        if (minutes.toString().length === 1) {
          minutes = `0${minutes.toString()}`;
        } else {
          minutes = minutes.toString();
        }
        if (seconds.toString().length === 1) {
          seconds = `0${seconds.toString()}`;
        } else {
          seconds = seconds.toString();
        }
        let new_length = minutes + seconds;
        // console.log('new length', new_length);
        // console.log('new length length', new_length.length);

        // get country - FI=1, else = ' '
        let new_country;
        if (track.country === 1) {
          new_country = 1;
        } else {
          new_country = ' ';
        }
        // console.log('new country', new_country);
        // console.log('new country length', new_country.length);

        // get artist name
        let artist_maxlength = 25;
        let new_artist_name =
          track.artist_name.toUpperCase() +
          placeholder.artist_name.substring(track.artist_name.length);

        new_artist_name = new_artist_name.substring(0, artist_maxlength);

        // console.log('new artist name', new_artist_name);
        // console.log('new artist name length', new_artist_name.length);

        // get label
        let label_maxlength = 20;
        let new_label;
        if (track.label === null) {
          new_label = placeholder.label;
        } else {
          new_label =
            track.label.toUpperCase() +
            placeholder.label.substring(track.label.length);
          new_label = new_label.substring(0, label_maxlength);
        }
        // console.log('new label', new_label);
        // console.log('new label length', new_label.length);

        // get cat id
        let cat_id_maxlength = 15;
        let new_cat_id;
        if (track.cat_id === null) {
          let unknown = 'EI ILMOITETTU';
          new_cat_id = unknown + placeholder.cat_id.substring(unknown.length);
        } else {
          new_cat_id =
            track.cat_id.toUpperCase() +
            placeholder.cat_id.substring(track.cat_id.length);
          new_cat_id = new_cat_id.substring(0, cat_id_maxlength);
        }
        // console.log('new cat_id', new_cat_id);
        // console.log('new cat_id length', new_cat_id.length);

        // get disc no
        let new_disc_no;
        if (track.disc_no === null) {
          new_disc_no = ' ';
        } else {
          new_disc_no = track.disc_no.toString();
        }

        // console.log('new disc no', new_disc_no);
        // console.log('new disc no length', new_disc_no.length);

        // get track no
        let new_track_no;
        if (track.track_no === null) {
          new_track_no = '  ';
        } else if (track.track_no.toString().length === 1) {
          new_track_no = ` ${track.track_no.toString()}`;
        } else {
          new_track_no = track.track_no.toString();
        }
        // console.log('new track no', new_track_no);
        // console.log('new track no length', new_track_no.length);
        // console.log('new track no typeof', typeof new_track_no);

        // get record country
        let new_record_country;
        if (track.record_country === null) {
          new_record_country = '   ';
        } else {
          new_record_country = track.record_country + ' ';
        }

        // console.log('new record country', new_record_country);
        // console.log('new record country length', new_record_country.length);
        // console.log('new record country typeof', typeof new_record_country);

        // get program name
        let program_name_maxlength = 63;
        let new_program_name =
          track.program_name.toUpperCase() +
          placeholder.program_name.substring(track.program_name.length);
        new_program_name = new_program_name.substring(
          0,
          program_name_maxlength
        );
        // console.log('new program name', new_program_name);
        // console.log('new program name length', new_program_name.length);

        // get year
        let new_year;
        // console.log(typeof track.year);
        if (track.year === null) {
          new_year = '    ';
        } else {
          new_year = track.year.substring(0, 4);
        }

        // console.log('new year', new_year);
        // console.log('new year length', new_year.length);

        // get isrc
        let isrc_maxlength = 12;
        let new_isrc;
        if (track.isrc === null) {
          new_isrc = placeholder.isrc;
        } else {
          new_isrc =
            track.isrc.toUpperCase() +
            placeholder.isrc.substring(track.isrc.length);
          new_isrc = new_isrc.substring(0, isrc_maxlength);
        }
        // console.log('new isrc', new_isrc);
        // console.log('new isrc length', new_isrc.length);

        // handle copyright holders
        let copyright_holder_maxlength = 30;
        let new_copyright_holder_1;
        let new_copyright_holder_2;
        let new_copyright_holder_3;
        let new_copyright_holder_4;
        let new_copyright_holder_5;
        // if copyright holders is null insert placeholder values to array, else parse through values
        if (track.copyright_holders === null) {
          new_copyright_holder_1 = placeholder.copyright_holder_1;
          new_copyright_holder_2 = placeholder.copyright_holder_2;
          new_copyright_holder_3 = placeholder.copyright_holder_3;
          new_copyright_holder_4 = placeholder.copyright_holder_4;
          new_copyright_holder_5 = placeholder.copyright_holder_5;
        } else {
          let new_copyright_holders = track.copyright_holders.split('|');
          new_copyright_holders.pop();
          new_copyright_holders.shift();
          if (new_copyright_holders.length === 1) {
            new_copyright_holder_1 =
              new_copyright_holders[0].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_1.substring(
                new_copyright_holders[0].slice(1, -1).length
              );
            new_copyright_holder_1 = new_copyright_holder_1.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_2 = placeholder.copyright_holder_2;
            new_copyright_holder_3 = placeholder.copyright_holder_3;
            new_copyright_holder_4 = placeholder.copyright_holder_4;
            new_copyright_holder_5 = placeholder.copyright_holder_5;
          } else if (new_copyright_holders.length === 2) {
            new_copyright_holder_1 =
              new_copyright_holders[0].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_1.substring(
                new_copyright_holders[0].slice(1, -1).length
              );
            new_copyright_holder_1 = new_copyright_holder_1.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_2 =
              new_copyright_holders[1].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_1.substring(
                new_copyright_holders[1].slice(1, -1).length
              );
            new_copyright_holder_2 = new_copyright_holder_2.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_3 = placeholder.copyright_holder_3;
            new_copyright_holder_4 = placeholder.copyright_holder_4;
            new_copyright_holder_5 = placeholder.copyright_holder_5;
          } else if (new_copyright_holders.length === 3) {
            new_copyright_holder_1 =
              new_copyright_holders[0].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_1.substring(
                new_copyright_holders[0].slice(1, -1).length
              );
            new_copyright_holder_1 = new_copyright_holder_1.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_2 =
              new_copyright_holders[1].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_2.substring(
                new_copyright_holders[1].slice(1, -1).length
              );
            new_copyright_holder_2 = new_copyright_holder_2.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_3 =
              new_copyright_holders[2].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_3.substring(
                new_copyright_holders[2].slice(1, -1).length
              );
            new_copyright_holder_3 = new_copyright_holder_3.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_4 = placeholder.copyright_holder_4;
            new_copyright_holder_5 = placeholder.copyright_holder_5;
          } else if (new_copyright_holders.length === 4) {
            new_copyright_holder_1 =
              new_copyright_holders[0].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_1.substring(
                new_copyright_holders[0].slice(1, -1).length
              );
            new_copyright_holder_1 = new_copyright_holder_1.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_2 =
              new_copyright_holders[1].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_2.substring(
                new_copyright_holders[1].slice(1, -1).length
              );
            new_copyright_holder_2 = new_copyright_holder_2.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_3 =
              new_copyright_holders[2].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_3.substring(
                new_copyright_holders[2].slice(1, -1).length
              );
            new_copyright_holder_3 = new_copyright_holder_3.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_4 =
              new_copyright_holders[3].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_4.substring(
                new_copyright_holders[3].slice(1, -1).length
              );
            new_copyright_holder_4 = new_copyright_holder_4.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_5 = placeholder.copyright_holder_5;
          } else if (new_copyright_holders.length === 5) {
            new_copyright_holder_1 =
              new_copyright_holders[0].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_1.substring(
                new_copyright_holders[0].slice(1, -1).length
              );
            new_copyright_holder_1 = new_copyright_holder_1.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_2 =
              new_copyright_holders[1].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_2.substring(
                new_copyright_holders[1].slice(1, -1).length
              );
            new_copyright_holder_2 = new_copyright_holder_2.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_3 =
              new_copyright_holders[2].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_3.substring(
                new_copyright_holders[2].slice(1, -1).length
              );
            new_copyright_holder_3 = new_copyright_holder_3.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_4 =
              new_copyright_holders[3].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_4.substring(
                new_copyright_holders[3].slice(1, -1).length
              );
            new_copyright_holder_4 = new_copyright_holder_4.substring(
              0,
              copyright_holder_maxlength
            );
            new_copyright_holder_5 =
              new_copyright_holders[4].slice(1, -1).toUpperCase() +
              placeholder.copyright_holder_5.substring(
                new_copyright_holders[4].slice(1, -1).length
              );
            new_copyright_holder_5 = new_copyright_holder_5.substring(
              0,
              copyright_holder_maxlength
            );
          } else {
            new_copyright_holder_1 = placeholder.copyright_holder_1;
            new_copyright_holder_2 = placeholder.copyright_holder_2;
            new_copyright_holder_3 = placeholder.copyright_holder_3;
            new_copyright_holder_4 = placeholder.copyright_holder_4;
            new_copyright_holder_5 = placeholder.copyright_holder_5;
          }
        }
        // console.log('new copyright holder 1', new_copyright_holder_1);
        // console.log('new copyright holder 1 length', new_copyright_holder_1.length);
        // console.log('new copyright holder 2', new_copyright_holder_2);
        // console.log('new copyright holder 2 length', new_copyright_holder_2.length);
        // console.log('new copyright holder 3', new_copyright_holder_3);
        // console.log('new copyright holder 3 length', new_copyright_holder_3.length);
        // console.log('new copyright holder 4', new_copyright_holder_4);
        // console.log('new copyright holder 4 length', new_copyright_holder_4.length);
        // console.log('new copyright holder 5', new_copyright_holder_5);
        // console.log('new copyright holder 5 length', new_copyright_holder_5.length);

        newArr.push({
          program_date: new_program_date,
          program_start_time: new_program_start_time,
          program_end_time: new_programm_end_time,
          teosto_id: '2592',
          track_title: new_track_title,
          helper_field: '00',
          length: new_length,
          times: '0001',
          copyright_holder_1: new_copyright_holder_1,
          copyright_holder_2: new_copyright_holder_2,
          copyright_holder_3: new_copyright_holder_3,
          copyright_holder_4: new_copyright_holder_4,
          copyright_holder_5: new_copyright_holder_5,
          country: new_country,
          artist_name: new_artist_name,
          label: new_label,
          cat_id: new_cat_id,
          disc_no: new_disc_no,
          track_no: new_track_no,
          record_country: new_record_country,
          type: '1',
          jingle: ' ',
          program_name: new_program_name,
          year: new_year,
          isrc: new_isrc,
          comment: placeholder.comment,
          handle_code: '1'
        });
      });
      let exportArr = [];
      newArr.forEach(field =>
        exportArr.push(
          `${field.program_date}${field.program_start_time}${field.program_end_time}${field.teosto_id}${field.track_title}${field.helper_field}${field.length}${field.times}${field.copyright_holder_1}${field.copyright_holder_2}${field.copyright_holder_3}${field.copyright_holder_4}${field.copyright_holder_5}${field.country}${field.artist_name}${field.label}${field.cat_id}${field.disc_no}${field.track_no}${field.record_country}${field.type}${field.jingle}${field.program_name}${field.year}${field.isrc}${field.comment}${field.handle_code}`
        )
      );
      let file = fs.createWriteStream(
        path.join(__dirname, `../transfers/${filename}`)
      );
      file.on('error', function(err) {
        console.log(err);
      });
      exportArr.forEach(function(v) {
        file.write(v + '\n');
      });
      file.end();
      const transferInfo = await Report_Transfer.create({
        user_id,
        status,
        filename,
        period
      });
      console.log(transferInfo);
      res.json(transferInfo);
    } else {
      res.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = reportTransferRouter;
