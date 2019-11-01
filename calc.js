// const moment = require('moment');
// console.log(parseInt(moment().format('YYYY')));
// const date = new Date().getFullYear() + 1;
// const years = [];
// for (var i = 2001; i <= date; i++) {
//   years.push(i);
// }

// console.log(years);

// var fs = require('fs');

// // var file = fs.createWriteStream('array.txt');
// // const arr = ['STRINGGGGGG', 'SECOND STRIINFGGGGG'];
// // file.on('error', function(err) {
// //   console.log(err);
// // });
// // arr.forEach(function(v) {
// //   file.write(v + '\n');
// // });
// // file.end();

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

console.log('track title', placeholder.track_title.length);
console.log('copyright holder 1', placeholder.copyright_holder_1.length);
console.log('copyright holder 2', placeholder.copyright_holder_2.length);
console.log('copyright holder 3', placeholder.copyright_holder_3.length);
console.log('copyright holder 4', placeholder.copyright_holder_4.length);
console.log('copyright holder 5', placeholder.copyright_holder_5.length);
console.log('artist', placeholder.artist_name.length);
console.log('label', placeholder.label.length);
console.log('cat id', placeholder.cat_id.length);
console.log('program name', placeholder.program_name.length);
console.log('comment', placeholder.comment.length);

const arrayWithTracks = [
  {
    program_date: '2015-10-14',
    program_start_time: '08:00:00',
    program_end_time: '10:00:00',
    program_name: 'Neurosiivut',
    artist_name: 'A takalo takavalo',
    track_title: 'Ja takavalo',
    length: 124,
    copyright_holders: '| Eka rivi | Toka rivi |',
    country: 1,
    record_country: 'FI',
    disc_no: 1,
    track_no: null,
    label: null,
    cat_id: 'LOV1234',
    isrc: 'PROMO',
    year: '2015-10-21'
  },
  {
    program_date: '2015-10-14',
    program_start_time: '08:00:00',
    program_end_time: '10:00:00',
    program_name: 'Njassa',
    artist_name: 'Siouxie',
    track_title: 'Banshees',
    length: 524,
    copyright_holders: '| Siouixe | Toka rivi |',
    country: 2,
    record_country: 'US',
    disc_no: 1,
    track_no: 14,
    label: 'Label here',
    cat_id: null,
    isrc: null,
    year: '2015-10-21'
  },
  {
    program_date: '2015-10-15',
    program_start_time: '11:00:00',
    program_end_time: '15:00:00',
    program_name: 'Iltapäiovä',
    artist_name: 'Suar',
    track_title: 'Ja takavalo',
    length: 631,
    copyright_holders: '| Eka rivi | Toka rivi |',
    country: 1,
    record_country: 'GB',
    disc_no: 1,
    track_no: 6,
    label: 'Solina',
    cat_id: 'SOL45444',
    isrc: null,
    year: '2018-10-21'
  },
  {
    program_date: '2015-10-14',
    program_start_time: '08:00:00',
    program_end_time: '10:00:00',
    program_name: 'Iltaohjelma',
    artist_name: 'Manoddda',
    track_title: 'Laika virgin',
    length: 323,
    copyright_holders: '| Eka rivi | Toka elvis |',
    country: null,
    disc_no: 1,
    track_no: 12,
    record_country: 'EE',
    label: 'Virgin',
    cat_id: 'VIR124',
    isrc: 'FI3456789123',
    year: '2015-10-21'
  }
];

let newArr = [];

