module.exports = (sequelize, DataTypes) => sequelize.define(
  'Material', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  }
},
  {
    timestamps: true,
    freezeTableName: true,
  },
)