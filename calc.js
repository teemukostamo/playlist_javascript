const moment = require('moment');
console.log(parseInt(moment().format('YYYY')));
const date = new Date().getFullYear() + 1;
const years = [];
for (var i = 2001; i <= date; i++) {
  years.push(i);
}

console.log(years);
