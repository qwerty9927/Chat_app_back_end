const jwt = require('jsonwebtoken')

class Admin {
  authorization(req, res, next){
    console.log(req.cookies)
    if(typeof req.headers.authorization !== 'undefined'){
      const [ schema, token ] = req.headers.authorization.split(' ')
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(data.role == 1){
          next()
        } else {
          res.sendStatus(403)
        }
      })
    } else {
      res.sendStatus(401)
    }
  }

  dashBoard(req, res){
    
    res.send("connect to dashBoard")
  }
}

module.exports = new Admin()