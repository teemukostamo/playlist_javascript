const Sequelize = require('sequelize');
const db = require('../config/database');

const Album = db.define('album', {
  id: {
    type: Sequelize.INTEGER
  },
  artist_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  local: {
    type: Sequelize.INTEGER(6)
  },
  identifier: {
    type: Sequelize.STRING(150)
  },
  label: {
    type: Sequelize.STRING(150)
  },
  year: {
    type: Sequelize.DATEONLY
  },
  spotify_id: {
    type: STRING(22)
  },
  user_id: {
    type: Sequelize.INTEGER(11)
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
});

module.exports = Album;
