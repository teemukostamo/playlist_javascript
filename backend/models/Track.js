const Sequelize = require('sequelize');
const db = require('../config/database');

const Track = db.define('track', {
  id: {
    type: Sequelize.INTEGER
  },
  artist_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  album_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  identifier: {
    type: Sequelize.STRING,
    len: [0, 150]
  },
  label: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  side: {
    type: Sequelize.INTEGER,
    len: [1, 4]
  },
  track_no: {
    type: Sequelize.INTEGER,
    len: [1, 11]
  },
  length: {
    type: Sequelize.INTEGER,
    len: [1, 6]
  },
  people: {
    type: Sequelize.TEXT
  },
  comment: {
    type: Sequelize.TEXT
  },
  note: {
    type: Sequelize.TEXT
  },
  record_country: {
    type: Sequelize.STRING,
    len: [0, 2]
  },
  country: {
    type: Sequelize.INTEGER,
    len: [0, 4]
  },
  fixed: {
    type: Sequelize.INTEGER,
    len: [0, 4]
  },
  isrc: {
    type: Sequelize.STRING(12)
  },
  file: {
    type: Sequelize.CHAR(23)
  },
  file_order: {
    type: Sequelize.INTEGER(11)
  },
  spotify_id: {
    type: Sequelize.STRING(22)
  },
  user_id: {
    type: Sequelize.INTEGER(11)
  },
  old_id: {
    type: Sequelize.INTEGER(11)
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
});

module.exports = Track;
