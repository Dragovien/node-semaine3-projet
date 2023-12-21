const db = require("../models/db.js")
const { User } = db.models
const userUtils = require('../utils/user.utils.js')
const jwt = require('jsonwebtoken')

exports.getAll = async (req, res, next) => {
  try {
    let users = await User.findAll({
      attributes: ['id', 'first_name', 'last_name', 'email', 'isAdmin', 'login']
    })
    if(users) {
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error)
    // Handle any errors that occur during authentication
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.login = async (req, res, next) => {
  const { login, password } = req.body
  try {
    const user = await User.findOne({
      where: {
        login: login,
        password: userUtils.generatePassword(password),
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

exports.logout = async (req, res, next) => {
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
        req.session.destroy((err) => {
          delete req.sessionStore.token
        })
        return res.status(200).json({message: 'Session destroyed'})
      } 
    }

  } catch (error) {
    console.log(error)
    // Handle any errors that occur during authentication
    return res.status(500).json({ message: 'Internal Server Error' });
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

    const decoded = jwt.verify(req.sessionStore.token, process.env.JWT_SECRET);

    const admin = await User.findOne({
      where: {
        id: decoded.userId,
        email: decoded.email,
        isAdmin: true
      }
    })

    if(!admin) {
      return res.status(403).json({ message: "Must be admin to create user"});
    }

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

exports.updateAccount = async (req, res) => {
  try {
    const { login, email, firstName, lastName, isAdmin } = req.body

    let user = await User.findOne({
      where: {
        email: email
      }
    })

    const decoded = jwt.verify(req.sessionStore.token, process.env.JWT_SECRET);

    const admin = await User.findOne({
      where: {
        id: decoded.userId,
        email: decoded.email,
        isAdmin: true
      }
    })
    
    if(!admin) {
      return res.status(403).json({ message: "Must be admin to update user"});
    }

    if (user) {
      user.update({
        login: login,
        first_name: firstName,
        last_name: lastName,
        email: email,
        isAdmin: isAdmin
      })
    } else {
      return res.status(409).json({
        code: 'user doesn\'t exist',
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

exports.deleteAccount = async (req, res, next) => {
 
  try {
    const {id} = req.body

    let userToDelete= await User.findByPk(id)

    const decoded = jwt.verify(req.sessionStore.token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: {
        id: decoded.userId,
        email: decoded.email,
        isAdmin: true
      }
    })

    if(!user) {
      return res.status(403).json({ message: "Must be admin to delete user"});
    }

    if(userToDelete) {
      await userToDelete.destroy()
    }

    return res.status(200).json({ message: "User deleted successfully"});

  } catch (error) {
    console.log(error)
    // Handle any errors that occur during authentication
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.verifyToken = async (req, res, next) => {
  try {
    if(req.sessionStore?.token) {
      const decoded = jwt.verify(req.sessionStore.token, process.env.JWT_SECRET);

      const user = await User.findOne({
        where: {
          id: decoded.userId,
          email: decoded.email,
          isAdmin: true
        }
      })

      if(user) {
        return res.status(200).json({message: 'Valid token'})
      } 
      return res.status(498).json({message: 'Invalid token'})
    } else {
      return res.status(401).json({message: 'No token'})
    }

  } catch (error) {
    console.log(error)
    // Handle any errors that occur during authentication
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}