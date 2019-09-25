const Sequelize = require('sequelize');
const db = require('../config/database');

const Report_Transfer = db.define(
  'playlist_report_transfer',
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true
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
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at: {
      type: Sequelize.DATE
    }
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Report_Transfer;
