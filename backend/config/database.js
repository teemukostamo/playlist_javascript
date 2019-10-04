const config = require('./config');
const Sequelize = require('sequelize');

module.exports = new Sequelize('playlist', 'root', config.DB_SECRET, {
  host: config.DB_URI,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
