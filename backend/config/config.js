if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let PORT = process.env.PORT || 5000;
let DB_URI = process.env.DB_URI;
let DB_URI_GOOGLE = process.env.DB_URI_GOOGLE;
let DB_SECRET = process.env.DB_SECRET;

let CLIENT_CERT = process.env.CLIENT_CERT;
let CLIENT_KEY = process.env.CLIENT_KEY;
let SERVER_CA = process.env.SERVER_CA;

CLIENT_CERT = CLIENT_CERT.replace(/\\n/g, '\n');
CLIENT_KEY = CLIENT_KEY.replace(/\\n/g, '\n');
SERVER_CA = SERVER_CA.replace(/\\n/g, '\n');

console.log('client cert', CLIENT_CERT);
console.log('client key', CLIENT_KEY);
console.log('server ca', SERVER_CA);

if (process.env.NODE_ENV === 'test') {
  DB_URI = process.env.TEST_DB_URI;
}

module.exports = {
  DB_URI,
  DB_URI_GOOGLE,
  DB_SECRET,
  PORT,
  CLIENT_KEY,
  CLIENT_CERT,
  SERVER_CA
};
