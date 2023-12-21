function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input
  }
  return input.replaceAll(/[&/\\#,+()$~%^'":*?<>{}]/g, "");
}

const sanitizedInputs = (req, res, next) => {
  try {
    const sanitizedBody = {}
    for (const property in req.body) {
      // console.log(typeof req.body[property])
      if(typeof req.body[property] === 'string') {
        sanitizedBody[property] = sanitizeInput(req.body[property])
      } else if(Array.isArray(req.body[property])) {
        // console.log('array')
        req.body[property].forEach((item, i) => {
          if(typeof item === 'string') {
            req.body[property][i] = sanitizeInput(item)
          }
        })
        sanitizedBody[property] = req.body[property]
      }
      else {
        sanitizedBody[property] = req.body[property]
      }
    }
    req.body = sanitizedBody
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = { sanitizedInputs }