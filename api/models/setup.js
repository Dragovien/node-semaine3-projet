function applyRelations(sequelize) {
    const { User, Product, Material } = sequelize.models

    //#region User Relations

    User.hasMany(Product, {
        foreignKey: 'user_id',
        source: 'id',
    })

    //#endregion

    //#region Product Relations

    Product.belongsToMany(Material, { through: 'product_material', foreignKey: 'product_id' })

    Product.belongsTo(User, {
        foreignKey: 'user_id',
        target: 'id',
    })

    //#endregion

    //#region Material Relations

    Material.belongsToMany(Product, { through: 'product_material', foreignKey: 'material_name' })

    //#endregion

}

module.exports = { applyRelations }