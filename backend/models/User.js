const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define(
  'playlist__user',
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(40),
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING(128)
    },
    last_name: {
      type: Sequelize.STRING(128)
    },
    email: {
      type: Sequelize.STRING(64)
    },
    address: {
      type: Sequelize.STRING(128)
    },
    zip: {
      type: Sequelize.STRING(32)
    },
    city: {
      type: Sequelize.STRING(32)
    },
    country: {
      type: Sequelize.STRING(32)
    },
    phone: {
      type: Sequelize.STRING(32)
    },
    status: {
      type: Sequelize.TINYINT(4)
    },
    level: {
      type: Sequelize.TINYINT(4)
    },
    last_seen: {
      type: Sequelize.DATE
    },
    reset_key: {
      type: Sequelize.STRING(40)
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
  { freezeTableName: true, timestamps: false },
  {
    indexes: [
      {
        unique: true,
        fields: ['username']
      }
    ]
  }
);

module.exports = User;
