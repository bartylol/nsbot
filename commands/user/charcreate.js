const { DataTypes } = require('sequelize');
const sequelize = require('../../database.js');

const Character = sequelize.define('Character', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  race: {
    type: DataTypes.STRING,
    allowNull: false
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  // Other model options go here
  timestamps: true
});

module.exports = Character;
