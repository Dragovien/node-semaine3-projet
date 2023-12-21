const db = require("../models/db.js")
const { User, Material } = db.models
const userUtils = require('./user.utils.js')

const materials = [
  {
    name: 'Frêne',
    category: 'Bois',
    company: 'BBois'
  },
  {
    name: 'Chêne',
    category: 'Bois',
    company: 'BBois'
  },
  {
    name: 'Noyer',
    category: 'Bois',
    company: 'BBois'
  },
  {
    name: 'Acier',
    category: 'Fer',
    company: 'MetaLo'
  },
  {
    name: 'Inox',
    category: 'Fer',
    company: 'MetaLo'
  },
  {
    name: 'Aluminium',
    category: 'Fer',
    company: 'MetaLo'
  },
  {
    name: 'Plastique',
    category: 'Plastique',
    company: 'pPlastique'
  },
]

exports.init = async () => {
  let admin = await User.create({
    first_name: 'Ali',
    last_name: 'Baba',
    login: 'IamAdmin',
    email: 'admin@localhost.com',
    password: userUtils.generatePassword(process.env.ADMIN_PASSWORD),
    isAdmin: true,
  })

  const materialPromises = materials.map(material => {
    return Material.create({
      name: material.name,
      category: material.category,
      company: material.company
    });
  });

  await Promise.all(materialPromises);
}