arrayWithTracks.forEach(track => {
  // get program date, remove dashes and two first numbers
  let new_program_date = track.program_date.replace(/-/g, '').substring(2);
  console.log('new program date', new_program_date);
  console.log('new program date length', new_program_date.length);

  // get program start and end time, remove colons and replace last zeroes with two spaces
  let new_program_start_time =
    track.program_start_time.replace(/:/g, '').slice(0, -2) + '  ';
  console.log('new program start time', new_program_start_time);
  console.log('new program start time length', new_program_start_time.length);
  let new_programm_end_time =
    track.program_end_time.replace(/:/g, '').slice(0, -2) + '  ';
  console.log('new program end time', new_programm_end_time);
  console.log('new program end time length', new_programm_end_time.length);

  // get track title, remove track name length from placeholder, then add to remaining placeholder
  let new_track_title =
    track.track_title.toUpperCase() +
    placeholder.track_title.substring(track.track_title.length);

  console.log('new track title', new_track_title);
  console.log('new track title length', new_track_title.length);

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
  console.log('new length', new_length);
  console.log('new length length', new_length.length);

  // get country - FI=1, else = ' '
  let new_country;
  if (track.country === 1) {
    new_country = 1;
  } else {
    new_country = ' ';
  }
  console.log('new country', new_country);
  console.log('new country length', new_country.length);

  // get artist name
  let new_artist_name =
    track.artist_name.toUpperCase() +
    placeholder.artist_name.substring(track.artist_name.length);

  console.log('new artist name', new_artist_name);
  console.log('new artist name length', new_artist_name.length);

  // get label
  let new_label;
  if (track.label === null) {
    new_label = placeholder.label;
  } else {
    new_label =
      track.label.toUpperCase() +
      placeholder.label.substring(track.label.length);
  }
  console.log('new label', new_label);
  console.log('new label length', new_label.length);

  // get cat id
  let new_cat_id;
  if (track.cat_id === null) {
    let unknown = 'EI ILMOITETTU';
    new_cat_id = unknown + placeholder.cat_id.substring(unknown.length);
  } else {
    new_cat_id =
      track.cat_id.toUpperCase() +
      placeholder.cat_id.substring(track.cat_id.length);
  }
  console.log('new cat_id', new_cat_id);
  console.log('new cat_id length', new_cat_id.length);

  // get disc no
  let new_disc_no;
  if (track.disc_no === null) {
    new_disc_no = ' ';
  } else {
    new_disc_no = track.disc_no.toString();
  }

  console.log('new disc no', new_disc_no);
  console.log('new disc no length', new_disc_no.length);

  // get track no
  let new_track_no;
  if (track.track_no === null) {
    new_track_no = '  ';
  } else if (track.track_no.toString().length === 1) {
    new_track_no = ` ${track.track_no.toString()}`;
  } else {
    new_track_no = track.track_no.toString();
  }
  console.log('new track no', new_track_no);
  console.log('new track no length', new_track_no.length);
  console.log('new track no typeof', typeof new_track_no);

  // get record country
  let new_record_country;
  if (track.record_country === null) {
    new_record_country = '   ';
  } else {
    new_record_country = track.record_country + ' ';
  }

  console.log('new record country', new_record_country);
  console.log('new record country length', new_record_country.length);
  console.log('new record country typeof', typeof new_record_country);

  // get program name
  let new_program_name =
    track.program_name.toUpperCase() +
    placeholder.program_name.substring(track.program_name.length);

  console.log('new program name', new_program_name);
  console.log('new program name length', new_program_name.length);

  // get year
  let new_year;
  console.log(typeof track.year);
  if (track.year === null) {
    new_year = '    ';
  } else {
    new_year = track.year.substring(0, 4);
  }

  console.log('new year', new_year);
  console.log('new year length', new_year.length);

  // get isrc
  let new_isrc;
  if (track.isrc === null) {
    new_isrc = placeholder.isrc;
  } else {
    new_isrc =
      track.isrc.toUpperCase() + placeholder.isrc.substring(track.isrc.length);
  }
  console.log('new isrc', new_isrc);
  console.log('new isrc length', new_isrc.length);

  newArr.push({
    program_date: new_program_date,
    program_start_time: new_program_start_time,
    program_end_time: new_programm_end_time,
    teosto_id: '2592',
    track_title: new_track_title,
    helper_field: '00',
    length: new_length,
    times: '0001',
    // copyright holder 1
    // copyright holder 2
    // copyright holder 3
    // copyright holder 4
    // copyright holder 5
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

console.log(newArr);

let reportExportDraft = {
  program_date: '191001', // 6 char - POS 1-6
  program_start_time: '0000', // + plus kaks välilyöntiä - 6 char - POS 7-12
  program_end_time: '0600', //plus kaks välilyöntiä - 6 char - POS 13-18
  teosto_id: '2592', // 4 char - POS 19-22
  track_title: 'track title', // 50 char - POS 23-72
  helper_field: '00', // 2 char - POS 73-74
  length: '0330', // MMSS - 4 char - 75-78
  times: '0001', // 4 char - POS 79-82
  copyright_holder_1: '', //people - 30char - POS 83-112
  copyright_holder_2: '', //people - 30char - POS 113-142
  copyright_holder_3: '', //people - 30char - POS 143-172
  copyright_holder_4: '', //people - 30char - POS 173-202
  copyright_holder_5: '', //people - 30char - POS 203 - 232
  country: '1', // 1 suomi, tyhjä muu - 1 char - POS 233
  artist: 'ARTIST NAME', // 25 char - POS 234-258
  label: 'LABEL', // 20 char - POS 259-278
  cat_id: 'LABEL0001', // if null = EI ILMOITETTU - 15 char - POS 279-293
  disc_no: '1', // 1 char - POS 294
  track_no: '12', //2 char - POS 295-296
  record_country: 'GB', // 3 char - POS 297-299
  type: '1', // äänitteen laji. 1=kaupallinen - 1 char - POS 300
  jingle: ' ', // jos jingle niin 1 - muuten tyhjä. - 1 char - POS 301
  program_name: 'PROGRAM NAME', // 63 char - POS 302-364
  year: '2019', // 4 char - POS 365 - 368
  isrc: 'FI1234567812', // 12 char - POS 369-380
  comment: '', // 79 char - POS 381-459
  handle_code: '1' // 1 char - POS 460
};
