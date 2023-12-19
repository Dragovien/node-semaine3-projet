const verifyToken = (req, res, next) => {
  try {
    console.log(req.session)
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = { verifyToken }