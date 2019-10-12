if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let PORT = process.env.PORT || 5000;
let DB_URI = process.env.DB_URI;
let DB_URI_GOOGLE = process.env.DB_URI_GOOGLE;
let DB_SECRET = process.env.DB_SECRET;

if (process.env.NODE_ENV === 'test') {
  DB_URI = process.env.TEST_DB_URI;
}

module.exports = {
  DB_URI,
  DB_URI_GOOGLE,
  DB_SECRET,
  PORT
};
