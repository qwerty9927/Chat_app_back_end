const jwt = require('jsonwebtoken')
const AuthModel = require('../models/Auth.model')
const UserModel = require('../models/User.model')

class Auth {
  async login(req, res) {
    if (typeof req.body.Username !== 'undefined' && typeof req.body.Password !== 'undefined') {
      const username = req.body.Username
      console.log(username)
      const result = await AuthModel.checkAcc(req.body)
      if (result.status) {
        const accessToken = jwt.sign({ username: username, role: result.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60*10 })
        const refreshToken = jwt.sign({ username: username, role: result.role }, process.env.REFRESH_ACCESS_TOKEN_SECRET)
        if(await AuthModel.setToken(username, refreshToken)){
          res.cookie("accessToken", accessToken)
          res.cookie("refreshToken", refreshToken)
          res.status(200).json({ Username: username, Name: result.Name, Image: result.Image})
        } else {
          res.status(500).send("Error")
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
    let accountInfo = req.body
    try{
      if(!accountInfo.Image){
        accountInfo.Image = "defaultImage.png"
      }
      await AuthModel.createAcc(accountInfo)
      await UserModel.createTableFriend(accountInfo.Username)
      await UserModel.createTableRequest(accountInfo.Username)
      await UserModel.createTableGroupOfUser(accountInfo.Username)
      await UserModel.createTableRequestLog(accountInfo.Username)
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
    console.log("RefreshToke: ", token)
    if (token !== undefined) {
      jwt.verify(token, process.env.REFRESH_ACCESS_TOKEN_SECRET, async (err, data) => {
        if (data) {
          const refreshTokenInStore = await AuthModel.getToken(data.username)
          if(refreshTokenInStore.result === token){
            const accessToken = jwt.sign({ username: data.username, role: data.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60*10 })
            res.cookie("accessToken", accessToken)
            res.status(200).send("Success")
          } else {
            res.status(403).send("Failed")
          }
        } else {
          res.status(403).send("Failed")
        }
      })
    } else {
      res.status(403).send("Failed")
    }
  }

  logout(req, res) {
    const token = req.cookies.refreshToken
    if(token !== undefined){
      jwt.verify(token, process.env.REFRESH_ACCESS_TOKEN_SECRET, async (err, data) => {
        if(data && await AuthModel.delToken(data.username)){
          res.cookie("accessToken", "")
          res.cookie("refreshToken", "")
          res.status(200).send("Logout done")
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
