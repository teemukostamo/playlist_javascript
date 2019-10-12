'use strict';
const fs = require('fs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let PORT = process.env.PORT || 5000;
let DB_URI = process.env.DB_URI;
let DB_URI_GOOGLE = process.env.DB_URI_GOOGLE;
let DB_SECRET = process.env.DB_SECRET;

// SSL keys encoding for heroku
let CLIENT_CERT = Buffer.from(process.env.CLIENT_CERT, 'base64');
let CLIENT_KEY = Buffer.from(process.env.CLIENT_KEY, 'base64');
let SERVER_CA = Buffer.from(process.env.SERVER_CA, 'base64');

console.log('client cert from .env', process.env.CLIENT_CERT);
console.log(
  'client cert decoded back to string',
  CLIENT_CERT.toString('base64')
);

// base64 encoding ssl keys for heroku
let encodeattempt = Buffer.from(
  fs.readFileSync(__dirname + '/certs/client-key.pem'),
  'base64'
);

console.log('encodeattempt', encodeattempt);
// let client_key_base64data = client_key_for_heroku.toString('base64');
// console.log('Client key converted to base 64 is:\n\n', client_key_base64data);

// let client_cert_for_heroku = fs.readFileSync(
//   __dirname + '/certs/client-cert.pem'
// );
// let client_cert_base64data = client_cert_for_heroku.toString('base64');
// console.log('Client cert converted to base 64 is:\n\n', client_cert_base64data);

// let server_ca_for_heroku = fs.readFileSync(__dirname + '/certs/server-ca.pem');
// let server_ca_base64data = server_ca_for_heroku.toString('base64');
// console.log('Server ca converted to base 64 is:\n\n', server_ca_base64data);

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
