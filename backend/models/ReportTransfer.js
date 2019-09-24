const Sequelize = require('sequelize');
const db = require('../config/database');

const ReportTransfer = db.define('reporttransfer', {
  id: {
    type: Sequelize.INTEGER(11)
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
});

module.exports = ReportTransfer;
