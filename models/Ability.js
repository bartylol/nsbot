const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const QuestProgress = sequelize.define('QuestProgress', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  questId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = QuestProgress;
