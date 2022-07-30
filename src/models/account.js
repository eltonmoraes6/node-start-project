const Sequelize = require('sequelize');
const database = require('../config/db');

const Account = database.define('account', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    required: true,
    allowNull: false,
  },
  familyName: {
    type: Sequelize.STRING,
    required: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    required: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    required: true,
  },
});

module.exports = Account;
