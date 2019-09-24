const Sequelize = require('sequelize');
const db = require('../config/database');

const Program = db.define('program', {
  id: {
    type: Sequelize.INTEGER(11)
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(128),
    allowNull: false
  },
  identifier: {
    type: Sequelize.STRING
  },
  display: {
    type: Sequelize.INTEGER(4)
  },
  site: {
    type: Sequelize.INTEGER(4)
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
});

module.exports = Program;
