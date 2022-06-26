const jwt = require('jsonwebtoken')
const AuthModel = require('../models/Auth.model')
const UserModel = require('../models/User.model')

class Auth {
  async login(req, res) {
    if (typeof req.body.Username !== 'undefined' && typeof req.body.Password !== 'undefined') {
      const username = req.body.Username
      const result = await AuthModel.checkAcc(req.body)
      if (result.status) {
        const user = await UserModel.getUser(username)
        if(user.status){
          const accessToken = jwt.sign({ username: username, role: result.role, id: user.res.idUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 10 })
          const refreshToken = jwt.sign({ username: username, role: result.role, id: user.res.idUser }, process.env.REFRESH_ACCESS_TOKEN_SECRET)
          // if(await AuthModel.setToken(result.id, refreshToken)){
            res.cookie("accessToken", accessToken)
            res.cookie("refreshToken", refreshToken)
            res.status(200).json(user.res)
          // } else {
          //   res.status(500).send("Error")
          // }
        }
      } else {
        res.sendStatus(401)
      }
    } else {
      res.sendStatus(422)
    }
  }

  async checkUsername(req, res) {
    const result = await AuthModel.isUsername(req.body.Username)
    res.send({ isExist: result })
  }

  async resgister(req, res) {
    let { Name, Image, ...accountInfo } = req.body
    let { Password, ...userInfo } = req.body
    try{
      await AuthModel.createAcc(accountInfo)
      if(!userInfo.Image){
        userInfo.Image = "defaultImage.png"
      }
      await UserModel.createUser(userInfo)
      res.status(200).send("Success")
    } catch(e){
      console.log(e)
      res.status(500).send("ERROR")
    }
  }

  async authenticate(req, res, next) {
    if (req.body.Username === undefined || req.body.Username === "" || !/^[a-zA-Z0-9]{1,20}$/.test(req.body.Username)) {
      res.sendStatus(401)
      return false
    } else if (await AuthModel.isUsername(req.body.Username)) {
      res.sendStatus(401)
      return false
    }

    if (typeof req.body.Password === 'undefined' || req.body.Password === "" || !/^[a-zA-Z0-9]{8,20}$/.test(req.body.Password)) {
      res.sendStatus(401)
      return false
    }

    if (typeof req.body.Name === 'undefined' || req.body.Name === "" || !/^[a-zvxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-Z0-9]{1,20}$/.test(req.body.Name)) {
      res.sendStatus(401)
      return false
    }

    next()
  }

  refreshToken(req, res) {
    const token = req.cookies.refreshToken
    console.log(token)
    if (token !== undefined) {
      jwt.verify(token, process.env.REFRESH_ACCESS_TOKEN_SECRET, (err, data) => {
        if (data) {
          const accessToken = jwt.sign({ username: data.Username, role: data.role, id: data.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
          res.cookie("accessToken", accessToken)
          res.status(200).send("Success")
        } else {
          res.status(403).send("Failed")
        }
      })
    } else {
      res.status(403).send("Failed")
    }
  }
}

module.exports = new Auth()
