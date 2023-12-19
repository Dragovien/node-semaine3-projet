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
},
  {
    timestamps: true,
    freezeTableName: true,
  },
)