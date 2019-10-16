const Sequelize = require('sequelize');
const db = require('../config/database');

const Album = db.define(
  'playlist__album',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    artist_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'playlist__artist',
        key: 'id'
      },
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
      type: Sequelize.STRING(22)
    },
    user_id: {
      type: Sequelize.INTEGER(11)
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  {
    indexes: [
      {
        unique: false,
        fields: ['artist_id', 'name']
      }
    ]
  }
);

module.exports = Album;
