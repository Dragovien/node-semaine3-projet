const db = require("../models/db.js")
const { User } = db.models
const userUtils = require('../utils/user.utils.js')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
  const { login, password } = req.body
  try {
    const user = await User.findOne({
      where: {
        login: login,
        password: userUtils.generatePassword(password),
        isAdmin: true,
      }
    })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    let token = {
      'userId': user.id,
      'email': user.email
    }

    const accessToken = jwt.sign(token, process.env.JWT_SECRET);
    req.sessionStore.token = accessToken

    return res.status(200).json({message: 'utilisateur authentifié'})

  } catch (error) {
    console.log(error)
    // Handle any errors that occur during authentication
    return next(error)
  }
}

exports.createAccount = async (req, res) => {
  try {
    const { login, email, firstName, lastName, password, isAdmin } = req.body

    let user = await User.findOne({
      where: {
        email: email
      }
    })

    if (!user) {
      user = await User.create({
        login: login,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: userUtils.generatePassword(password),
        isAdmin: isAdmin
      })
    } else {
      console.log('user already exists')
      return res.status(409).json({
        code: 'user already exists',
      })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: error
    })
  }


}

exports.verifyToken = async (req, res, next) => {
  try {
    if(req.sessionStore?.token) {
      const decoded = jwt.verify(req.sessionStore.token, process.env.JWT_SECRET);

      const user = await User.findOne({
        where: {
          id: decoded.userId,
          email: decoded.email
        }
      })

      if(user) {
        return res.status(200).json({message: 'Token valide'})
      } 
      return res.status(498).json({message: 'Token invalide'})
    } else {
      return res.status(401).json({message: 'Pas de token'})
    }

  } catch (error) {
    console.log(error)
    // Handle any errors that occur during authentication
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}