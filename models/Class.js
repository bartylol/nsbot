const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const Ability = require('./Ability.js');

const Class = sequelize.define('Class', {
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

Class.belongsToMany(Ability, { through: 'ClassAbilities' });
Ability.belongsToMany(Class, { through: 'ClassAbilities' });

module.exports = Class;
