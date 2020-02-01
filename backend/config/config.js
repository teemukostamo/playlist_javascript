const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 5000;
let { DB_URI } = process.env;
const { DB_URI_GOOGLE, DB_NAME, DB_SECRET } = process.env;

// SSL keys decoded from base64 for heroku
const CLIENT_CERT = Buffer.from(process.env.CLIENT_CERT, 'base64');
const CLIENT_KEY = Buffer.from(process.env.CLIENT_KEY, 'base64');
const SERVER_CA = Buffer.from(process.env.SERVER_CA, 'base64');

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
  DB_NAME,
  DB_SECRET,
  PORT,
  CLIENT_KEY,
  CLIENT_CERT,
  SERVER_CA
};
