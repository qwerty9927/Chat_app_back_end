const jwt = require('jsonwebtoken')
function verifyToken(req, res, next) {
  if(req.headers.authorization !== undefined){
    const [schema, token] = req.headers.authorization.split(' ')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if(data){
        next()
      } else {
        res.sendStatus(401)
      }
    })
  } else {
    res.sendStatus(401)
  }
}

module.exports = verifyToken