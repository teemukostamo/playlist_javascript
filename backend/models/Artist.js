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
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    modelName: 'artist',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  {
    indexes: [
      {
        unique: false,
        fields: ['name']
      }
    ]
  }
);

module.exports = Artist;
