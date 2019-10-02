const Sequelize = require('sequelize');
const db = require('../config/database');

const Report = db.define(
  'playlist__report',
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    program_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    program_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    program_start_time: {
      type: Sequelize.TIME,
      allowNull: false
    },
    program_end_time: {
      type: Sequelize.TIME,
      allowNull: false
    },
    program_no: {
      type: Sequelize.INTEGER(11)
    },
    status: {
      type: Sequelize.INTEGER(4)
    },
    rerun: {
      type: Sequelize.INTEGER(4)
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
        fields: ['program_date', 'status', 'program_id', 'user_id']
      }
    ]
  }
);

module.exports = Report;
