const Sequelize = require('sequelize');
const db = require('../config/database');

const Report_Track = db.define(
  'playlist__report_track',
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true
    },
    track_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    report_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    length: {
      type: Sequelize.SMALLINT(6)
    },
    comment: {
      type: Sequelize.TEXT
    },
    old_id: {
      type: Sequelize.INTEGER(11)
    },
    sortable_rank: {
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
        fields: ['track_id', 'report_id']
      }
    ]
  }
);

module.exports = Report_Track;
