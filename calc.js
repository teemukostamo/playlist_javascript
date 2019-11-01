// const moment = require('moment');
// console.log(parseInt(moment().format('YYYY')));
// const date = new Date().getFullYear() + 1;
// const years = [];
// for (var i = 2001; i <= date; i++) {
//   years.push(i);
// }

// console.log(years);

let reportExport = {
  program_date: '20191001', // 6 char - POS 1-6
  program_start_time: '0000', // + plus kaks välilyöntiä - 6 char - POS 7-12
  program_end_time: '0600', //plus kaks välilyöntiä - 6 char - POS 13-18
  teosto_id: '2592', // 4 char - POS 19-22
  track_title: 'TRACK TITLE', // 50 char - POS 23-72
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

console.log(reportExport);

var fs = require('fs');

var file = fs.createWriteStream('array.txt');
const arr = ['STRINGGGGGG', 'SECOND STRIINFGGGGG'];
file.on('error', function(err) {
  /* error handling */
});
arr.forEach(function(v) {
  file.write(v + '\n');
});
file.end();
