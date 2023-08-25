const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const Race = require('./Race.js');
const Class = require('./Class.js');

const Character = sequelize.define('Character', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  raceId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  xp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // add other characteristics here
});

Character.belongsTo(Race, { foreignKey: 'raceId' });
Character.belongsTo(Class, { foreignKey: 'classId' });

module.exports = Character;
