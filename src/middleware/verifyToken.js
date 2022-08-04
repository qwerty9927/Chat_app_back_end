const jwt = require('jsonwebtoken')
const createError = require('http-errors')

function verifyToken(req, res, next) {
  if(req.headers.authorization !== undefined){
    const [schema, token] = req.headers.authorization.split(' ')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if(data){
        req.username = data.username
        next()
      } else {
        next(createError.Unauthorized())
      }
    })
  } else {
    next(createError.Unauthorized())
  }
}

module.exports = verifyToken