const Sequelize = require('sequelize');
const database = require('../config/db');

const Product = database.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
  },
  description: Sequelize.STRING,
});

module.exports = Product;
