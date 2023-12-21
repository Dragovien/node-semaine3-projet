const db = require("../models/db.js")
const { User, Product, Material } = db.models
const jwt = require('jsonwebtoken')

exports.getAll = async (req, res) => {
  try {
    let products = await Product.findAll({include: [
      {model: Material}
    ]})
    if(products) {
      return res.status(200).json(products)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.create = async (req, res, next) => {
 
  try {
    const {name, category, material, price} = req.body
    
    const decoded = jwt.verify(req.sessionStore.token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: {
        id: decoded.userId,
        email: decoded.email,
        isAdmin: true
      }
    })

    if(!user) {
      return res.status(403).json({ message: "Must be admin to create product", product });
    }

    let product = await Product.create({
      name: name,
      category: category,
      material: {materialArray: material},
      price: parseFloat(price)
    })

    await Promise.all(material.map(mat => product.addMaterial(mat)));

    return res.status(200).json({ message: "Product created successfully", product });

  } catch (error) {
    console.log(error)
    // Handle any errors that occur during authentication
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.delete = async (req, res, next) => {
 
  try {
    const {id} = req.body

    let product = await Product.findByPk(id)

    const decoded = jwt.verify(req.sessionStore.token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: {
        id: decoded.userId,
        email: decoded.email,
        isAdmin: true
      }
    })

    if(!user) {
      return res.status(403).json({ message: "Must be admin to create product"});
    }

    if(product) {
      await product.destroy()
    }

    return res.status(200).json({ message: "Product deleted successfully"});

  } catch (error) {
    console.log(error)
    // Handle any errors that occur during authentication
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}