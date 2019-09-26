const Sequelize = require('sequelize');
const db = require('../config/database');

const Artist = db.define(
  'playlist__artist',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    spotify_id: {
      type: Sequelize.STRING(22)
    },
    old_id: {
      type: Sequelize.INTEGER(11)
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
  },
  {
    freezeTableName: true,
    timestamps: true,
    underscored: true
  }
);

module.exports = Artist;
