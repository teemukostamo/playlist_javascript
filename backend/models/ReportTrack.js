const Sequelize = require('sequelize');
const db = require('../config/database');

const ReportTrack = db.define('reporttrack', {
  id: {
    type: Sequelize.INTEGER(11)
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
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
});

module.exports = ReportTrack;
