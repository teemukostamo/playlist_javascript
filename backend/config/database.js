const Sequelize = require('sequelize');
const config = require('./config');

// Google cloud db:
// module.exports = new Sequelize(config.DB_NAME, 'root', config.DB_SECRET, {
//   host: config.DB_URI,
//   dialect: 'mysql',
//   dialectOptions: {
//     ssl: {
//       key: config.CLIENT_KEY,
//       cert: config.CLIENT_CERT,
//       ca: config.SERVER_CA
//     }
//   },
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

// localhost devausta varten
module.exports = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_SECRET,
  {
    host: config.DB_URI,
    dialect: 'mysql',
    dialectOptions: {
      multipleStatements: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// const mysql = require('mysql2');
// const fs = require('fs');

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
