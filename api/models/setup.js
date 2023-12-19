function applyRelations(sequelize) {
    const { User, Product, Material } = sequelize.models

    //#region User Relations

    User.hasMany(Product, {
        foreignKey: 'user_id',
    })

    //#endregion

    //#region Product Relations

    Product.belongsTo(Material, { through: 'material_used' })

    Product.belongsTo(User)

    //#endregion

    //#region Material Relations

    Material.belongsTo(Product, { through: 'material_used' })

    //#endregion

}

module.exports = { applyRelations }