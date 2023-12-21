const db = require("../models/db.js")
const { User, Material } = db.models
const userUtils = require('./user.utils.js')

const materials = [
  {
    name: 'Frêne',
    category: 'Bois',
    description: 'Représentant quelque 2% des arbres qui peuplent la France, le frêne est malheureusement menacé par certaines maladies. Cet arbre qui pousse haut a un bois très souple qui lui permet d’absorber les chocs. Lorsqu’il est blanc, son bois est utilisé en tranchage, ébénisterie, menuiserie, tournerie, tandis que les bois gris sont peu appréciés. ',
    company: 'BBois'
  },
  {
    name: 'Chêne',
    category: 'Bois',
    description: 'Le bois du chêne sessile est durable, résistant, de couleur jaune clair à brun clair, prenant une teinte foncée à la lumière. Les propriétés mécaniques du bois de ce chêne dépendent de la largeur de ses cernes : plus ils sont larges, plus le bois sera difficile à travailler. Au contraire, des cernes fins sont synonymes de bois tendre, plus facile à travailler. \
    On l\'utilise volontiers pour la tonnellerie, pour les charpentes et la construction, en menuiserie intérieure comme en menuiserie extérieure, en tranchage ou pour la fabrication de parquets et de panneaux. Il fait également un très bon bois de chauffage.',
    company: 'BBois'
  },
  {
    name: 'Noyer',
    category: 'Bois',
    description: 'Le bois du noyer commun est très prisé notamment pour la conception de meubles et en ébénisterie, car son bois au grain fin est agréable à travailler et donne un très beau rendu. Quant au noyer noir qui nous vient d\'Amérique, nous n\'avons pas encore assez de recul pour connaître sa résistance dans le temps. \
    Le bois de noyer est également prisé pour la conception de manches de couteaux, de placards d\'intérieur ou de plans de travail dans une cuisine. Les veines de son bois sont très appréciées pour leur esthétique.',
    company: 'BBois'
  },
  {
    name: 'Acier',
    category: 'Fer',
    description: 'Un acier est un alliage métallique constitué principalement de fer et de carbone. Il se distingue des fontes et des ferroalliages par sa teneur en carbone comprise entre 0,02 % et 2 % en masse. C\'est essentiellement cette teneur en carbone qui confère à l\'acier ses propriétés.',
    company: 'MetaLo'
  },
  {
    name: 'Inox',
    category: 'Fer',
    description: 'L\'acier inoxydable, couramment appelé acier inox ou inox, est un acier (alliage à base de fer et de carbone), comportant moins de 1,2 % de carbone et plus de 10,5 % de chrome, dont la propriété remarquable est d\'être peu sensible à la corrosion et de ne pas se dégrader en rouille. ',
    company: 'MetaLo'
  },
  {
    name: 'Aluminium',
    category: 'Fer',
    description: 'L\'aluminium est l\'élément chimique de numéro atomique 13, de symbole Al. Il appartient au groupe 13 du tableau périodique ainsi qu\'à la famille des métaux pauvres.',
    company: 'MetaLo'
  },
  {
    name: 'Plastique',
    category: 'Plastique',
    description: 'Une matière plastique (le plastique en langage courant) est un polymère généralement mélangé à des additifs, colorants, charges (miscibles ou non dans la matrice polymère).',
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
      company: material.company,
      description: material.description,
    });
  });

  await Promise.all(materialPromises);
}