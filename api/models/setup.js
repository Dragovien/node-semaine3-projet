function applyRelations(sequelize) {
    const { User, Product, Material } = sequelize.models

    //#region User Relations

    //#endregion

    //#region Product Relations

    Product.belongsToMany(Material, { through: 'product_material', foreignKey: 'product_id', onDelete: 'CASCADE' })

    //#endregion

    //#region Material Relations

    Material.belongsToMany(Product, { through: 'product_material', foreignKey: 'material_name' })

    //#endregion

}

module.exports = { applyRelations }