const db = require("./models/db.js")
const dotenv = require('dotenv')
const bodyParser = require("body-parser")
const cors = require("cors")
const devUtils = require('./utils/dev.utils.js')
dotenv.config()
const mysql = require('mysql2/promise');
const dbConfig = require("./models/db.config.js");
const express = require("express")
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);


mysql.createConnection({
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
}).then(async (connection) => {
    try {
        // await connection.query(`DROP DATABASE IF EXISTS ${dbConfig.DB}`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        connection.end();
    }
}).then(() => {
    console.log('Launch database synchronisation.')
    db.sync({
        alter: true,
        force: false,
    }).then(async () => {
        console.log('Database synchronised.')
        const existingAdmin = await db.models.User.findOne({ where: { isAdmin: true } })
        if (!existingAdmin) {
            devUtils.init()
        }
    })

    const sequelizeSessionStore = new SessionStore({
        db: db,
    });


    const app = express()

    app.use(cors({
        origin: [process.env.APP_URL, process.env.API_URL],
        credentials: true,
        withCredentials: true
    }));

    app.use(express.urlencoded({ extended: false }));


    app.use(session({
        name: 'Session',
        secret: process.env.SECRET,
        store: sequelizeSessionStore,
        resave: false,
        saveUninitialized: false,
    }))

    app.use(bodyParser.json())

    app.get("/", (req, res) => {
        return res.json({
            message: "Welcome to node-semaine3-project api."
        })
    })

    app.get("*", (req, res, next) => {
        console.log('GET ' + req.url)
        next()
    })

    app.post("*", (req, res, next) => {
        console.log('POST ' + req.url)
        next()
    })

    app.put("*", (req, res, next) => {
        console.log('PUT ' + req.url)
        next()
    })

    app.delete("*", (req, res, next) => {
        console.log('DELETE ' + req.url)
        next()
    })

    require("fs").readdirSync(require("path").join(__dirname, "routes")).forEach(function (file) {
        require("./routes/" + file)(app)
    })

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`)
    })
})
    .catch(err => {
        console.error('Error connecting to MySQL:', err);
    });