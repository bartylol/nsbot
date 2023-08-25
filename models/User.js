const User = sequelize.define('User', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  xp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});
