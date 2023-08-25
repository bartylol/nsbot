const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Race = sequelize.define('Race', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  strength: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  magic: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  agility: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // add other characteristics here
});

module.exports = Race;
