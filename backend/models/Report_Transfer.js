const Sequelize = require('sequelize');
const db = require('../config/database');

const Report_Transfer = db.define(
  'playlist_report_transfer',
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    status: {
      type: Sequelize.TINYINT(4)
    },
    filename: {
      type: Sequelize.STRING(18)
    },
    period: {
      type: Sequelize.DATE
    },
    old_id: {
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
        fields: ['user_id']
      }
    ]
  }
);

module.exports = Report_Transfer;
