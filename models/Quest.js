const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Quest = sequelize.define('Quest', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  xpReward: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // add other characteristics here
});
