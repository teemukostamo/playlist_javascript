const Sequelize = require('sequelize');
const db = require('../config/database');

const Program = db.define(
  'playlist__program',
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
    // name: {
    //   type: Sequelize.STRING(128),
    //   allowNull: false
    // },
    identifier: {
      type: Sequelize.STRING
    },
    display: {
      type: Sequelize.INTEGER(4)
    },
    site: {
      type: Sequelize.INTEGER(4)
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
        fields: ['user_id', 'name']
      }
    ]
  }
);

module.exports = Program;
