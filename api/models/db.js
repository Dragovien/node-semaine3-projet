require('dotenv').config()
const dbConfig = require("./db.config.js");
const { Sequelize, DataTypes } = require('sequelize');
const { applyRelations} = require("./setup.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    dialectOptions: {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
    },
    logging: false,
})

const fs = require("fs");
const modelDefs = [];

const modelsDirectory = "./models";

fs.readdirSync(modelsDirectory)
    .filter((filename) => {
        return filename.endsWith("model.js");
    })
    .forEach((filename) => {
        const model = require("./" + filename);
        if (typeof model === "function") {
            modelDefs.push(model);
        }
    })

for (const modelDef of modelDefs) {
    modelDef(sequelize, DataTypes)
}

applyRelations(sequelize);

module.exports = sequelize;