const db = require("../models/db.js")
const { User } = db.models
const userUtils = require('./user.utils.js')

exports.init = async () => {
  let admin = await User.create({
    first_name: 'Admin',
    last_name: 'Admin',
    login: 'IamAdmin',
    email: 'admin@localhost.com',
    password: userUtils.generatePassword(process.env.ADMIN_PASSWORD),
    isAdmin: true,
  })
}