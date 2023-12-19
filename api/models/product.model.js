module.exports = (sequelize, DataTypes) => sequelize.define(
  'Product', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // user_id: {
  //   type: DataTypes.UUID,
  //   allowNull: false
  // }
},
  {
    timestamps: true,
    freezeTableName: true,
  },
)