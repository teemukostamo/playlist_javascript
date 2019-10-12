const config = require('./config');
const fs = require('fs');
const Sequelize = require('sequelize');
const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: config.DB_URI_GOOGLE,
//   user: 'root',
//   database: 'playlist',
//   password: config.DB_SECRET,
//   ssl: {
//     key: fs.readFileSync(__dirname + '/certs/client-key.pem'),
//     cert: fs.readFileSync(__dirname + '/certs/client-cert.pem'),
//     ca: fs.readFileSync(__dirname + '/certs/server-ca.pem')
//   }
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();

module.exports = new Sequelize('playlist', 'root', config.DB_SECRET, {
  host: config.DB_URI_GOOGLE,
  dialect: 'mysql',

  // dialectOptions: {
  //   ssl: {
  //     key: fs.readFileSync(__dirname + '/certs/client-key.pem'),
  //     cert: fs.readFileSync(__dirname + '/certs/client-cert.pem'),
  //     ca: fs.readFileSync(__dirname + '/certs/server-ca.pem')
  //   }
  // },
  dialectOptions: {
    ssl: {
      key: config.CLIENT_KEY,
      cert: config.CLIENT_CERT,
      ca: config.SERVER_CA
    }
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
